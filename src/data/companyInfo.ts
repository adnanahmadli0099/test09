/**
 * Centralized Company Configuration for Decent School Furniture
 * Unknown business information is clearly marked and easy to customize.
 */

export const COMPANY_INFO = {
  brandName: 'Decent School Furniture',
  legalName: 'Decent Educational Furniture Manufacturers Pvt. Ltd.',
  tagline: 'Better Study. Better Future.',
  secondaryTagline: 'Quality Furniture. Better Learning.',
  foundedYear: 2008,

  contact: {
    // [PLACEHOLDER - REPLACE WITH ACTUAL NUMBERS IF AVAILABLE]
    phone: '+92 300 0000000',
    phoneDisplay: '+92 300 0000000',
    whatsapp: '+92 300 0000000',
    whatsappClean: '923000000000',
    email: 'info@decentschoolfurniture.com',
    salesEmail: 'sales@decentschoolfurniture.com',
    
    // [FACTORY & HEAD OFFICE ADDRESS]
    address: 'Decent Industrial Complex, Furniture Cluster, Industrial Estate, Lahore / Islamabad, Pakistan',
    city: 'Lahore / Islamabad',
    country: 'Pakistan',
    workingHours: 'Monday - Saturday: 9:00 AM – 7:00 PM (PKT)',
  },

  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    pinterest: 'https://pinterest.com',
  },

  manufacturingHighlights: [
    { label: '500+ Institutions Supplied', desc: 'Trusted by top private schools, universities & colleges across the country' },
    { label: '10-Year Structural Frame Warranty', desc: 'Heavy-gauge precision engineered steel tubing with anti-corrosion coating' },
    { label: 'Ergonomic Child-Safe Standards', desc: 'Rounded safety edges, non-toxic powder coating, posture-supporting curvature' },
    { label: 'Custom Bulk Capabilities', desc: 'Custom dimensions, school color-matching & laser-etched institution emblems' },
  ],
};

/**
 * Builds a direct WhatsApp message URL with pre-filled inquiry text
 */
export function getWhatsAppQuoteUrl(details?: {
  institution?: string;
  productName?: string;
  quantity?: number;
  customMessage?: string;
}): string {
  let text = `Hello Decent School Furniture! I am interested in educational furniture for my institution.\n\n`;
  if (details?.institution) {
    text += `*Institution:* ${details.institution}\n`;
  }
  if (details?.productName) {
    text += `*Product:* ${details.productName}\n`;
  }
  if (details?.quantity) {
    text += `*Estimated Quantity:* ${details.quantity} units\n`;
  }
  if (details?.customMessage) {
    text += `*Note:* ${details.customMessage}\n`;
  }
  text += `\nPlease provide a formal quotation and product catalog. Thank you!`;

  return `https://wa.me/${COMPANY_INFO.contact.whatsappClean}?text=${encodeURIComponent(text)}`;
}
