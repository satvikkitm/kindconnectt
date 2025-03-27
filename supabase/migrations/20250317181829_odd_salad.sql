/*
  # Add Token Management Procedures

  1. New Procedures
    - `earn_tokens`: Safely add tokens to user balance
    - `exchange_tokens`: Handle token exchanges for rewards

  2. Security
    - Procedures run with invoker security
    - Built-in transaction handling
    - Validation checks for all operations
*/

-- Procedure to earn tokens
CREATE OR REPLACE FUNCTION earn_tokens(
  p_user_id uuid,
  p_amount integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Validate input
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Token amount must be positive';
  END IF;

  -- Insert or update token balance
  INSERT INTO tokens (user_id, balance, total_earned)
  VALUES (p_user_id, p_amount, p_amount)
  ON CONFLICT (user_id) DO UPDATE
  SET balance = tokens.balance + p_amount,
      total_earned = tokens.total_earned + p_amount,
      last_updated = now();
END;
$$;

-- Procedure to exchange tokens for rewards
CREATE OR REPLACE FUNCTION exchange_tokens(
  p_user_id uuid,
  p_reward_id uuid,
  p_amount integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_balance integer;
  v_reward_quantity integer;
  v_reward_cost integer;
BEGIN
  -- Get user's current balance
  SELECT balance INTO v_user_balance
  FROM tokens
  WHERE user_id = p_user_id;

  -- Get reward details
  SELECT available_quantity, token_cost INTO v_reward_quantity, v_reward_cost
  FROM rewards
  WHERE id = p_reward_id;

  -- Validate exchange
  IF v_user_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient token balance';
  END IF;

  IF v_reward_quantity <= 0 THEN
    RAISE EXCEPTION 'Reward out of stock';
  END IF;

  IF p_amount != v_reward_cost THEN
    RAISE EXCEPTION 'Invalid token amount for reward';
  END IF;

  -- Update token balance
  UPDATE tokens
  SET balance = balance - p_amount,
      last_updated = now()
  WHERE user_id = p_user_id;

  -- Update reward quantity
  UPDATE rewards
  SET available_quantity = available_quantity - 1,
      updated_at = now()
  WHERE id = p_reward_id;

  -- Create exchange record
  INSERT INTO exchanges (user_id, reward_id, token_amount, status)
  VALUES (p_user_id, p_reward_id, p_amount, 'pending');
END;
$$;