import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerChildren}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <motion.div variants={footerVariants}>
            <div className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-8 w-8 text-red-500" />
              </motion.div>
              <span className="ml-2 text-xl font-bold">Kind Connect</span>
            </div>
            <motion.p 
              className="mt-4 text-gray-400"
              variants={footerVariants}
            >
              Connecting hearts, sharing hope, and making a difference in lives.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={footerVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Contact', 'Donate'].map((link, index) => (
                <motion.li 
                  key={link}
                  variants={footerVariants}
                  whileHover={{ x: 5 }}
                >
                  <Link to={`/${link.toLowerCase().replace(' ', '')}`} 
                    className="text-gray-400 hover:text-white">
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={footerVariants}>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              {[
                { icon: Phone, text: '+91 8319214433' },
                { icon: Mail, text: 'info@kindconnect.org' },
                { icon: MapPin, text: 'Sitholi Campus Itm Universe Gwalior' }
              ].map((item, index) => (
                <motion.li 
                  key={item.text}
                  className="flex items-center"
                  variants={footerVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <item.icon className="h-5 w-5 mr-2 text-red-500" />
                  <span className="text-gray-400">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={footerVariants}>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates.</p>
            <form className="space-y-2">
              <motion.input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
          variants={footerVariants}
        >
          <p>&copy; {new Date().getFullYear()} Kind Connect. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;