import { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
// Professional icons for a modern UI
import { 
  MapPin, Navigation, RefreshCw, Menu, Droplets, 
  Sunrise, Sunset, Sun, Wind, Trash2, X, Globe, Settings, 
  ShieldCheck 
} from 'lucide-react';

// Import local images
import dayImg from './assets/img/day.jpg';
import morningImg from './assets/img/Morning.jpg';
import nightImg from './assets/img/Night.jpg';
import sunsetSunriseImg from './assets/img/Sunset_&_Sunrise.jpg';

function App() {
  const { weather, forecast, aqi, loading, error, fetchWeather, isApiOnline } = useWeather();
  
  // UI States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unit, setUnit] = useState('metric'); // 'metric' = °C | 'imperial' = °F
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh");

  // Hierarchical Discovery Data
  const discoveryData = {
    "Bangladesh": [
      { name: "Dhaka", icon: "🏛️" }, { name: "Sylhet", icon: "🏙️" }, 
      { name: "Chittagong", icon: "⚓" }, { name: "Rajshahi", icon: "🥭" }
    ],
    "United Kingdom": [
      { name: "London", icon: "🎡" }, { name: "Manchester", icon: "🐝" }, { name: "Birmingham", icon: "🏭" }
    ],
    "Japan": [
      { name: "Tokyo", icon: "🗼" }, { name: "Osaka", icon: "🐙" }, { name: "Kyoto", icon: "⛩️" }
    ],
    "USA": [
      { name: "New York", icon: "🗽" }, { name: "Los Angeles", icon: "🎬" }, { name: "Chicago", icon: "🏢" }
    ],
    "France": [
      { name: "Paris", icon: "🗼" }, { name: "Lyon", icon: "🦁" }, { name: "Nice", icon: "🏖️" }
    ]
  };

  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('weatherHistory')) || []);

  useEffect(() => { 
    fetchWeather("Dhaka", unit); 
  }, []);

  useEffect(() => { 
    if (weather?.name) fetchWeather(weather.name, unit); 
  }, [unit]);

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }, unit),
        () => alert("Location access denied.")
      );
    }
  };

  const handleSearch = (city) => {
    fetchWeather(city, unit);
    setHistory(prev => [city, ...prev.filter(item => item.toLowerCase() !== city.toLowerCase())].slice(0, 5));
  };

  useEffect(() => { localStorage.setItem('weatherHistory', JSON.stringify(history)); }, [history]);

  const formatTime = (ts) => ts ? new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";
  
  // Dynamic helper for Air Quality description
  const getAQIDesc = (val) => ["Good", "Fair", "Moderate", "Poor", "Very Poor"][val - 1] || "N/A";

  // UPDATED: Dynamic Background based on Local Time of the city
  const getDynamicBackground = () => {
    if (!weather) return dayImg;

    // Calculate local time using the city's timezone offset (in seconds)
    const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime + (weather.timezone * 1000));
    const hour = localTime.getHours();

    // Time-based logic for image selection
    if (hour >= 5 && hour < 8) return morningImg;        // 5 AM - 8 AM
    if (hour >= 8 && hour < 17) return dayImg;           // 8 AM - 5 PM
    if (hour >= 17 && hour < 19) return sunsetSunriseImg; // 5 PM - 7 PM
    return nightImg;                                     // 7 PM - 5 AM
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] p-3 md:p-10 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* SIDEBAR DRAWER */}
      <div className={`fixed inset-y-0 right-0 z-50 w-72 md:w-85 bg-white/95 backdrop-blur-2xl shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-slate-100 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2"><Settings className="text-blue-600 w-5 h-5" /><h2 className="text-xl font-black text-[#0F172A]">Options</h2></div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
          </div>
          <div className="flex-1 space-y-8 overflow-y-auto pr-2 scrollbar-hide">
            <section>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Measurement Units</p>
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                <button onClick={() => setUnit('metric')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${unit === 'metric' ? 'bg-white shadow-md text-blue-700' : 'text-slate-400'}`}>Celsius</button>
                <button onClick={() => setUnit('imperial')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${unit === 'imperial' ? 'bg-white shadow-md text-blue-700' : 'text-slate-400'}`}>Fahrenheit</button>
              </div>
            </section>
            <section>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Countries</p>
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(discoveryData).map(country => (
                  <button key={country} onClick={() => { setSelectedCountry(country); setIsMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedCountry === country ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600'}`}><Globe size={16} />{country}</button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-12 relative z-10">
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
           <div className="p-2.5 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200"><Sun className="text-white w-6 h-6" /></div>
           <div><h1 className="text-2xl md:text-3xl font-black text-blue-700 tracking-tighter italic leading-none">WeatherSphere</h1><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Global Forecasting</p></div>
        </div>
        <div className="flex gap-2.5 items-center w-full md:w-auto">
          <div className="flex-1"><SearchBar onSearch={handleSearch} /></div>
          <button onClick={handleLocationClick} className="p-3.5 md:p-4 bg-white border border-slate-200 shadow-sm rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><Navigation className="w-5 h-5" /></button>
          <button onClick={() => setIsMenuOpen(true)} className="p-3.5 md:p-4 bg-white border border-slate-200 shadow-sm rounded-2xl hover:bg-slate-50 transition"><Menu className="w-5 h-5" /></button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        <section className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {Object.keys(discoveryData).map((country) => (
              <button key={country} onClick={() => setSelectedCountry(country)} className={`whitespace-nowrap px-4 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCountry === country ? 'bg-[#0F172A] text-white' : 'bg-white text-slate-400'}`}>{country}</button>
            ))}
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {discoveryData[selectedCountry].map((city) => (
              <button key={city.name} onClick={() => handleSearch(city.name)} className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-100 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-sm"><span>{city.icon}</span>{city.name}</button>
            ))}
          </div>
        </section>

        {weather && !loading && (
          <div className="animate-in fade-in zoom-in-95 duration-1000 space-y-12">
            <section className="relative w-full h-75 md:h-112.5 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl group">
              <img src={getDynamicBackground()} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000" alt="Landscape" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent flex items-end p-6 md:p-16">
                <div className="text-white flex flex-col md:flex-row items-start md:items-end gap-12 w-full">
                  <span className="text-7xl md:text-[14rem] font-thin leading-[0.8]">{Math.round(weather?.main?.temp ?? 0)}°</span>
                  <div className="mb-2">
                    <h2 className="text-3xl md:text-7xl font-black uppercase italic leading-none">{weather?.name ?? "Unknown City"}</h2>
                    <div className="flex items-center gap-2 mt-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-xl border border-white/20 w-fit">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <p className="text-sm font-bold uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-10">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-sm grid grid-cols-2 gap-y-16 border border-white">
                  <Metric icon={<Droplets className="text-blue-500" />} label="Humidity" value={`${weather?.main?.humidity ?? 0}%`} />
                  <Metric icon={<Sunset className="text-orange-400" />} label="Sunset" value={formatTime(weather?.sys?.sunset)} />
                  <Metric icon={<ShieldCheck className="text-emerald-500" />} label="Air Quality" value={aqi ? `${getAQIDesc(aqi)} (${aqi}/5)` : "Syncing..."} />
                  <Metric icon={<Sunrise className="text-blue-400" />} label="Sunrise" value={formatTime(weather?.sys?.sunrise)} />
                </div>
                <div className="bg-[#0F172A] p-6 md:p-12 rounded-4xl md:rounded-[3.5rem] text-white shadow-xl flex justify-between items-center group relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1 text-blue-400"><Wind className="w-4 h-4" /><h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 text-white">Wind</h3></div>
                    <p className="text-3xl md:text-5xl font-black">{weather?.wind?.speed} <span className="text-xs md:text-xl font-normal opacity-50">{unit === 'metric' ? 'm/s' : 'mph'}</span></p>
                  </div>
                  <div className="text-right relative z-10"><p className="text-[9px] font-black uppercase opacity-40 mb-1">Feels Like</p><p className="text-2xl md:text-4xl font-bold text-blue-400">{Math.round(weather?.main?.feels_like ?? 0)}°</p></div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-12 rounded-[3.5rem] shadow-sm border border-white flex flex-col">
                <div className="flex justify-between items-center mb-6 md:mb-12">
                   <h3 className="text-lg md:text-2xl font-black tracking-tight">Weekly Outlook</h3>
                   <button onClick={() => fetchWeather(weather?.name || "Dhaka", unit)} className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl transition-all group">
                     <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                   </button>
                </div>
                <div className="h-32 md:h-52 w-full bg-linear-to-b from-blue-50/40 to-transparent rounded-3xl md:rounded-[2.5rem] mb-6 md:mb-12 relative overflow-hidden border border-blue-100/40">
                   <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,80 C80,20 160,70 240,40 C320,10 400,60 400,60" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" className="opacity-80" />
                  </svg>
                </div>
                <Forecast data={forecast} />
              </div>
            </div>
          </div>
        )}

        {loading && <div className="text-center py-20 text-blue-600 font-bold animate-pulse tracking-widest uppercase">Syncing Weather...</div>}
        
        <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 flex items-center gap-2 md:gap-3 px-4 py-2 md:px-7 md:py-3.5 bg-[#0F172A] shadow-2xl rounded-full border border-white/10 z-50">
          <span className={`w-2 md:w-3 h-2 md:h-3 rounded-full ${isApiOnline ? 'bg-green-400' : 'bg-red-500 animate-pulse'}`}></span>
          <span className="text-[8px] md:text-[11px] font-black uppercase tracking-widest text-white/80">{isApiOnline ? 'Active Sync' : 'Offline'}</span>
        </div>
      </main>
    </div>
  );
}

const Metric = ({ icon, label, value }) => (
  <div className="flex items-center gap-6 group">
    <div className="p-5 bg-slate-50 rounded-[1.75rem] transition-all">{icon}</div>
    <div><p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1.5">{label}</p><p className="text-2xl font-black text-[#0F172A]">{value}</p></div>
  </div>
);

export default App;