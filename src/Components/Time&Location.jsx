import React from 'react';
import { formatToLocalTime } from '../service/WeatherData';

function TimeAndLocation({weatherData: {dt, timezone, name, country}}) {
    return  <div>
        <div className='flex items-center justify-center my-6 text-white'>
            <p className='text-white text-xl font-extralight'>{formatToLocalTime(dt,timezone)}</p>
        </div>
        <div className='flex items-center justify-center my-3 text-white'>
            <p className='text-white text-3xl font-medium'>{`${name}, ${country}`}</p>
            </div>
        </div> 
}

export default TimeAndLocation;
