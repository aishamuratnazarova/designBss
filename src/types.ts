export interface BusinessDirection {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  logo: string; // text representation or svg icon name
  iconUrl?: string; // AI generated icon
  website: string;
  metrics?: { label: string; value: string }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: 'company' | 'industry' | 'events';
  categoryLabel: string;
  lead: string;
  content: string;
  image?: string; // Opt text or svg placeholder pattern
}

export interface EducationEvent {
  id: string;
  title: string;
  date: string; // ISO date string or formatted date
  time: string; // e.g. "14:00 (МСК)"
  type: 'online' | 'offline';
  direction: 'cosmetology' | 'pharmacy' | 'management';
  directionLabel: string;
  speaker: {
    name: string;
    position: string;
    photo: string; // placeholder initials or pattern
  };
  price: 'free' | 'paid';
  priceValue?: string;
  totalSeats?: number;
  availableSeats?: number;
  isCompleted: boolean;
  recordingUrl?: string;
}

export interface Branch {
  id: string;
  city: string;
  name: string;
  address: string;
  phones: string[];
  emails: { [key: string]: string };
  hours: string;
  coordinates: [number, number]; // [lat, lng] percentage from container or relative coordinates for simulated visual map mapping
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  itemsCount: number;
  totalAmount: string;
  invoiceNumber: string;
}

export interface DocumentInfo {
  id: string;
  name: string;
  date: string;
  status: 'signed_by_us' | 'waiting_for_partner' | 'fully_signed';
  type: 'contract' | 'act' | 'invoice';
}
