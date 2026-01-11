import { useState } from 'react';
import { Search } from 'lucide-react'; //

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-5xl mx-auto group animate-in fade-in slide-in-from-top-4 duration-700"
    >
      <div className="relative flex items-center transition-all duration-500 transform group-focus-within:scale-[1.01]">
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city or country..."
          /* Adjusted right padding (pr-20) for the smaller mini button */
          className="w-full pl-12 pr-20 py-7 bg-white border border-slate-100/50 rounded-full text-slate-600 text-xl font-medium placeholder-slate-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] outline-none focus:ring-8 focus:ring-blue-500/5 transition-all"
        />

        {/* NEW: Mini Icon-Only Button */}
        <button 
          type="submit"
          className="absolute right-3 p-4 bg-[#2563EB] text-white rounded-full hover:bg-blue-700 active:scale-90 transition-all shadow-lg shadow-blue-200 flex items-center justify-center"
          title="Search"
        >
          <Search size={24} strokeWidth={3} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;