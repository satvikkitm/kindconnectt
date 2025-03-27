/*
  # Add Token Exchange System

  1. New Tables
    - `tokens`
      - Tracks user token balances
    - `rewards`
      - Available items that can be exchanged for tokens
    - `exchanges`
      - Records of token exchanges for rewards

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tokens table
CREATE TABLE IF NOT EXISTS tokens (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  balance integer DEFAULT 0,
  total_earned integer DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own token balance"
  ON tokens FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can update token balances"
  ON tokens FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  token_cost integer NOT NULL,
  available_quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rewards"
  ON rewards FOR SELECT
  TO authenticated
  USING (true);

-- Create exchanges table
CREATE TABLE IF NOT EXISTS exchanges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  reward_id uuid REFERENCES rewards(id),
  token_amount integer NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE exchanges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own exchanges"
  ON exchanges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create exchanges"
  ON exchanges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);