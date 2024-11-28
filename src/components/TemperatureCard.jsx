import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const TemperatureCard = ({ weather }) => {
  const [data, setData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [peakTemp, setPeakTemp] = useState({ temp: null, time: null });

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!weather || !weather.daily) return;

    // Extract temperature and time data
    // eslint-disable-next-line react/prop-types
    const forecastData = weather.daily.map((day) => ({
      temp: parseFloat(day.temp.toFixed(0)), // Round the temperature
      time: day.title // Display the day (e.g., Mon, Tue)
    }));

    setData(forecastData);
    // eslint-disable-next-line react/prop-types
    setCurrentTemp(weather.temp?.toFixed(0)); // Current temperature

    const peak = forecastData.reduce(
      (max, point) => (point.temp > max.temp ? point : max),
      { temp: -Infinity }
    );

    setPeakTemp({ temp: peak.temp, time: peak.time });
  }, [weather]);

  return (
    <div
      className='max-w-md mx-auto bg-white shadow-lg rounded-3xl p-5'
      role='region'
      aria-label='Temperature Card'
    >
      <h2 className='text-xl sm:text-2xl font-semibold mb-4 text-center'>
        Temperature
      </h2>
      <div className='h-52'>
        <LineChart
          xAxis={[
            {
              data: data.map((point) => point.time), // X-axis labels (e.g., Mon, Tue)
              label: 'Days'
            }
          ]}
          series={[
            {
              data: data.map((point) => point.temp), // Y-axis values (temperatures)
              label: 'Temperature (°C)',
              color: '#ef4444' // Red color for line
            }
          ]}
          height={200}
          aria-label='Temperature Line Chart'
        />
      </div>
      <div className='text-center mt-4'>
        {currentTemp !== null ? (
          <>
            <p className='text-4xl sm:text-5xl font-bold'>{`${currentTemp}°`}</p>
            <p className='text-sm sm:text-base text-gray-500 mt-2'>
              Rising with a peak of {`${peakTemp.temp}°`} on {peakTemp.time}.
            </p>
          </>
        ) : (
          <p className='text-gray-500'>No temperature data available.</p>
        )}
      </div>
    </div>
  );
};

export default TemperatureCard;
