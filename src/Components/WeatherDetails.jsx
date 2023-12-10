import React from "react";
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons";
import { formatToLocalTime, iconURL } from "../service/WeatherData";

function WeatherDetails({weatherData: {details, icon, temp, temp_min, temp_max, humidity, speed, sunrise, sunset, feels_like, timezone}}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-white">
        <p className="">{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconURL(icon)} alt="weather icon" className="w-20 h-20" />
        <p className="text-4xl font-extralight">{`${temp.toFixed()}`}°</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light items-center justify-center">
            <UilTemperature className="w-6 h-6 mr-1" />
            <p className="text-sm">Feels Like:
            <span> {feels_like.toFixed()}°</span>
            </p>
          </div>
          <div className="flex font-light items-center justify-center">
            <UilTear className="w-6 h-6 mr-1" />
            <p className="text-sm">Humidity:
            <span> {humidity}%</span>
            </p>
          </div>
          <div className="flex font-light items-center justify-center">
            <UilWind className="w-6 h-6 mr-1" />
            <p className="text-sm">Wind Speed:
            <span> {speed.toFixed()} km/H</span>
            </p>
          </div>
        </div>
      </div>
        <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                <UilSun />
                <p className="text-sm">Sunrise:
                    <span className="font-medium"> {formatToLocalTime(sunrise,timezone,"hh:mm a")}</span>
                </p>
                <p className="font-light"> | </p> 
            
            
                <UilSunset className="w-6 h-6 mr-1" />
                <p className="text-sm">Sunset:
                    <span className="font-medium"> {formatToLocalTime(sunset,timezone,"hh:mm a")}</span>
                </p>
                <p className="font-light"> | </p> 
            
                <UilArrowUp className="w-6 h-6 mr-1" />
                <p className="text-sm">High:
                    <span className="font-medium"> {temp_max.toFixed()}°</span>
                </p>
                
            
        
                <UilArrowDown className="w-6 h-6 mr-1" />
                <p className="text-sm">Low:
                    <span className="font-medium"> {temp_min.toFixed()}°</span>
                </p>
                </div>
                </div>
        
    
  )
}

export default WeatherDetails;
