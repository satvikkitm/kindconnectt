import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, LogOut, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTokens } from '../contexts/TokenContext';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const { balance } = useTokens();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav  className="bg-gradient-to-r from-white via-gray-200 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/home" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="h-8 w-8 text-red-500" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-gray-800">Kind Connect</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Contact'].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.05 }}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/donate" className="text-gray-600 hover:text-gray-900">
                    Donate
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                  <Link to="/rewards" className="flex items-center text-gray-600 hover:text-gray-900">
                    <Gift className="h-5 w-5 mr-1" />
                    Rewards
                    <span className="ml-2 bg-red-100 text-red-500 px-2 py-1 rounded-full text-sm font-medium">
                      {balance} ❤️
                    </span>
                  </Link>
                </motion.div>

                <motion.button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Sign Out
                </motion.button>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['Home', 'About', 'Contact', 'Donate', 'Rewards'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                
                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;