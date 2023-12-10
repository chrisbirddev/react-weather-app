import React from 'react';

const TopButtons = ({setQuery}) => {

    const cities = [{
        id:1,
        title: "London"
    },
    {
        id:2,
        title: "Manchester"
    },
    {
        id:3,
        title: 'Rio de Janeiro'
    },
    {
        id:4,
        title: "Dubai"
    }
]


    return  <div className='flex items-center justify-around my-6'>
        {cities.map((city) => (

        <button key={city.id}className='text-white text-lg font-medum' onClick={() => setQuery({ q: city.title})}>{city.title}</button>

        ))}
        </div>
}
 
export default TopButtons;