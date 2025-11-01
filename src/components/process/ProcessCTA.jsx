export default function ProcessCTA() {
  return (
    <div className="text-center mt-20 p-12 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
      <h2 className="text-3xl font-bold text-white mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
        Let's discuss your project and how our proven process can bring your vision to life.
      </p>

      <a
        href="/contact"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-lg"
      >
        Schedule Your Free Consultation
      </a>
    </div>
  );
}

