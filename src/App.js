import UilReact from '@iconscout/react-unicons/icons/uil-react'
import './App.css';
import TopButtons from './Components/topbuttons';
import Inputs from './Components/input';
import TimeAndLocation from './Components/Time&Location';
import WeatherDetails from './Components/WeatherDetails';
import HourlyForecast from './Components/HourlyForecast';
import getFormattedData from './service/WeatherData';
import { useState } from 'react';
import { useEffect } from 'react';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q: 'Rio De janeiro'})
  const [units, setUnits] = useState('metric')
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location"

      toast.success("Showing Forecast for " + message)

      await getFormattedData({...query, units}).then(data => {
        setWeatherData(data)
      })
  
    } 

    fetchWeather();
  }, [query, units])


  const fetchWeather = async () => {
    const data = await getFormattedData({q: 'Rio De janeiro'})
    console.log(data)
  } 

  fetchWeather()


  const formatBackground = () => {
    if (!weatherData) return 'bg-gradient-to-br from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 68
    if (weatherData.temp >= threshold) {
      return 'bg-gradient-to-br from-red-600 to-red-700'
    }
  }
    
    
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery= {setQuery} units={units} setUnits={setUnits}  />

      {weatherData && (
        <>
      <TimeAndLocation weatherData={weatherData}/>
      <WeatherDetails weatherData={weatherData}/>
      <HourlyForecast title="Hourly Forecast" items={weatherData.hourly}/>
      <HourlyForecast title="Daily Forecast" items={weatherData.daily}/>
      </>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop/>

      
    </div>
    
  );
}

export default App;
