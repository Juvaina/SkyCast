import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const WeatherMap = ({
  // eslint-disable-next-line react/prop-types
  weather: { name = 'Unknown Location', temp = '--', lat, lon }
}) => {
  // Check for valid latitude and longitude
  const isValidCoordinates = lat !== undefined && lon !== undefined;

  return isValidCoordinates ? (
    <MapContainer
      center={[lat, lon]}
      zoom={8}
      className='h-96 w-full sm:w-1/2 rounded-3xl shadow-md'
      role='region'
      aria-label={`Map showing weather for ${name}`}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={[lat, lon]}>
        <Popup>
          <div className='text-center'>
            <h3 className='font-semibold'>{name}</h3>
            <p>{temp}°C</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  ) : (
    <div className='h-96 w-full sm:w-1/2 flex items-center justify-center bg-gray-100 rounded-3xl shadow-md'>
      <p className='text-gray-500'>Location data is not available.</p>
    </div>
  );
};

export default WeatherMap;
