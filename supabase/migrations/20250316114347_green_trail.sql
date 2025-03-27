/*
  # Initial Schema Setup for Kind Connect

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to Supabase auth.users
    - `items`
      - Stores donation items
    - `organizations`
      - Stores NGO information
    - `donations`
      - Tracks donation transactions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  phone text,
  address text,
  is_organization boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read any profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY REFERENCES profiles(id),
  org_name text NOT NULL,
  description text,
  verification_status text DEFAULT 'pending',
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Organizations can update own profile"
  ON organizations FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  condition text NOT NULL,
  category text NOT NULL,
  image_url text,
  status text DEFAULT 'available',
  donor_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read available items"
  ON items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create items"
  ON items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Users can update own items"
  ON items FOR UPDATE
  TO authenticated
  USING (auth.uid() = donor_id);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES items(id),
  donor_id uuid REFERENCES profiles(id),
  recipient_id uuid REFERENCES profiles(id),
  status text DEFAULT 'pending',
  pickup_address text,
  pickup_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own donations"
  ON donations FOR SELECT
  TO authenticated
  USING (auth.uid() = donor_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create donations"
  ON donations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = donor_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can update own donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (auth.uid() = donor_id OR auth.uid() = recipient_id);