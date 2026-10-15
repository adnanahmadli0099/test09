import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDocFromServer,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, QuoteItem } from '../types';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId to getFirestore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Operation Types for error reporting required by Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map((p) => ({
        providerId: p.providerId,
        email: p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// MANDATORY: Connection testing on app boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore is currently unreachable (offline).');
      return false;
    }
    // Document might not exist which is expected and fine
    return true;
  }
}

// Run connection test on load
testConnection().catch(() => {});

// Firestore Database Operations with robust error handling

/**
 * Save or update institutional user profile in Firestore
 */
export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  // ABAC Zero-Trust Guard: Must be authenticated and UID must match profile.id
  if (!auth.currentUser || auth.currentUser.uid !== profile.id) {
    return;
  }

  const path = `users/${profile.id}`;
  try {
    await setDoc(doc(db, 'users', profile.id), {
      id: profile.id,
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone || '',
      institutionName: profile.institutionName,
      institutionType: profile.institutionType || 'Primary/High School',
      city: profile.city || 'Lahore',
      deliveryAddress: profile.deliveryAddress || '',
      role: profile.role || 'school_buyer',
      createdAt: profile.createdAt || new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Fetch institutional user profile from Firestore
 */
export async function getUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  // ABAC Zero-Trust Guard: Can only read own profile or admin
  if (!auth.currentUser || (auth.currentUser.uid !== uid && auth.currentUser.email !== 'adnanahmadali112233@gmail.com')) {
    return null;
  }

  const path = `users/${uid}`;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export interface FirestoreQuotation {
  id: string;
  userId?: string | null;
  customerName: string;
  institutionName: string;
  email: string;
  phone: string;
  city: string;
  deliveryAddress?: string;
  notes?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    color?: string;
  }>;
  totalEstimatedUnits: number;
  status: 'Pending Review' | 'Under Quotation' | 'Approved' | 'Dispatched';
  createdAt: string;
}

/**
 * Submit and save quotation request to Firestore
 */
export async function submitQuotationToFirestore(quotation: FirestoreQuotation): Promise<void> {
  const path = `quotations/${quotation.id}`;
  const cleanQuotation: FirestoreQuotation = {
    ...quotation,
    userId: auth.currentUser ? auth.currentUser.uid : null,
  };
  try {
    await setDoc(doc(db, 'quotations', quotation.id), cleanQuotation);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Fetch quotations for a specific user from Firestore
 */
export async function getUserQuotationsFromFirestore(userId: string): Promise<FirestoreQuotation[]> {
  // ABAC Zero-Trust Guard: Must be signed in with matching UID or admin
  if (!auth.currentUser || (auth.currentUser.uid !== userId && auth.currentUser.email !== 'adnanahmadali112233@gmail.com')) {
    return [];
  }

  const path = 'quotations';
  try {
    const q = query(collection(db, 'quotations'), where('userId', '==', userId));
    const snap = await getDocs(q);
    const results: FirestoreQuotation[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as FirestoreQuotation);
    });
    return results;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Save custom bespoke inquiries to Firestore
 */
export async function submitCustomInquiryToFirestore(inquiry: {
  id: string;
  userId?: string | null;
  fullName: string;
  schoolName: string;
  email: string;
  phone: string;
  city: string;
  projectScope?: string;
  estimatedUnits?: number;
  notes?: string;
  createdAt: string;
}): Promise<void> {
  const path = `custom_inquiries/${inquiry.id}`;
  try {
    await setDoc(doc(db, 'custom_inquiries', inquiry.id), {
      ...inquiry,
      submittedAtServer: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Save contact message submissions to Firestore
 */
export async function submitContactMessageToFirestore(message: {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}): Promise<void> {
  const path = `contact_messages/${message.id}`;
  try {
    await setDoc(doc(db, 'contact_messages', message.id), {
      ...message,
      submittedAtServer: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Authentication Helpers
export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export async function signOutFirebase() {
  return await signOut(auth);
}

export { onAuthStateChanged };
export type { FirebaseUser };
