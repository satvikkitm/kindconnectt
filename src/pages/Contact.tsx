import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Have questions about Kind Connect? We're here to help. Reach out to us through any
            of the channels below.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            ref={infoRef}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-semibold mb-6">
              Get in Touch
            </motion.h2>
            
            <motion.div variants={stagger} className="space-y-6">
              {[
                { icon: Phone, title: "Phone", text: "+91 8319214433" },
                { icon: Mail, title: "Email", text: "info@kindconnect.org" },
                { icon: MapPin, title: "Address", text: "Sitholi Campus Itm Universe Gwalior" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={slideIn}
                  className="flex items-center hover:bg-gray-50 p-4 rounded-lg transition-colors"
                >
                  <item.icon className="h-6 w-6 text-red-500 mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mt-12"
            >
              <h2 className="text-2xl font-semibold mb-6">Office Hours</h2>
              <motion.div 
                variants={stagger}
                className="space-y-2"
              >
                {[
                  "Monday - Friday: 9:00 AM - 6:00 PM",
                  "Saturday: 10:00 AM - 4:00 PM",
                  "Sunday: Closed"
                ].map((text, index) => (
                  <motion.p 
                    key={index}
                    variants={fadeInUp}
                    className="text-gray-600"
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: 'Name', type: 'text' },
                { id: 'email', label: 'Email', type: 'email' },
                { id: 'subject', label: 'Subject', type: 'text' },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </motion.div>
              ))}

              <motion.div variants={fadeInUp}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full justify-center"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;