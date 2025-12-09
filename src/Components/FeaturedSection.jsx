import { Heart, Search, Shield, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Featured = () => {
  const features = [
    {
      title: 'Why Donate Blood?',
      desc: 'Every donation can save up to 3 lives. Your small effort creates a huge impact.',
      icon: <Heart className="w-12 h-12 text-red-500" />,
    },
    {
      title: 'Search Donors Fast',
      desc: 'Find verified donors instantly using our advanced search system.',
      icon: <Search className="w-12 h-12 text-red-500" />,
    },
    {
      title: 'Emergency Requests',
      desc: 'Post urgent blood requests and notify donors in your area immediately.',
      icon: <Bell className="w-12 h-12 text-red-500" />,
    },
    {
      title: 'Verified Donor Profiles',
      desc: 'All donors are manually verified to ensure safety and authenticity.',
      icon: <Shield className="w-12 h-12 text-red-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-4"
        >
          Why Choose <span className="text-red-300">BloodCare?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-2xl mx-auto text-red-200 mb-12"
        >
          We built a modern and safe blood donation system connecting donors
          with patients instantly.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 hover:bg-white/20 hover:scale-[1.03] transition-all"
            >
              <div className="flex justify-center mb-5">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-red-200 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
