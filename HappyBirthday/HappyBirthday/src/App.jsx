import { useState, useEffect } from 'react';
import us from './assets/images/us.jpg';
import us2 from './assets/images/us2.jpg';
import './App.css'; // Import CSS for fonts and additional styling

function TypewriterText() {
  const fullText = `I still remember the first time we met — the excitement, the smiles, and the feeling of something truly special beginning. That moment will always hold a special place in my heart. 💖

Since then, every day with you has been a beautiful journey — filled with laughter, love, and countless unforgettable memories. From holding hands for the first time to dreaming about our future together, you've made every moment magical. ✨

You’re not just my love, you’re my best friend, my safe place, and the reason my heart smiles every single day. Here’s to us, to our love, and to the many adventures that await. I love you more than words can ever express. ❤️`;

  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line font-poppins">
      {displayText}
      <span className="animate-pulse">|</span>
    </p>
  );
}

function App() {
  return (
    <div className='w-full h-full bg-[#fdf6f6] scroll-smooth font-poppins'>

      {/* Hero Section */}
      <div className="w-full h-screen flex flex-col md:flex-row items-center px-6 md:px-16 bg-gradient-to-br from-rose-100 to-amber-100">
        <div className="z-10 text-center md:text-left md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-5xl md:text-8xl font-bold text-rose-600 font-serif leading-tight">
            Happy Birthday
          </h1>
          <h2 className="text-3xl md:text-6xl font-serif text-rose-400 italic mt-2">
            My Love ❤️
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Celebrating YOU today and always 🌸
          </p>
        </div>

        <div className="h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-3xl shadow-xl border-4 border-rose-200 overflow-hidden">
          <img src={us} alt="Us" className="w-full h-full object-cover rounded-3xl" />
        </div>
      </div>

      {/* Birthday Wish Section */}
      <div className="bg-gradient-to-b from-amber-100 to-rose-100 py-16 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-rose-500">Wishing You the Best Day Ever 🎂</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-800">
          On this special day, I want to remind you how truly loved you are. You light up my life with your smile, kindness, and laughter. Here's to making your birthday as unforgettable and magical as you are. 💕
        </p>
        <div className="mt-10 animate-bounce text-4xl"> 🎉🎈💖 </div>
      </div>

      {/* Our First Meet Section */}
      <div className='px-6 md:px-16 py-16 bg-[#fdf6f6]'>
        <h3 className='font-serif font-semibold text-4xl md:text-5xl text-center mb-10 text-rose-500'>
          Our First Meet
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src={us2}
              alt="Our First Meet"
              className="rounded-2xl w-full h-[500px] object-cover shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-rose-400">
              The Day Everything Changed 💫
            </h2>
            <TypewriterText />
          </div>
        </div>
      </div>

      {/* Our Moments Gallery */}
      <div className="px-6 md:px-16 py-16 bg-white">
        <h3 className="text-4xl md:text-5xl font-serif font-bold text-center mb-10 text-rose-500">
          Our Moments Together 📸
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[us, us2, us].map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-md hover:shadow-rose-300 transition-transform duration-500 hover:scale-105 border border-rose-100">
              <img src={img} alt={`Moment ${i + 1}`} className="w-full h-[500px] object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Final Message */}
      <div className="bg-rose-100 py-20 text-center">
        <h3 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-rose-600">I Love You Forever 💖</h3>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          No matter where life takes us, my heart will always belong to you. Thank you for being you — perfect, kind, and mine. Happy Birthday, my forever love. 🌹
        </p>
        <div className="mt-10 text-5xl animate-pulse"> 🎆✨💘 </div>
      </div>

    </div>
  );
}

export default App;
