const Forecast = ({ data }) => (
  <div className="flex justify-between items-center gap-4">
    {data.map((item, index) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
      return (
        <div key={index} className="flex flex-col items-center group transition-transform hover:-translate-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-tighter">{date}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
            className="w-10 h-10 mb-2 drop-shadow-sm" 
            alt="icon" 
          />
          <p className="text-lg font-black">{Math.round(item.main.temp)}°</p>
        </div>
      );
    })}
  </div>
);
export default Forecast;