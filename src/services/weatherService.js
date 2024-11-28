import { DateTime } from 'luxon';

const API_KEY = 'ef77254a6364ac41f1672e342189ed05';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const res = await fetch(url);
  return await res.json();
};

export const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy'\nLocal time: 'hh:mm a"
) => {
  const timezoneOffsetInHours = offset / 3600; // Offset in hours

  // Construct the `UTC+HH:MM` format required by Luxon
  const offsetHours = Math.floor(timezoneOffsetInHours);
  const offsetMinutes = Math.abs((timezoneOffsetInHours - offsetHours) * 60);
  const formattedOffset = `UTC${
    offsetHours >= 0 ? '+' : ''
  }${offsetHours}:${offsetMinutes.toString().padStart(2, '0')}`;

  return DateTime.fromSeconds(secs).setZone(formattedOffset).toFormat(format);
};

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone
  } = data;

  const { main: details, icon } = weather[0]; // Extract icon code directly
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    speed,
    details,
    icon, // Set the icon code directly
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon
  };
};

const formatForecastWeather = (secs, offset, data) => {
  //hourly
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt
    }))
    .slice(0, 5);

  //daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === '00:00:00')
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, 'ccc'),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData('forecast', {
    lat,
    lon,
    units: searchParams.units
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
