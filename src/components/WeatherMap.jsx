import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// eslint-disable-next-line react/prop-types
const WeatherMap = ({ weather: { name, temp, lat, lon } }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={8}
      className='h-96 w-1/2 rounded-3xl shadow-md'
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
  );
};

export default WeatherMap;
