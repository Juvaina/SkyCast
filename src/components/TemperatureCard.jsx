import { LineChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';

const TemperatureCard = ({ weather }) => {
  const [data, setData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [peakTemp, setPeakTemp] = useState({ temp: null, time: null });

  useEffect(() => {
    if (!weather || !weather.daily) return;

    // Extract temperature and time data
    const forecastData = weather.daily.map((day) => ({
      temp: parseFloat(day.temp.toFixed(0)), // Round the temperature
      time: day.title // Display the day (e.g., Mon, Tue)
    }));

    setData(forecastData);
    setCurrentTemp(weather.temp?.toFixed(0)); // Current temperature

    const peak = forecastData.reduce(
      (max, point) => (point.temp > max.temp ? point : max),
      { temp: -Infinity }
    );

    setPeakTemp({ temp: peak.temp, time: peak.time });
  }, [weather]);

  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-3xl p-5'>
      <h2 className='text-xl font-semibold mb-4'>Temperature</h2>
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
        />
      </div>
      <div className='text-center mt-4'>
        <p className='text-5xl font-bold'>{`${currentTemp}°`}</p>
        <p className='text-sm text-gray-500 mt-2'>
          Rising with a peak of {`${peakTemp.temp}°`} at {peakTemp.time}.
        </p>
      </div>
    </div>
  );
};

export default TemperatureCard;
