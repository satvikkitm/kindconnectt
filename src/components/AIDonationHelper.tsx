import React, { useState } from 'react';
import { MessageSquare, Loader, ThumbsUp } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

interface Props {
  onSuggestionsReceived?: (suggestions: any) => void;
}

const AIDonationHelper: React.FC<Props> = ({ onSuggestionsReceived }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]); // Array of strings

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuggestions([]);

    try {
      console.log("Fetching AI donation suggestions for:", description);
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: description }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("AI Suggestions received:", data);

      if (!data?.candidates || data.candidates.length === 0) {
        throw new Error("No valid suggestions received");
      }

      // Extract and format response
      const textResponse: string = data.candidates[0]?.content?.parts?.[0]?.text?.trim() || "";
      
      if (!textResponse) {
        throw new Error("Received empty response from AI");
      }

      // Split response into lines (filter out empty lines)
      const formattedSuggestions: string[] = textResponse.split("\n").filter((line: string) => line.trim() !== "");

      setSuggestions(formattedSuggestions);
    } catch (err: any) {
      console.error("Error fetching AI suggestions:", err);
      setError(err.message || 'Failed to get suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <MessageSquare className="h-6 w-6 text-red-500 mr-2" />
        <h3 className="text-lg font-semibold">AI Donation Assistant</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Describe the donation need or situation
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="E.g., A local school in a low-income area needs supplies for 100 students..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Getting suggestions...
            </>
          ) : (
            'Get AI Suggestions'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Suggested Donations:</h4>
            <ul className="list-disc list-inside text-gray-600">
              {suggestions.map((line: string, index: number) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end text-sm text-gray-500">
            <ThumbsUp className="h-4 w-4 mr-1" />
            AI-powered suggestions
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDonationHelper;
