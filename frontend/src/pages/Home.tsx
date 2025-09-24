import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f5f2] via-[#f3ede7] to-[#f7f5f2] font-serif">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-extrabold text-[#3c2f1e] mb-4">
              Your AI Travel Companion <br />
              <span className="bg-gradient-to-r from-[#bfa77a] to-[#7c6f5a] bg-clip-text text-transparent">Payani Maga</span>
            </h1>
            <p className="text-lg text-[#7c6f5a] mb-8 font-serif">
              Stop spending hours planning trips. Answer a few questions and let our AI create personalized itineraries with budget management, weather insights, and safety tips.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/questionnaire" className="bg-[#e7d7c9] text-[#3c2f1e] px-8 py-3 rounded-lg font-semibold shadow hover:shadow-lg font-serif border border-[#d6cfc7] transition-all duration-200">
                Start Planning <span className="ml-2">🚀</span>
              </Link>
              <Link to="/register" className="border border-[#d6cfc7] text-[#7c6f5a] px-8 py-3 rounded-lg font-semibold hover:bg-[#f3ede7] font-serif transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              Why Choose Payani Maga?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-serif">
              Experience the future of travel planning with AI-powered personalization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 font-serif">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Planning</h3>
              <p className="text-gray-600">
                Our intelligent agent creates personalized day-wise itineraries based on your preferences, 
                budget, and travel style.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 font-serif">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Budget Management</h3>
              <p className="text-gray-600">
                Live currency conversion and intelligent budget allocation across accommodation, 
                food, travel, and activities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 font-serif">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🌤️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weather & Safety Insights</h3>
              <p className="text-gray-600">
                Real-time weather forecasts and safety tips to ensure your trip is both 
                enjoyable and secure.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 font-serif">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Chat Support</h3>
              <p className="text-gray-600">
                Adjust your itinerary on the go with our AI chat. Add temples, reduce budget, 
                or get rain alternatives instantly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 font-serif">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Experiences</h3>
              <p className="text-gray-600">
                Whether you're into adventure, temples, nightlife, or family trips - 
                we tailor everything to your style.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 font-serif">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Export & Save</h3>
              <p className="text-gray-600">
                Download your itinerary as PDF or save to your profile. Access your 
                travel plans anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-serif">
              Get your perfect itinerary in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center font-serif">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account to save and manage your travel plans</p>
            </div>

            {/* Step 2 */}
            <div className="text-center font-serif">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Answer Questions</h3>
              <p className="text-gray-600">Tell us about your destination, budget, and travel preferences</p>
            </div>

            {/* Step 3 */}
            <div className="text-center font-serif">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Magic</h3>
              <p className="text-gray-600">Our AI creates your personalized day-wise itinerary</p>
            </div>

            {/* Step 4 */}
            <div className="text-center font-serif">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Travel & Enjoy</h3>
              <p className="text-gray-600">Download your plan and embark on your perfect adventure</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#bfa77a] to-[#7c6f5a]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
            Ready to Plan Your Next Adventure?
          </h2>
          <p className="text-xl text-[#f7f5f2] mb-8 font-serif">
            Join thousands of travelers who trust Payani Maga for their perfect trips
          </p>
          <Link 
            to="/questionnaire"
            className="bg-white text-[#7c6f5a] px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-block font-serif"
          >
            Start Planning Now 🌟
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;