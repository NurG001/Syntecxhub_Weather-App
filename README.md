# 🌤️ WeatherSphere - Global Forecasting

**WeatherSphere** is a professional-grade, high-performance weather dashboard built with **React** and **Tailwind CSS**. It provides a sleek "Bento Box" style interface for real-time weather tracking, 5-day forecasts, and atmospheric insights.

## 🚀 Key Features

| Feature | Description |
| --- | --- |
| **Dynamic Environments** | The dashboard background automatically transitions between Morning, Day, Sunset, and Night based on the **local time** of the searched city. |
| **Hierarchical Discovery** | A two-tier "Country > City" navigation system allows users to explore major global hubs with a single click. |
| **Real-time Sync** | Features a live "Active Sync" pill that monitors API connectivity and updates data in parallel. |
| **Atmospheric Metrics** | Detailed tracking of Humidity, Wind Speed, Sunset/Sunrise times, and Feels Like temperatures. |
| **Dynamic Air Quality** | Integrates the Air Pollution API to provide real-time AQI levels with descriptive health labels. |
| **Bento Grid Design** | A fully responsive, modern layout that adapts seamlessly from 4K monitors to mobile devices. |

---

## 🛠️ Tech Stack

* **Frontend**: React.js (Vite)
* **Styling**: Tailwind CSS (with arbitrary value support and animations)
* **Icons**: Lucide React
* **API**: OpenWeatherMap (Weather, Forecast, and Air Pollution Endpoints)
* **State Management**: Custom React Hooks (`useWeather`)

---

## 📦 Project Structure

```text
src/
├── api/
│   └── weatherApi.js    # API service for OpenWeather endpoints
├── assets/
│   └── img/             # Dynamic background assets (Day, Night, etc.)
├── components/
│   ├── SearchBar.jsx    # Wide-footprint aesthetic search bar
│   └── Forecast.jsx     # 5-day horizontal outlook
├── hooks/
│   └── useWeather.js    # Logic for parallel data fetching & status tracking
└── App.jsx              # Main dashboard orchestration and UI logic

```

---

## ⚙️ Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/weather-sphere.git
cd weather-sphere
npm install

```

### 2. Environment Setup

Create a `.env` file in the root directory and add your OpenWeather API key:

```env
VITE_WEATHER_API_KEY=your_actual_api_key_here

```

*(Note: The `.env` file is ignored by Git to protect your credentials)*

### 3. Run Locally

```bash
npm run dev

```

---

## 🎨 Design Philosophy

WeatherSphere utilizes a **glassmorphism** aesthetic combined with high-contrast typography to ensure data remains the primary focus.

* **Color Palette**: Deep slates (`#0F172A`) for dark elements, vibrant blues (`#2563EB`) for actions, and soft backgrounds (`#F8FAFC`) for clarity.
* **Safety**: The application implements robust guard clauses and optional chaining to ensure a crash-free experience even during slow API responses.

---

## 📄 License

This project is open-source and available under the MIT License.

---

**Developed by Ismail Mahmud Nur** *Full Stack Developer*