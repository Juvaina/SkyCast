/* eslint-disable react/prop-types */
import { iconUrlFromCode } from '../services/weatherService';

const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country, details, icon, temp }
}) => {
  return (
    <div
      className='grid bg-white rounded-3xl shadow-md p-6 max-w-md mx-auto sm:max-w-lg'
      role='region'
      aria-label='Time and Location'
    >
      {/* Temperature and Weather Icon */}
      <div className='flex items-center justify-between gap-4'>
        <img
          src={icon ? iconUrlFromCode(icon) : ''}
          alt='Current weather icon'
          className='h-28 w-28 object-contain'
        />
        <div className='flex flex-col items-start'>
          <p className='text-5xl font-bold'>
            {temp ? `${temp.toFixed()}°` : '--°'}
          </p>
          <p className='text-lg text-gray-500'>{details || 'N/A'}</p>
        </div>
      </div>

      {/* Location and Time */}
      <div className='mt-6 text-center'>
        <p className='text-2xl sm:text-3xl font-semibold'>{`${
          name || 'Unknown'
        }, ${country || ''}`}</p>
        <div className='text-lg sm:text-xl font-light text-gray-500 mt-2'>
          {formattedLocalTime
            ? formattedLocalTime.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))
            : 'Time not available'}
        </div>
      </div>
    </div>
  );
};

export default TimeAndLocation;
