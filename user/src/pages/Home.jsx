import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-7xl">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 sm:py-16 sm:rounded-3xl sm:px-10 lg:flex lg:items-center lg:gap-x-20 lg:px-16 lg:py-24">
            {/* Background Gradient */}
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-[50rem] sm:size-[64rem] -translate-y-1/2 sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#gradient)"
                fillOpacity="0.2"
              />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>

            {/* Left Content */}
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                International Seminar
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-300">
                Welcome to the International Seminar on Artificial Intelligence (ISAI),
                a premier global event bringing together researchers, industry leaders, and AI enthusiasts
                to explore the latest advancements in artificial intelligence.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start">
              <Link
      to="/login"
      className="w-full sm:w-auto rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-lg hover:bg-gray-100"
    >
      Login
    </Link>
    <Link
        to="/signup"
        className="text-lg font-semibold text-white"
      >
        Sign Up <span aria-hidden="true">→</span>
      </Link>


              </div>
            </div>

            {/* Right Image */}
            <div className="relative mt-12 sm:mt-16 lg:mt-0 flex justify-center">
              <img
                alt="AI Seminar"
                src="./public/ai.png"
                className="w-[16rem] sm:w-[20rem] md:w-[24rem] lg:w-[28rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Date & Venue */}
          <div className="text-center bg-white/5 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-400">📅 Date & Venue</h2>
            <p className="mt-3 text-lg">
              <strong>Date:</strong> September 10–12, 2025
            </p>
            <p className="text-lg">
              <strong>Venue:</strong> International Convention Center, Geneva, Switzerland
            </p>
          </div>

          {/* Mission */}
          <div className="text-center bg-white/5 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-400">🎯 Our Mission</h2>
            <p className="mt-3 text-lg text-gray-300">
              ISAI 2025 aims to foster innovation, collaboration, and knowledge exchange
              in AI research and applications, exploring cutting-edge developments and
              ethical considerations.
            </p>
          </div>

          {/* What to Expect */}
          <div className="text-center bg-white/5 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-400">🔍 What to Expect</h2>
            <ul className="mt-4 text-lg text-gray-300 space-y-2">
              <li>✅ Keynote Speeches from AI pioneers</li>
              <li>✅ Panel Discussions on AI ethics & industry trends</li>
              <li>✅ Hands-on Workshops with AI experts</li>
              <li>✅ Startup & Industry Showcase of AI solutions</li>
              <li>✅ Networking Events with researchers & developers</li>
            </ul>
          </div>

          {/* Facilities & Amenities */}
          <div className="text-center bg-white/5 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-400">🏢 Facilities & Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-300">
              <div className="bg-gray-800 p-3 rounded-lg">📌 Conference Halls</div>
              <div className="bg-gray-800 p-3 rounded-lg">📌 AI Exhibition Area</div>
              <div className="bg-gray-800 p-3 rounded-lg">📌 Breakout Rooms</div>
              <div className="bg-gray-800 p-3 rounded-lg">📌 Wi-Fi & Tech Support</div>
              <div className="bg-gray-800 p-3 rounded-lg">📌 Catering & Refreshments</div>
              <div className="bg-gray-800 p-3 rounded-lg">📌 Live Streaming</div>
            </div>
          </div>

          {/* Who Should Attend */}
          <div className="text-center bg-white/5 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-400">🌍 Who Should Attend?</h2>
            <ul className="mt-4 text-lg text-gray-300 space-y-2">
              <li>👩‍🔬 AI Researchers & Academics</li>
              <li>👨‍💻 Industry Professionals & Developers</li>
              <li>🚀 Tech Entrepreneurs & Innovators</li>
              <li>🏛️ Policymakers & Government Officials</li>
              <li>🎓 AI Enthusiasts & Students</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

