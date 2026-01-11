const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Added 'unit' parameter (defaulting to 'metric') to support navbar toggle
export const getWeatherData = async (params, unit = 'metric') => {
  const query = typeof params === 'string' ? `q=${params}` : `lat=${params.lat}&lon=${params.lon}`;
  const response = await fetch(`${BASE_URL}/weather?${query}&units=${unit}&appid=${API_KEY}`);
  if (!response.ok) throw new Error("City not found");
  return await response.json();
};

export const getForecastData = async (params, unit = 'metric') => {
  const query = typeof params === 'string' ? `q=${params}` : `lat=${params.lat}&lon=${params.lon}`;
  const response = await fetch(`${BASE_URL}/forecast?${query}&units=${unit}&appid=${API_KEY}`);
  if (!response.ok) throw new Error("Forecast not found");
  const data = await response.json();
  return data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
};

// NEW: Required for the "Air Quality" menu option
export const getAirData = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  if (!response.ok) return null;
  return await response.json();
};