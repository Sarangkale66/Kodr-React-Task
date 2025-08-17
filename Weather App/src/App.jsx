import { useState, useEffect } from 'react';
import { Search, MapPin, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Sunrise, Sunset, AlertCircle } from 'lucide-react';

const getWeatherCondition = (code) => {
  if ([0, 1].includes(code)) return 'sunny';
  if ([2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'cloudy';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowy';
  if ([95, 96, 99].includes(code)) return 'rainy';
  return 'sunny';
};

const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return descriptions[code] || 'Unknown';
};

const getCoordinates = async (cityName) => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return { lat: result.latitude, lon: result.longitude, name: result.name, country: result.country || result.admin1 || '' };
    }
    return null;
  } catch {
    throw new Error('Failed to find location');
  }
};

const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=7`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch {
    throw new Error('Failed to fetch weather data');
  }
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
};

const getReverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1`);
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return { name: data.results[0].name || 'Current Location', country: data.results[0].country || '' };
      }
    }
    return { name: 'Current Location', country: '' };
  } catch {
    return { name: 'Current Location', country: '' };
  }
};

const getWeatherIcon = (condition, size = 48) => {
  const iconProps = { size, className: 'text-white drop-shadow-lg' };
  switch (condition) {
    case 'sunny':
      return <Sun {...iconProps} className="text-yellow-300 drop-shadow-lg" />;
    case 'cloudy':
      return <Cloud {...iconProps} className="text-gray-200 drop-shadow-lg" />;
    case 'rainy':
      return <CloudRain {...iconProps} className="text-blue-300 drop-shadow-lg" />;
    case 'snowy':
      return <CloudSnow {...iconProps} className="text-blue-100 drop-shadow-lg" />;
    default:
      return <Sun {...iconProps} className="text-yellow-300 drop-shadow-lg" />;
  }
};

const getBackgroundGradient = (condition) => {
  switch (condition) {
    case 'sunny':
      return 'from-amber-400 via-orange-500 to-pink-500';
    case 'cloudy':
      return 'from-gray-400 via-gray-600 to-gray-800';
    case 'rainy':
      return 'from-blue-400 via-blue-600 to-indigo-800';
    case 'snowy':
      return 'from-blue-200 via-blue-400 to-blue-600';
    default:
      return 'from-amber-400 via-orange-500 to-pink-500';
  }
};

const SearchBar = ({ onSearch, onCurrentLocation, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    setFetching(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}&count=5&language=en&format=json`);
      const data = await res.json();
      if (data.results) {
        setSuggestions(
          data.results.map((city) => ({
            name: `${city.name}${city.admin1 ? `, ${city.admin1}` : ''}`,
            country: city.country,
          }))
        );
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error fetching city suggestions:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSearch = (cityName) => {
    if (cityName.trim()) {
      onSearch(cityName);
      setQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => setShowSuggestions(true);
  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  return (
    <div className="relative mb-8">
      <div className="flex items-center bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
        <Search className="text-white/80 mr-3" size={20} />
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && !loading && handleSearch(query)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={loading}
          className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg disabled:opacity-50"
        />
        <button
          onClick={onCurrentLocation}
          disabled={loading}
          className="ml-3 p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Use Current Location"
        >
          <MapPin className="text-white" size={20} />
        </button>
      </div>

      {showSuggestions && (suggestions.length > 0 || fetching) && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden z-10">
          {fetching ? (
            <p className="px-4 py-3 text-gray-600">Searching...</p>
          ) : (
            suggestions.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleSearch(city.name)}
                className="w-full text-left px-4 py-3 hover:bg-white/20 transition-colors text-gray-800"
              >
                <Search size={16} className="inline mr-2 text-gray-600" />
                {city.name}, {city.country}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const WeatherDisplay = ({ weather }) => {
  if (!weather) {
    return (
      <div className="text-center text-white/80 bg-white/10 backdrop-blur-md rounded-2xl p-8">
        <AlertCircle size={48} className="mx-auto mb-4 text-white/60" />
        <p className="text-xl">Unable to load weather data</p>
        <p className="text-white/60 mt-2">Please try searching for a different city</p>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{weather.location}</h1>
            {weather.country && <p className="text-white/70 text-lg">{weather.country}</p>}
          </div>
          <div className="text-right">
            <div className="text-6xl font-light text-white mb-2">{Math.round(weather.temperature)}°C</div>
            <p className="text-white/80 text-lg">{weather.description}</p>
          </div>
        </div>
        <div className="flex justify-center mb-6">{getWeatherIcon(weather.condition, 120)}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <Droplets className="text-blue-300 mx-auto mb-2" size={24} />
            <p className="text-white/70 text-sm">Humidity</p>
            <p className="text-white font-semibold text-lg">{weather.humidity}%</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <Wind className="text-gray-300 mx-auto mb-2" size={24} />
            <p className="text-white/70 text-sm">Wind Speed</p>
            <p className="text-white font-semibold text-lg">{Math.round(weather.windSpeed)} km/h</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <Sunrise className="text-yellow-300 mx-auto mb-2" size={24} />
            <p className="text-white/70 text-sm">Sunrise</p>
            <p className="text-white font-semibold text-lg">{weather.sunrise}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <Sunset className="text-orange-300 mx-auto mb-2" size={24} />
            <p className="text-white/70 text-sm">Sunset</p>
            <p className="text-white font-semibold text-lg">{weather.sunset}</p>
          </div>
        </div>
      </div>

      {weather.hourly && weather.hourly.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">24-Hour Forecast</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {weather.hourly.slice(0, 24).map((hour, index) => (
              <div key={index} className="flex-shrink-0 bg-white/10 rounded-2xl p-4 text-center min-w-[100px]">
                <p className="text-white/70 text-sm mb-2">{hour.time}</p>
                <div className="flex justify-center mb-2">{getWeatherIcon(hour.condition, 32)}</div>
                <p className="text-white font-semibold">{Math.round(hour.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {weather.weekly && weather.weekly.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h2>
          <div className="space-y-3">
            {weather.weekly.map((day, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  {getWeatherIcon(day.condition, 32)}
                  <span className="text-white font-medium w-24">{day.day}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white/70 w-12 text-right">{Math.round(day.low)}°</span>
                  <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-white font-semibold w-12">{Math.round(day.high)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processWeatherData = (data, locationInfo) => {
    if (!data || !data.current) throw new Error('Invalid weather data structure');
    const condition = getWeatherCondition(data.current.weather_code);
    const hourly = [];
    if (data.hourly && data.hourly.time) {
      for (let i = 0; i < Math.min(24, data.hourly.time.length); i++) {
        const hourTime = new Date(data.hourly.time[i]);
        hourly.push({
          time: hourTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          temp: data.hourly.temperature_2m[i] || 0,
          condition: getWeatherCondition(data.hourly.weather_code[i] || 0)
        });
      }
    }
    const weekly = [];
    if (data.daily && data.daily.time) {
      data.daily.time.forEach((date, index) => {
        if (index < 7) {
          const dayName = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
          weekly.push({
            day: dayName,
            high: data.daily.temperature_2m_max[index] || 0,
            low: data.daily.temperature_2m_min[index] || 0,
            condition: getWeatherCondition(data.daily.weather_code[index] || 0)
          });
        }
      });
    }
    return {
      location: locationInfo.name,
      country: locationInfo.country,
      temperature: data.current.temperature_2m || 0,
      condition,
      description: getWeatherDescription(data.current.weather_code || 0),
      humidity: data.current.relative_humidity_2m || 0,
      windSpeed: data.current.wind_speed_10m || 0,
      sunrise: data.daily.sunrise?.[0]
        ? new Date(data.daily.sunrise[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        : '06:00',
      sunset: data.daily.sunset?.[0]
        ? new Date(data.daily.sunset[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        : '18:00',
      hourly,
      weekly
    };
  };

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const coordinates = await getCoordinates(cityName);
      if (!coordinates) throw new Error(`City "${cityName}" not found. Please check spelling and try again.`);
      const weatherData = await getWeatherData(coordinates.lat, coordinates.lon);
      if (!weatherData) throw new Error('Unable to fetch weather data. Please try again.');
      const processedWeather = processWeatherData(weatherData, { name: coordinates.name, country: coordinates.country });
      setCurrentWeather(processedWeather);
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather data.');
      setCurrentWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await getCurrentLocation();
      const locationInfo = await getReverseGeocode(position.lat, position.lon);
      const weatherData = await getWeatherData(position.lat, position.lon);
      if (!weatherData) throw new Error('Unable to fetch weather data for your location.');
      const processedWeather = processWeatherData(weatherData, locationInfo);
      setCurrentWeather(processedWeather);
      setError(null);
    } catch (err) {
      let errorMessage = 'Unable to get your current location.';
      if (err.message?.includes('not supported')) errorMessage = 'Geolocation is not supported by your browser.';
      else if (err.message?.includes('denied') || err.code === 1) errorMessage = 'Location access denied. Please allow location access or search for a city.';
      setError(errorMessage);
      setCurrentWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('London');
  }, []);

  const backgroundGradient = currentWeather ? getBackgroundGradient(currentWeather.condition) : 'from-amber-400 via-orange-500 to-pink-500';

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${backgroundGradient} p-4 transition-all duration-1000`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Weather<span className="text-yellow-300">App</span></h1>
          <p className="text-white/80 text-xl">Real-time weather data from around the world</p>
        </div>

        <SearchBar onSearch={handleSearch} onCurrentLocation={handleCurrentLocation} loading={loading} />

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mb-4"></div>
            <p className="text-white text-xl">Loading weather data...</p>
            <p className="text-white/70 text-sm mt-2">Fetching real-time information</p>
          </div>
        ) : error ? (
          <div className="text-center text-white bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-300/30">
            <AlertCircle size={48} className="mx-auto mb-4 text-red-300" />
            <p className="text-xl mb-4">{error}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => handleSearch('London')} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition-all">Try London</button>
              <button onClick={() => handleSearch('New York')} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition-all">Try New York</button>
              <button onClick={() => handleSearch('Tokyo')} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition-all">Try Tokyo</button>
            </div>
          </div>
        ) : (
          <WeatherDisplay weather={currentWeather} />
        )}

        <footer className="text-center mt-12 text-white/60">
          <p>© 2025 WeatherApp • Powered by Open-Meteo API • Real-time weather data</p>
        </footer>
      </div>
    </div>
  );
};

export default App;