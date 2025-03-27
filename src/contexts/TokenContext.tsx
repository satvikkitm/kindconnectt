import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Reward, Exchange } from '../types/database';
import { supabase } from '../lib/supabase';

interface TokenContextType {
  balance: number;
  totalEarned: number;
  loading: boolean;
  rewards: Reward[];
  exchanges: Exchange[];
  earnTokens: (amount: number) => Promise<void>;
  exchangeTokens: (rewardId: string, amount: number) => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

const DEFAULT_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Premium Donation Badge',
    description: 'A special badge to showcase your generous contributions',
    image_url: 'https://images.unsplash.com/photo-1562051036-e0eea191d42f',
    token_cost: 50,
    available_quantity: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Featured Donor Status',
    description: 'Get featured on our homepage as a top donor for one week',
    image_url: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b',
    token_cost: 100,
    available_quantity: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Charity Choice Award',
    description: 'Choose a charity to receive a special donation in your name',
    image_url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6',
    token_cost: 200,
    available_quantity: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(100);
  const [totalEarned, setTotalEarned] = useState(100);
  const [loading, setLoading] = useState(false);
  const [rewards] = useState<Reward[]>(DEFAULT_REWARDS);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  const earnTokens = useCallback(async (amount: number) => {
    try {
      setLoading(true);
      
      // In a real app, this would be a call to your backend
      const newBalance = balance + amount;
      const newTotalEarned = totalEarned + amount;

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setBalance(newBalance);
      setTotalEarned(newTotalEarned);

      return Promise.resolve();
    } catch (error) {
      console.error('Error earning tokens:', error);
      throw new Error('Failed to earn tokens');
    } finally {
      setLoading(false);
    }
  }, [balance, totalEarned]);

  const exchangeTokens = useCallback(async (rewardId: string, amount: number) => {
    try {
      setLoading(true);

      // Validate balance
      if (balance < amount) {
        throw new Error('Insufficient token balance');
      }

      // Find the reward
      const reward = rewards.find(r => r.id === rewardId);
      if (!reward) {
        throw new Error('Reward not found');
      }

      // Validate reward availability
      if (reward.available_quantity <= 0) {
        throw new Error('Reward out of stock');
      }

      // In a real app, this would be a transaction in your backend
      const newBalance = balance - amount;
      
      // Create exchange record
      const newExchange: Exchange = {
        id: crypto.randomUUID(),
        user_id: 'demo-user',
        reward_id: rewardId,
        token_amount: amount,
        status: 'completed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setBalance(newBalance);
      setExchanges(prev => [newExchange, ...prev]);

      return Promise.resolve();
    } catch (error) {
      console.error('Error exchanging tokens:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [balance, rewards]);

  const refreshBalance = useCallback(async () => {
    try {
      setLoading(true);
      
      // In a real app, this would fetch the latest balance from your backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error refreshing balance:', error);
      throw new Error('Failed to refresh balance');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    balance,
    totalEarned,
    loading,
    rewards,
    exchanges,
    earnTokens,
    exchangeTokens,
    refreshBalance,
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
}