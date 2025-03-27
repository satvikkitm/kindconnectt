import React, { useState } from 'react';
import { Upload, Package, CheckCircle } from 'lucide-react';
import AIDonationHelper from '../components/AIDonationHelper';
import Confetti from 'react-confetti';

 

const Donate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    condition: 'new',
    category: 'clothing',
    image: null as File | null
  });
 const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Donation submitted:', formData);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false); // Hide animation after a few seconds
    }, 5000);

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleAISuggestions = (suggestions: any) => {
    // Optionally update form based on AI suggestions
    if (suggestions.items.length > 0) {
      setFormData(prev => ({
        ...prev,
        description: prev.description + '\n\nSuggested items: ' + suggestions.items.join(', ')
      }));
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Donate Items</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your unused items can make a significant difference in someone's life. Fill out the
            form below to start your donation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">1. Describe Your Item</h3>
            <p className="text-gray-600">
              Provide details about the item you wish to donate, including its condition and category.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">2. Add Photos</h3>
            <p className="text-gray-600">
              Upload clear photos of your item to help NGOs better understand what you're donating.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">3. Submit</h3>
            <p className="text-gray-600">
              Submit your donation and we'll connect you with the right NGO to collect your item.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Item Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="clothing">Clothing</option>
                  <option value="furniture">Furniture</option>
                  <option value="electronics">Electronics</option>
                  <option value="books">Books</option>
                  <option value="toys">Toys</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Item Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  isSubmitted ? 'bg-green-500' : 'bg-red-500 hover:bg-red-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitted ? 'Submitted' : isSubmitting ? 'Submitting...' : 'Submit Donation'}
                {!isSubmitted && <Upload className="ml-2 h-5 w-5" />}
              </button>
              <div>
            {isSubmitted && <Confetti />}
          </div>
            </form>
          </div>
         
          <div>
            <AIDonationHelper onSuggestionsReceived={handleAISuggestions} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Donate;