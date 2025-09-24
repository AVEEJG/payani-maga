
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";

interface ItineraryData {
  itinerary?: string;
  destination?: string;
  duration?: string;
  budget?: string;
  currency?: string;
  converted_budget?: string;
  weather?: string;
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('itineraryData');
    if (savedData) {
      setItineraryData(JSON.parse(savedData));
    }
  }, []);

  if (!itineraryData) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">You haven't created any itineraries yet. Let's plan your first trip!</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">✈️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ready for your next adventure?</h2>
            <p className="text-gray-600 mb-6">Our AI will create a personalized itinerary just for you in minutes.</p>
            <Link 
              to="/questionnaire"
              className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 inline-block"
            >
              Plan Your First Trip 🚀
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Parse AI-generated itinerary (string) into lines for display
  const itineraryLines = itineraryData.itinerary
    ? itineraryData.itinerary.split('\n').filter((line: string) => line.trim() !== "")
    : [];

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#f7f5f2] via-[#f3ede7] to-[#f7f5f2] font-serif">
      {/* Header */}
  <div className="bg-[#f7f5f2] shadow-sm border-b rounded-b-2xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#3c2f1e] tracking-tight mb-2">
                Your {itineraryData.destination} Trip
              </h1>
              <p className="text-lg text-[#7c6f5a] font-serif">
                {itineraryData.duration} • {itineraryData.budget} {itineraryData.currency}
              </p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowChat(!showChat)}
                className="bg-[#e7d7c9] text-[#3c2f1e] px-4 py-2 rounded-lg shadow hover:shadow-lg font-serif border border-[#d6cfc7] transition-all duration-200"
              >
                💬 AI Chat
              </button>
              <button className="border border-[#d6cfc7] text-[#7c6f5a] px-4 py-2 rounded-lg hover:bg-[#f3ede7] font-serif transition-colors">
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-[#f3ede7] rounded-2xl shadow-lg mb-6 border border-[#e7d7c9] font-serif">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'itinerary'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    📅 Day-wise Itinerary
                  </button>
                  <button
                    onClick={() => setActiveTab('budget')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'budget'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    💰 Budget Breakdown
                  </button>
                  <button
                    onClick={() => setActiveTab('weather')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'weather'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🌤️ Weather & Tips
                  </button>
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'itinerary' && (
                  <div className="space-y-4 bg-[#f7f5f2] rounded-xl p-6 shadow border border-[#e7d7c9]">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-[#3c2f1e]">AI-Generated Itinerary</h2>
                    {itineraryLines.length > 0 ? (
                      <ul className="list-disc pl-6 space-y-2 text-[#3c2f1e] text-lg font-serif">
                        {itineraryLines.map((line: string, idx: number) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No itinerary details available.</p>
                    )}
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div className="space-y-4 bg-[#f7f5f2] rounded-xl p-6 shadow border border-[#e7d7c9]">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-[#bfa77a]">Budget Breakdown</h2>
                    <p className="text-lg text-[#7c6f5a] font-serif">Converted Budget: <span className="font-semibold text-[#bfa77a]">{itineraryData.converted_budget || "N/A"}</span></p>
                  </div>
                )}

                {activeTab === 'weather' && (
                  <div className="space-y-4 bg-[#f7f5f2] rounded-xl p-6 shadow border border-[#e7d7c9]">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-[#7c6f5a]">Weather & Tips</h2>
                    <p className="text-lg text-[#7c6f5a] font-serif">{itineraryData.weather || "No weather data available."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className="lg:w-96">
              <div className="bg-[#f7f5f2] rounded-2xl shadow-lg p-6 border border-[#e7d7c9] font-serif">
                <ChatPanel />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;