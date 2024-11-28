/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';

const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') {
      setQuery({ q: city });
      setCity('');
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setQuery({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className='flex flex-col md:flex-row my-6 justify-between'>
      <div className='flex flex-row w-full md:w-2/4 items-center justify-center space-x-4'>
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type='text'
          placeholder='Search by city...'
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-2xl'
        />

        <BiSearch
          size={30}
          className='cursor-pointer transition ease-out hover:scale-125'
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={30}
          className='cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocationClick}
        />
      </div>

      <div className='flex flex-row w-full md:w-1/4 items-center justify-center md:justify-end mt-4 md:mt-0'>
        <button
          className='text-2xl font-medium transition ease-out hover:scale-125'
          onClick={() => setUnits('metric')}
        >
          °C
        </button>
        <p className='text-2xl font-medium mx-1'>|</p>
        <button
          className='text-2xl font-medium transition ease-out hover:scale-125'
          onClick={() => setUnits('imperial')}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
