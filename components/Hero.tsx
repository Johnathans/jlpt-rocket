import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-16 px-6 m-6 rounded-lg shadow-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          Learn Japanese Through
          <span className="block text-green-500 font-japanese">読書</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Master Japanese reading with graded stories featuring furigana pronunciation guides. 
          Start your journey from beginner to advanced level.
        </p>
        
        {/* JLPT Level Buttons */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">Choose Your JLPT Level</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <Link 
              href="/stories?level=N5"
              className="group flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 border-b-4 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500 transition-all hover:translate-y-0.5 active:translate-y-0.5 rounded-lg shadow-sm"
            >
              <span className="text-3xl font-black text-green-500 mb-2 group-hover:text-green-600 transition-colors">N5</span>
              <span className="text-sm font-medium text-gray-600 text-center">Beginner</span>
            </Link>
            <Link 
              href="/stories?level=N4"
              className="group flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 border-b-4 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500 transition-all hover:translate-y-0.5 active:translate-y-0.5 rounded-lg shadow-sm"
            >
              <span className="text-3xl font-black text-blue-500 mb-2 group-hover:text-blue-600 transition-colors">N4</span>
              <span className="text-sm font-medium text-gray-600 text-center">Elementary</span>
            </Link>
            <Link 
              href="/stories?level=N3"
              className="group flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 border-b-4 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500 transition-all hover:translate-y-0.5 active:translate-y-0.5 rounded-lg shadow-sm"
            >
              <span className="text-3xl font-black text-yellow-500 mb-2 group-hover:text-yellow-600 transition-colors">N3</span>
              <span className="text-sm font-medium text-gray-600 text-center">Intermediate</span>
            </Link>
            <Link 
              href="/stories?level=N2"
              className="group flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 border-b-4 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500 transition-all hover:translate-y-0.5 active:translate-y-0.5 rounded-lg shadow-sm"
            >
              <span className="text-3xl font-black text-orange-500 mb-2 group-hover:text-orange-600 transition-colors">N2</span>
              <span className="text-sm font-medium text-gray-600 text-center">Upper-Int.</span>
            </Link>
            <Link 
              href="/stories?level=N1"
              className="group flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 border-b-4 border-b-gray-400 hover:border-gray-300 hover:border-b-gray-500 transition-all hover:translate-y-0.5 active:translate-y-0.5 rounded-lg shadow-sm col-span-2 md:col-span-1"
            >
              <span className="text-3xl font-black text-red-500 mb-2 group-hover:text-red-600 transition-colors">N1</span>
              <span className="text-sm font-medium text-gray-600 text-center">Advanced</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/stories"
            className="inline-block px-8 py-4 bg-green-500 text-white text-lg font-semibold border-2 border-green-500 border-b-4 border-b-green-600 hover:bg-green-600 hover:border-green-600 hover:border-b-green-700 transition-all hover:translate-y-0.5 active:translate-y-0.5 rounded-lg shadow-sm"
          >
            Start Reading
          </Link>
          <Link 
            href="/about"
            className="inline-block px-8 py-4 text-gray-700 text-lg font-semibold border-2 border-gray-300 border-b-4 border-b-gray-400 hover:bg-gray-50 hover:border-gray-400 hover:border-b-gray-500 transition-all hover:translate-y-0.5 active:translate-y-0.5 rounded-lg shadow-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}