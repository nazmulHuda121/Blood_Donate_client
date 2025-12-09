import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rafi Ahmed',
    role: 'Blood Recipient',
    image:
      'https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    message:
      'I received blood within 45 minutes during an emergency. The donors here truly saved my life.',
  },
  {
    name: 'Sadia Islam',
    role: 'Volunteer Donor',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    message:
      'Donating blood through this platform was incredibly easy and meaningful. Highly recommended!',
  },
  {
    name: 'Tanvir Hasan',
    role: 'Donor',
    image:
      'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
    message:
      'Great initiative! I matched with someone instantly and donated without hassle.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Survivor',
    image:
      'https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
    message:
      'Finding a rare blood donor was almost impossible. This platform gave me a second chance.',
  },
];

const SuccessStories = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-red-50 to-white overflow-hidden">
      {/* Soft Red Glow */}
      <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-red-300/40 blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-red-200/30 blur-[120px]"></div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Success <span className="text-red-600">Stories</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Real experiences from people who donated and received life-saving
          blood.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 20px 40px rgba(255, 0, 0, 0.15)',
              borderColor: 'rgba(255, 0, 0, 0.4)',
            }}
            className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-8 pt-12 relative transition-all duration-300"
          >
            {/* Avatar */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-red-200 shadow-xl"
              />
            </div>

            {/* Text */}
            <div className="text-center mt-6">
              <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>
              <p className="text-sm text-red-600 font-medium mb-4">{t.role}</p>

              <p className="text-gray-700 leading-relaxed text-sm">
                {t.message}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
