import { useState } from "react";

interface QuestionnaireData {
  destination: string;
  landingAirport: string;
  returnAirport: string;
  budget: string;
  currency: string;
  duration: string;
  travelStyle: string[];
  travelMonth: string;
  groupSize: string;
  accommodation: string;
}

function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<QuestionnaireData>({
    destination: "",
    landingAirport: "",
    returnAirport: "",
    budget: "",
    currency: "INR",
    duration: "",
    travelStyle: [],
    travelMonth: "",
    groupSize: "",
    accommodation: ""
  });

  const totalSteps = 5;
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to generate itinerary. Please try again.");
      }
      const data = await response.json();
      localStorage.setItem('itineraryData', JSON.stringify({ ...formData, ...data }));
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
      setIsGenerating(false);
    }
  };

  const handleTravelStyleToggle = (style: string) => {
    const updatedStyles = formData.travelStyle.includes(style)
      ? formData.travelStyle.filter(s => s !== style)
      : [...formData.travelStyle, style];
    setFormData({...formData, travelStyle: updatedStyles});
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
            <span className="text-white text-2xl">🤖</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Perfect Itinerary</h2>
          <p className="text-gray-600 mb-6">Our AI is analyzing your preferences and crafting a personalized travel plan...</p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Plan Your Trip</h1>
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{width: `${(currentStep / totalSteps) * 100}%`}}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Travel Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Where are you going? ✈️</h2>
                <p className="text-gray-600">Tell us about your destination and airports</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Country
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Japan, Thailand, France"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landing Airport
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Tokyo Haneda (HND)"
                      value={formData.landingAirport}
                      onChange={(e) => setFormData({...formData, landingAirport: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Airport
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Tokyo Narita (NRT)"
                      value={formData.returnAirport}
                      onChange={(e) => setFormData({...formData, returnAirport: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Duration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Budget & Duration 💰</h2>
                <p className="text-gray-600">Help us plan within your budget and timeframe</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Amount
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50000"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    >
                      <option value="INR">₹ Indian Rupee (INR)</option>
                      <option value="USD">$ US Dollar (USD)</option>
                      <option value="EUR">€ Euro (EUR)</option>
                      <option value="GBP">£ British Pound (GBP)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Duration
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  >
                    <option value="">Select duration</option>
                    <option value="3-4 days">3-4 days</option>
                    <option value="1 week">1 week</option>
                    <option value="10 days">10 days</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="3 weeks">3 weeks</option>
                    <option value="1 month">1 month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Month
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.travelMonth}
                    onChange={(e) => setFormData({...formData, travelMonth: e.target.value})}
                  >
                    <option value="">Select month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Travel Style */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your vibe? 🎯</h2>
                <p className="text-gray-600">Select all travel styles that interest you</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'adventure', label: 'Adventure', emoji: '🏔️' },
                  { id: 'chill', label: 'Chill & Relax', emoji: '🏖️' },
                  { id: 'nightlife', label: 'Nightlife & Pubs', emoji: '🍻' },
                  { id: 'temples', label: 'Temples & Culture', emoji: '🏛️' },
                  { id: 'family', label: 'Family Trip', emoji: '👨‍👩‍👧‍👦' },
                  { id: 'food', label: 'Food & Cuisine', emoji: '🍜' },
                  { id: 'nature', label: 'Nature & Wildlife', emoji: '🦋' },
                  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
                  { id: 'photography', label: 'Photography', emoji: '📸' }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleTravelStyleToggle(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.travelStyle.includes(style.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{style.emoji}</div>
                    <div className="text-sm font-medium">{style.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Group & Accommodation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Group & Stay 👥</h2>
                <p className="text-gray-600">Tell us about your group and accommodation preferences</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.groupSize}
                    onChange={(e) => setFormData({...formData, groupSize: e.target.value})}
                  >
                    <option value="">Select group size</option>
                    <option value="Solo">Solo traveler</option>
                    <option value="Couple">Couple (2 people)</option>
                    <option value="Small group">Small group (3-5 people)</option>
                    <option value="Large group">Large group (6+ people)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accommodation Preference
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'budget', label: 'Budget Hotels/Hostels', desc: 'Save money, basic amenities' },
                      { id: 'mid-range', label: 'Mid-range Hotels', desc: 'Good balance of comfort & cost' },
                      { id: 'luxury', label: 'Luxury Hotels', desc: 'Premium experience & amenities' },
                      { id: 'local', label: 'Local Stays', desc: 'Authentic local experience' }
                    ].map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => setFormData({...formData, accommodation: acc.id})}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          formData.accommodation === acc.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{acc.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{acc.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Preferences 📋</h2>
                <p className="text-gray-600">Everything looks good? Let's create your itinerary!</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Destination</h3>
                    <p className="text-gray-600">{formData.destination}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Duration</h3>
                    <p className="text-gray-600">{formData.duration}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Budget</h3>
                    <p className="text-gray-600">{formData.budget} {formData.currency}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Travel Month</h3>
                    <p className="text-gray-600">{formData.travelMonth}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Group Size</h3>
                    <p className="text-gray-600">{formData.groupSize}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Accommodation</h3>
                    <p className="text-gray-600">{formData.accommodation}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Travel Styles</h3>
                  <p className="text-gray-600">{formData.travelStyle.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {currentStep === totalSteps ? 'Generate Itinerary 🚀' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;