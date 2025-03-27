import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Award, Users } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

const About = () => {
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            About Kind Connect
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            We're on a mission to create a world where no one lacks basic necessities by connecting
            generous donors with those in need through a network of verified NGOs.
          </motion.p>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          variants={stagger}
        >
          {[
            { icon: Heart, title: "Compassion", text: "We believe in the power of kindness..." },
            { icon: Award, title: "Integrity", text: "We maintain the highest standards..." },
            { icon: Users, title: "Community", text: "We foster meaningful connections..." },
          ].map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center hover:-translate-y-2 transition-transform duration-300"
            >
              <motion.div 
                className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1 }}
              >
                <value.icon className="h-8 w-8 text-red-500" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          ref={storyRef}
          className="bg-gray-50 rounded-2xl p-8 mb-16"
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            variants={fadeInUp}
          >
            Our Story
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeInUp}>
              <p className="text-gray-600 mb-4">
                Kind Connect was born from a simple observation: while many people have excess items
                they no longer need, others struggle to access basic necessities. We built this
                platform to bridge this gap and make giving easier and more impactful.
              </p>
              <p className="text-gray-600">
                Today, we work with dozens of verified NGOs and have helped thousands of people
                access the items they need. Our community of donors continues to grow, proving that
                small acts of kindness can create massive positive change.
              </p>
            </motion.div>
            <motion.div
              variants={scaleUp}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="People helping people"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          ref={teamRef}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            variants={fadeInUp}
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  {[
    { 
      name: "Naman Verma", 
      role: "Founder & CEO",
      image: "/images/naman.jpg" // Update this path
    },
    { 
      name: "Satvik Shrivastava", 
      role: "DataBase Manager",
      image: "/images/satvik.jpg"
    },
    { 
      name: "Parul Jain", 
      role: "Backend Developer",
      image: "/images/parul.jpg"
    },
    { 
      name: "Palak Shrivastava", 
      role: "FrontEnd Developer",
      image: "/images/palak.jpg"
    },
  ].map((member, index) => (
    <motion.div
      key={index}
      variants={fadeInUp}
      className="text-center hover:transform hover:-translate-y-2 transition-all duration-300"
    >
      <motion.img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
        whileHover={{ scale: 1.1 }}
      />
      <h3 className="text-xl font-semibold">{member.name}</h3>
      <p className="text-gray-600">{member.role}</p>
    </motion.div>
  ))}
</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;