import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Who can donate blood?',
    a: 'Anyone aged 18–65, weighing at least 50 kg, and in good health can donate blood.',
  },
  {
    q: 'How often can I donate?',
    a: 'You can donate whole blood every 120 days (4 months).',
  },
  {
    q: 'Is blood donation safe?',
    a: 'Yes. All equipment is sterile and used only once, ensuring complete safety.',
  },
  {
    q: 'Will I feel weak after donating?',
    a: 'Most donors feel normal after resting for 10–15 minutes and drinking fluids.',
  },
  {
    q: 'Is my personal information secure?',
    a: 'Yes, your data is securely stored and only used for matching donors with patients.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Frequently <span className="text-red-600">Asked</span> Questions
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-5"
        >
          {faqs.map((item, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className={`rounded-xl border shadow-md bg-white/90 backdrop-blur-sm transition-all duration-300 
                  ${
                    isOpen ? 'border-red-400 shadow-red-200' : 'border-gray-200'
                  }`}
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <h3
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      isOpen ? 'text-red-600' : 'text-gray-800'
                    }`}
                  >
                    {item.q}
                  </h3>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <ChevronDown
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isOpen ? 'text-red-600' : 'text-gray-600'
                      }`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        paddingTop: 16,
                        paddingBottom: 16,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="px-6 text-gray-700 overflow-hidden"
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
