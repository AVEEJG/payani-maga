from fastapi import Request, FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json

# Create FastAPI app FIRST
app = FastAPI()

# Chat endpoint for AI chat using Ollama3
@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    ollama_url = "http://localhost:11434/api/generate"
    ollama_payload = {
        "model": "llama3",
        "prompt": user_message
    }
    try:
        ollama_res = requests.post(ollama_url, json=ollama_payload, timeout=60)
        response_text = ""
        for line in ollama_res.iter_lines():
            if line:
                try:
                    obj = json.loads(line.decode('utf-8'))
                    response_text += obj.get('response', '')
                except Exception:
                    continue
        if not response_text:
            response_text = 'No response'
    except Exception as e:
        response_text = f"Ollama error: {str(e)}"
    return {"response": response_text}

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request
class ItineraryRequest(BaseModel):
    destination: str
    landingAirport: str
    returnAirport: str
    budget: str
    currency: str
    duration: str
    travelStyle: list[str]
    travelMonth: str
    groupSize: str
    accommodation: str

@app.post("/generate-itinerary")
def generate_itinerary(data: ItineraryRequest):
    # --- Currency Conversion (ExchangeRate.host, free, no key needed) ---
    try:
        currency_api = f"https://api.exchangerate.host/latest?base={data.currency}&symbols=USD"
        currency_res = requests.get(currency_api).json()
        target_currency = "USD"
        rate = currency_res['rates'].get(target_currency, 1)
        converted_budget = float(data.budget) * rate
    except Exception:
        converted_budget = data.budget
        target_currency = data.currency

    # --- Weather (OpenWeatherMap, using provided API key) ---
    weather_api_key = "cc7ad1854c8acec5f51a0f0341b77455"
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={data.destination}&appid={weather_api_key}"
    weather = requests.get(weather_url).json()
    weather_desc = weather.get('weather', [{}])[0].get('description', 'No data')

    # --- Ollama (local model, example) ---
    ollama_url = "http://localhost:11434/api/generate"
    ollama_payload = {
        "model": "llama3",
        "prompt": f"Generate a {data.duration} day itinerary for {data.destination} for a {data.travelStyle} trip in {data.travelMonth} for {data.groupSize} people. Budget: {data.budget} {data.currency}. Accommodation: {data.accommodation}. Weather: {weather_desc}."
    }
    try:
        ollama_res = requests.post(ollama_url, json=ollama_payload, timeout=60)
        ai_itinerary = ""
        for line in ollama_res.iter_lines():
            if line:
                try:
                    obj = json.loads(line.decode('utf-8'))
                    ai_itinerary += obj.get('response', '')
                except Exception:
                    continue
        if not ai_itinerary:
            ai_itinerary = 'No AI response'
    except Exception as e:
        ai_itinerary = f"Ollama error: {str(e)}"

    # --- Response ---
    # Ensure converted_budget is a float for formatting
    try:
        converted_budget_str = f"{float(converted_budget):.2f} {target_currency}"
    except Exception:
        converted_budget_str = f"{converted_budget} {target_currency}"

    return {
        "itinerary": ai_itinerary,
        "converted_budget": converted_budget_str,
        "weather": weather_desc
    }
