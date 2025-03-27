export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  is_organization: boolean;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  org_name: string;
  description: string | null;
  verification_status: string;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: string;
  title: string;
  description: string | null;
  condition: string;
  category: string;
  image_url: string | null;
  status: string;
  donor_id: string;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  item_id: string;
  donor_id: string;
  recipient_id: string;
  status: string;
  pickup_address: string | null;
  pickup_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TokenBalance {
  user_id: string;
  balance: number;
  total_earned: number;
  last_updated: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  token_cost: number;
  available_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Exchange {
  id: string;
  user_id: string;
  reward_id: string;
  token_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}