import { useState } from 'react';
// Updated to include getAirData for the Air Quality feature
import { getWeatherData, getForecastData, getAirData } from '../api/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); 
  const [aqi, setAqi] = useState(null); // NEW: Air Quality Index state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApiOnline, setIsApiOnline] = useState(null); // NEW: API Status indicator

  /**
   * Fetches data for current weather, forecast, and air quality.
   * Now accepts a 'unit' parameter ('metric' or 'imperial') for the navbar toggle.
   */
  const fetchWeather = async (params, unit = 'metric') => {
    if (!params) return;

    setLoading(true);
    setError(null);
    
    try {
      // 1. Fetch current weather and forecast in parallel
      const [currentData, forecastData] = await Promise.all([
        getWeatherData(params, unit),
        getForecastData(params, unit)
      ]);

      // 2. Fetch Air Quality Index using coordinates from the current weather result
      const airQuality = await getAirData(currentData.coord.lat, currentData.coord.lon);

      setWeather(currentData);
      setForecast(forecastData);
      setAqi(airQuality?.list[0]?.main?.aqi || null);
      setIsApiOnline(true); // Set status to online on success
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
      setIsApiOnline(false); // Set status to offline on error
    } finally {
      setLoading(false);
    }
  };

  // Return the new states so App.jsx can use them
  return { weather, forecast, aqi, loading, error, fetchWeather, isApiOnline };
};