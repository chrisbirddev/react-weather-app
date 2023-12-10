import React from "react";
import { iconURL } from "../service/WeatherData";

function HourlyForecast({title, items}) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white text-xl font-medium">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row justify-between">
        {items.map((item) => (
            <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-sm text-white ">{item.title}</p>
            <img
              src={iconURL(item.icon)}
              alt="weather icon"
              className="w-20 h-20"
            />
            <p className="font-medium text-sm text-white" >{`${item.temp}`}°</p>
          </div>
          ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
