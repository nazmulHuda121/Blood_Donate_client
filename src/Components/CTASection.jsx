export default function CTASection() {
  return (
    <section className="relative text-white py-24 px-6 overflow-hidden">
      {/* Dark + Red Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-black/50 to-black/70"></div>

      {/* Red Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 blur-[150px]"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
          Every Drop
          <span className="text-red-400"> Can Save a Life</span>
        </h2>

        {/* Subtext */}
        <p className="mt-5 text-lg md:text-xl text-red-100 max-w-3xl mx-auto">
          Become a lifesaver today. Donate blood, support patients in emergency
          situations, and make an impact in your community.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-5">
          <a
            href="/register"
            className="px-10 py-4 rounded-xl bg-red-600 font-semibold text-lg shadow-xl
            hover:bg-red-700 transition-all duration-300 hover:scale-105"
          >
            Become a Donor
          </a>

          <a
            href="/contact"
            className="px-10 py-4 rounded-xl border-2 border-red-300 backdrop-blur-md
            bg-white/10 font-semibold text-lg hover:bg-white/20
            transition-all duration-300 hover:scale-105"
          >
            Need Blood? Contact Us
          </a>
        </div>

        {/* Bottom Text */}
        <p className="mt-8 text-sm text-red-200 tracking-wide">
          Safe • Quick • Verified Donors • 24/7 Support
        </p>
      </div>
    </section>
  );
}
