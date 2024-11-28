/* eslint-disable react/prop-types */
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FaThermometerEmpty } from 'react-icons/fa';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const TempAndDetails = ({
  weather: { temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like },
  units
}) => {
  const weatherdetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: 'Real Feel',
      value: `${feels_like.toFixed()}°`
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: 'Humidity',
      value: `${humidity.toFixed()}%`
    },
    {
      id: 3,
      Icon: FiWind,
      title: 'Wind',
      value: `${speed.toFixed()} ${units === 'metric' ? 'km/h' : 'm/s'}`
    },
    {
      id: 4,
      Icon: GiSunrise,
      title: 'Sunrise',
      value: sunrise
    },
    {
      id: 5,
      Icon: GiSunset,
      title: 'Sunset',
      value: sunset
    },
    {
      id: 6,
      Icon: MdKeyboardArrowUp,
      title: 'High',
      value: `${temp_max.toFixed()}°`
    },
    {
      id: 7,
      Icon: MdKeyboardArrowDown,
      title: 'Low',
      value: `${temp_min.toFixed()}°`
    }
  ];

  return (
    <div>
      <div className='flex items-center py-6 text-3xl font-semibold'>
        <p>Weather Details</p>
      </div>

      <div className='flex flex-row gap-10'>
        {weatherdetails.map(({ id, Icon, title, value }) => (
          <div
            key={id}
            className='flex flex-col items-center justify-center bg-white rounded-xl p-5 gap-4 col-span-4 shadow-md'
          >
            {`${title}: `}
            <p className='font-light flex gap-3'>
              <Icon />
              <span className='font-medium'>{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;
