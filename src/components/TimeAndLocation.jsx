/* eslint-disable react/prop-types */
import { iconUrlFromCode } from '../services/weatherService';

const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country, details, icon, temp }
}) => {
  return (
    <div className='grid bg-white rounded-3xl shadow-md w-1/2'>
      <div className='flex items-center justify-center text-xl'>
        <img src={iconUrlFromCode(icon)} alt='weather icon' className='h-40' />
        <div className='flex flex-col float-start'>
          <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
          <p>{details}</p>
        </div>
      </div>
      <div className='flex items-center flex-col gap-5'>
        <p className='text-3xl font-medium'>{`${name}, ${country}`}</p>
        <div className='text-xl font-extralight'>
          {formattedLocalTime.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeAndLocation;
