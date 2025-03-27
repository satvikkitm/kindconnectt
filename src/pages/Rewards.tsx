import React from 'react';
import { Heart, Gift, AlertCircle } from 'lucide-react';
import { useTokens } from '../contexts/TokenContext';

const Rewards = () => {
  const { balance, rewards, exchanges, exchangeTokens } = useTokens();
  const [error, setError] = React.useState('');

  const handleExchange = async (rewardId: string, cost: number) => {
    try {
      setError('');
      await exchangeTokens(rewardId, cost);
    } catch (err) {
      setError('Failed to exchange tokens. Please try again.');
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rewards Exchange</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exchange your earned Hearts for amazing rewards. Your current balance:
            <span className="ml-2 text-red-500 font-semibold flex items-center justify-center">
              <Heart className="h-6 w-6 mr-1" fill="currentColor" />
              {balance} Hearts
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-md p-4 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {reward.image_url && (
                <img
                  src={reward.image_url}
                  alt={reward.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-red-500">
                    <Heart className="h-5 w-5 mr-1" fill="currentColor" />
                    <span>{reward.token_cost} Hearts</span>
                  </div>
                  <button
                    onClick={() => handleExchange(reward.id, reward.token_cost)}
                    disabled={balance < reward.token_cost || reward.available_quantity === 0}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Exchange
                  </button>
                </div>
                {reward.available_quantity === 0 && (
                  <p className="text-sm text-gray-500 mt-2">Out of stock</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Exchange History</h2>
          <div className="space-y-4">
            {exchanges.map((exchange) => {
              const reward = rewards.find((r) => r.id === exchange.reward_id);
              return (
                <div
                  key={exchange.id}
                  className="bg-white p-4 rounded-md shadow flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Gift className="h-6 w-6 text-red-500 mr-3" />
                    <div>
                      <h3 className="font-semibold">{reward?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(exchange.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-1" fill="currentColor" />
                    <span>{exchange.token_amount} Hearts</span>
                    <span className="ml-4 px-2 py-1 rounded-full text-xs font-medium capitalize" 
                      style={{
                        backgroundColor: exchange.status === 'completed' ? '#DEF7EC' : '#FEF3C7',
                        color: exchange.status === 'completed' ? '#03543F' : '#92400E'
                      }}
                    >
                      {exchange.status}
                    </span>
                  </div>
                </div>
              );
            })}
            {exchanges.length === 0 && (
              <p className="text-gray-500 text-center py-4">No exchanges yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;