import {
  ArrowRight, Users, Gift, Building2, Heart,
  ChevronRight, Calendar, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PovertyMap from "../components/PovertyMap"; // ✅ Ensure the path is correct

const Home = () => {
  return (
    <div>
       {/* Hero Section */}
       <motion.section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            className="text-white max-w-3xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-6">Making a Difference Together</h1>
            <p className="text-xl mb-8">
              Connect with those in need and share your unused items. Join our community of donors,
              NGOs, and volunteers making a positive impact in people's lives.
            </p>
            <div className="flex gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                Start Donating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
          {/* Stats Section */}
      <motion.section
       className="py-12 bg-gradient-to-r from-gray-200 via-white to-gray-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { value: "10,000+", label: "Items Donated" },
            { value: "5,000+", label: "Lives Impacted" },
            { value: "50+", label: "NGO Partners" },
            { value: "100+", label: "Communities Served" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center text-black"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Gift className="h-8 w-8 text-red-500" />,
                title: "Donate Items",
                description: "Share your unused items with those who need them most. Every donation makes a difference.",
              },
              {
                icon: <Building2 className="h-8 w-8 text-red-500" />,
                title: "Connect with NGOs",
                description: "Partner with verified NGOs to ensure your donations reach the right people.",
              },
              {
                icon: <Users className="h-8 w-8 text-red-500" />,
                title: "Help Communities",
                description: "Create lasting impact in communities by supporting those in need.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Poverty Map Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Poverty Map of India</h2>
          <p className="text-gray-600 mb-6">
            Visualizing poverty levels across different regions of India.
          </p>
          <div className="flex justify-center">
            <PovertyMap /> {/* ✅ Integrated correctly */}
          </div>
        </div>
      </section>

    {/* Recent Donations Section */}
<motion.section
  className="py-20 bg-white"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
>
  <div className="max-w-7xl mx-auto px-4">
    <motion.h2
      className="text-3xl font-bold text-center mb-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      Recent Donations
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Winter Clothing Drive",
          image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          location: "Delhi, India",
          date: "2 days ago",
          items: 150,
        },
        {
          title: "School Supplies Collection",
          image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          location: "Mumbai, India",
          date: "4 days ago",
          items: 300,
        },
        {
          title: "Food Bank Support",
          image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          location: "Kolkata, India",
          date: "1 week ago",
          items: 500,
        },
      ].map((donation, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{donation.title}</h3>
            <div className="flex items-center text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{donation.location}</span>
            </div>
            <div className="flex items-center text-gray-500 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">{donation.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-500 font-semibold">
                {donation.items} items
              </span>
              <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>

    </div>
  );
};

export default Home;
