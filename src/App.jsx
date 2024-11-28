import { useEffect, useState } from 'react';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TempAndDetails from './components/TempAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import WeatherMap from './components/WeatherMap';
import getFormattedWeatherData from './services/weatherService';

const App = () => {
  const [query, setQuery] = useState({});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [activeSection, setActiveSection] = useState('Current'); // Default active section

  // Fetch location on initial load
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setQuery({ lat: latitude, lon: longitude });
          },
          (error) => {
            console.error('Error fetching location:', error.message);
            setQuery({ q: 'Singapore' });
          }
        );
      } else {
        setQuery({ q: 'Singapore' });
      }
    };

    fetchLocation();
  }, []);

  // Fetch weather data when query or units change
  useEffect(() => {
    const getWeather = async () => {
      if (!query.q && !query.lat) return;

      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    getWeather();

    const intervalId = setInterval(getWeather, 10 * 60 * 1000); // Fetch every 10 minutes

    return () => clearInterval(intervalId);
  }, [query, units]);

  // Intersection Observer for Scrollspy
  useEffect(() => {
    const sections = document.querySelectorAll('[id^="item-"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Update active section
          }
        });
      },
      {
        threshold: 0.6 // Trigger when 60% of the section is visible
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className='grid min-h-screen bg-blue-100'>
      <div className='grid grid-cols-5'>
        {/* Sidebar Navigation */}
        <aside className='col-span-1 px-4 py-6 bg-white shadow-md'>
          <h2 className='text-xl font-medium mb-4'>Weather Forecast</h2>
          <ul className='sticky top-0 space-y-2'>
            {['Current', 'Details', 'Hourly', '5-Days'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={`block py-1 text-sm font-medium transition-colors ${
                    activeSection === item
                      ? 'text-blue-600 font-bold' // Highlight active link
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className='col-span-4 px-6 py-8 space-y-6'>
          {/* Input Section */}
          <section id='Current'>
            <Inputs setQuery={setQuery} setUnits={setUnits} />
          </section>

          {/* Weather Details */}
          {weather && (
            <>
              <section className='flex gap-7'>
                <TimeAndLocation weather={weather} />
                <WeatherMap weather={weather} />
              </section>

              <section id='Details'>
                <TempAndDetails weather={weather} units={units} />
              </section>

              <section id='Hourly'>
                <Forecast title='3 Hour Forecast' data={weather.hourly} />
              </section>

              <section id='5-Days'>
                <Forecast title='5 Day Forecast' data={weather.daily} />
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;

