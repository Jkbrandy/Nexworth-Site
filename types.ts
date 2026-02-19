
export enum UserRole {
  VISITOR = 'visitor',
  MEMBER = 'member',
  MERCHANT = 'merchant',
  ADMIN = 'admin'
}

export enum ApplicationStatus {
  NONE = 'none',
  APPLIED = 'applied',
  VERIFIED = 'verified',
  APPROVED = 'approved',
  ACTIVE = 'active',
  DECLINED = 'declined'
}

export enum OfferCategory {
  TRANSPORT = 'Transport',
  SKILLS = 'Skills',
  DIGITAL = 'Digital Tools',
  ESSENTIALS = 'Essentials'
}

export interface Profile {
  user_id: string;
  verification_id?: string;
  activation_code?: string;
  full_name: string;
  email: string;
  country: string;
  role: UserRole;
  status: ApplicationStatus;
  joined_at: string;
  membership_paid: boolean;
}

export interface Offer {
  id: string;
  merchant_id: string;
  merchant_name: string;
  title: string;
  description: string;
  category: OfferCategory;
  terms: string;
  discount_type: 'percentage' | 'fixed' | 'freebie';
  discount_value: string;
  expiry_date: string;
  status: 'draft' | 'published' | 'expired';
}

export interface Merchant {
  id: string;
  owner_id: string;
  business_name: string;
  country: string;
  status: 'pending' | 'approved' | 'active';
  contact_email: string;
}

export interface Redemption {
  id: string;
  offer_id: string;
  user_id: string;
  redeemed_at: string;
  merchant_name: string;
  offer_title: string;
}

export interface PlatformSettings {
  free_slots_remaining: number;
  total_members: number;
  annual_price_gbp: number;
}
