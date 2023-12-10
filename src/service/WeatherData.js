import { DateTime } from "luxon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_KEY = "2658056ad5fdddcf664c6258e5b8f5a6";
const API_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(API_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  console.log(url);

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, humidity, temp_min, temp_max },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    humidity,
    temp_min,
    temp_max,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  console.log("Original Daily Data:", daily);
  console.log("Original Hourly Data:", hourly);

  daily = Array.isArray(daily) && daily.length > 0 ? daily.slice(1, 6) : [];
  hourly = Array.isArray(hourly) && hourly.length > 0 ? hourly.slice(1, 6) : [];

  const formattedDaily = daily.map((d) => {
    const weatherInfo = d.weather && Array.isArray(d.weather) && d.weather.length > 0 ? d.weather[0] : null;
    return {
      title: formatToLocalTime(d.dt, timezone, "cccc"),
      temp: d.temp && typeof d.temp.day === 'number' ? d.temp.day.toFixed() : null,
      icon: weatherInfo && weatherInfo.icon ? weatherInfo.icon : "defaultIcon",
    };
  });

  const formattedHourly = hourly.map((d) => {
    const weatherInfo = d.weather && Array.isArray(d.weather) && d.weather.length > 0 ? d.weather[0] : null;
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp && typeof d.temp === 'number' ? d.temp.toFixed() : null,
      icon: weatherInfo && weatherInfo.icon ? weatherInfo.icon : "defaultIcon",
    };
  });

  console.log("Formatted Daily Data:", formattedDaily);
  console.log("Formatted Hourly Data:", formattedHourly);

  return {
    timezone,
    daily: formattedDaily,
    hourly: formattedHourly,
  };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL, yyyy' | Local Time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const getFormattedData = async (searchParams) => {
    try {
      const formattedData = await getWeatherData("weather", searchParams).then(
        formatCurrentWeather
      );
  
      const { lat, lon } = formattedData;
      const formattedForecast = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
      }).then(formatForecastWeather);
  
      return { ...formattedData, ...formattedForecast };
    } catch (error) {
      toast.error(`Failed to get formatted data: ${error.message}`);
      throw error; // Propagate the error to the next catch block if needed
    }
  };

const iconURL = (code) => `http://openweathermap.org/img/w/${code}.png`;

export default getFormattedData;
export { iconURL, formatToLocalTime };
