import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactUs = () => {
  return (
    <section
      className="relative py-20 text-white overflow-hidden 
      bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586768630682-6ffccd5624ca?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-red-900/10 backdrop-blur-[2px]"></div>

      {/* Red Wave Shape */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          className="absolute top-0"
          preserveAspectRatio="none"
        >
          <path
            fill="#ff0033"
            fillOpacity="0.4"
            d="M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,186.7C672,181,768,139,864,144C960,149,1056,203,1152,234.7C1248,267,1344,277,1392,282.7L1440,288V0H0Z"
          />
        </svg>
      </div>

      {/* Random Particles */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold mb-4">
            Contact <span className="text-red-600">Us</span>
          </h2>

          <p className="text-red-200 text-lg leading-relaxed mb-12">
            Reach out anytime for emergency blood requests, donor help, or
            general support.
          </p>

          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-xl font-semibold">+880 1234-567890</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-xl font-semibold">support@bloodcare.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-xl font-semibold">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-black/30 border border-white/20 p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Send Us a Message
            </h3>

            <form className="space-y-5">
              <div>
                <label className="block text-sm text-red-200 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-red-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm text-red-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-red-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-red-200 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-red-300"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
