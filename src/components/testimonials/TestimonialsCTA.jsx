export default function TestimonialsCTA() {
  return (
    <div className="text-center mt-16 p-12 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
      <h2 className="text-3xl font-bold text-white mb-4">
        Ready to Start Your Project?
      </h2>
      <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
        Join our growing list of satisfied clients. Let us help bring your vision to life with professional drafting services.
      </p>

      <a
        href="/contact"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-lg"
      >
        Schedule Your Consultation
      </a>
    </div>
  );
}

