import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTint } from 'react-icons/fa';

const galleryImages = [
  'https://media.istockphoto.com/id/807903666/photo/female-phlebotomist-wraps-young-girls-arm-after-blood-draw.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZWZMbEtR3K-4-j5r_LTMEVVk_XTxmGsEbhtpnuIO31A=',
  'https://media.istockphoto.com/id/2233005324/photo/happy-young-female-surgeon-doctor-holding-red-heart.jpg?s=612x612&w=0&k=20&c=_Xb3XjsGatMC6CG5kfO22CTi-cbl9yfNZeflyPAbpqg=',
  'https://media.istockphoto.com/id/1906479462/photo/nurse-takes-blood-test-of-a-young-woman-in-laboratory.jpg?s=612x612&w=0&k=20&c=z2VAGmJHBVwsuC1y4mPqxsLZJCzO1pz7ZxnmO8TF72E=',
  'https://media.istockphoto.com/id/2187231545/photo/a-strong-female-in-a-hospital-clinical-setting-with-a-bandage-on-arm-giving-blood-supporting.jpg?s=612x612&w=0&k=20&c=Xe16Ww8fAwbgYbTBwu9YdYpU5DFhV4hBVwnMrA1wCas=',
  'https://media.istockphoto.com/id/470463300/photo/blood-test-preparing.jpg?s=612x612&w=0&k=20&c=xvQMCbflL0I0NfYpOGi0Kr5_ibuQXcGh7EGY1D--PgA=',
  'https://media.istockphoto.com/id/157409107/photo/nurse-makes-to-man-an-intravenous-injection.jpg?s=612x612&w=0&k=20&c=41QVbKYWgdLEQL7YEQNs6s4LUwHAtaNRtLR9WjwnBrA=',
  'https://media.istockphoto.com/id/843487646/photo/preparation-for-blood-test-with-pretty-young-blond-woman-by-female-doctor-in-white-coat.jpg?s=612x612&w=0&k=20&c=P6c3JAaK4Sr-pCmV6DGuZ7XAXhBuTToLiK8FAaIfg7c=',
  'https://media.istockphoto.com/id/1473857164/photo/preparation-for-blood-test-by-female-doctor-medical-uniform-on-the-table-in-white-bright-room.jpg?s=612x612&w=0&k=20&c=UohW1j4mzEqL0QLLgnXY1cLQCCD6Ry_cJZtFKsW774w=',
  'https://images.unsplash.com/photo-1676313125237-cacf3e880dc2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGJsb29kJTIwZG9uYXRpb258ZW58MHx8MHx8fDA%3D',
];

const GalleryColumn = ({ images, direction = 'down', speed = 25 }) => {
  const gap = 16;
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setVh(window.innerHeight);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const imgHeight = isMobile ? 120 : 180;
  const heightPerImage = imgHeight + gap;
  const totalHeight = images.length * heightPerImage;
  const loopImages = [...images, ...images];

  return (
    <div className="overflow-hidden flex flex-col gap-4">
      <motion.div
        animate={{
          y: direction === 'down' ? [0, -totalHeight] : [-totalHeight, 0],
        }}
        transition={{
          duration: isMobile ? speed + 15 : speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex flex-col gap-4"
      >
        {loopImages.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt={`gallery-${i}`}
            className="object-cover rounded-xl border border-red-300/40 shadow-lg w-36 sm:w-[200px] md:w-[240px] lg:w-[280px] h-[120px] sm:h-[160px] md:h-[180px] lg:h-[180px]"
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const GallerySection = () => {
  return (
    <section className="relative w-full h-[80vh] py-16 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-red-100/10 to-black">
      {/* Background soft red glows */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-200 rounded-full blur-[120px] -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-red-300 rounded-full blur-[150px] -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 3 }}
      />

      {/* Floating blood icons */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-600 text-3xl"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90 + 5}%`,
          }}
          animate={{ y: [0, 20, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 3,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        >
          <FaTint />
        </motion.div>
      ))}

      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-10 text-center drop-shadow-md">
        Blood Donors Gallery
      </h2>

      {/* Gallery Columns */}
      <div className="relative flex justify-center gap-4 px-4 md:px-8 w-full max-w-7xl">
        {[0, 1, 2, 3].map((i) => (
          <GalleryColumn
            key={i}
            images={galleryImages}
            direction={i % 2 === 0 ? 'down' : 'up'}
            speed={25 + i * 5}
          />
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
