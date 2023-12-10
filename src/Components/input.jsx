import React from "react";
import { UilSearch, UilLocationPinAlt } from "@iconscout/react-unicons";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = React.useState("");

  const handleUnitChange = (e) => {
    const selected = e.target.name;
    if (units !== selected) setUnits(selected);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Check if the input is not empty before setting the query
      if (city && city.trim() !== "") {
        setQuery({ q: city });
      } else {
        // Optionally, you can display an error message or handle it in a different way
        console.error("Please enter a city name.");
        // Alternatively, you can set an error state and display a message to the user.
        // setError("Input is empty. Please enter a city.");
      }
    }
  };

  const handleSearchClick = () => {
    // Check if the input is not empty before setting the query
    if (city && city.trim() !== "") {
      setQuery({ q: city });
    } else {
      // Optionally, you can display an error message or handle it in a different way
      toast.error("Please enter a city name.");
      // Alternatively, you can set an error state and display a message to the user.
      // setError("Input is empty. Please enter a city.");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Search your location"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize "
        ></input>
  
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPinAlt
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
  
        <div className="flex flex-row w-1/4 items-center justify center">
          <button
            name="metric"
            className="text-xl text-white font-medium hover:scale-125 transition ease-out"
            onClick={handleUnitChange}
          >
            °C
          </button>
          <p className="text-xl text-white mx-1"> | </p>
          <button
            name="imperial"
            className="text-xl text-white font-medium hover:scale-125 transition ease-out"
            onClick={handleUnitChange}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
}


export default Inputs;
