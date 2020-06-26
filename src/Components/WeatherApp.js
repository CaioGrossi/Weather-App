import React, {useState, useEffect} from 'react';
import {FiSearch} from 'react-icons/fi';
import './Weather.css';

function WeatherApp() {

  const APIKey = '8e517afeeb6254683797c2081c7cd9fa';
  const [selectedCity, setSelectedCity] = useState('Belo Horizonte');
  const [cityData, setCityData] = useState({});
  const [iconUrl, setIconUrl] = useState('');

  useEffect(() => {
    async function fetchInitialData () {

      let {weather, main, name} = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${APIKey}`, {mode: "cors"})
                              .then(response => response.json());

      weather = weather[0];

      main = convertTemp(main);

      const data = {...weather, ...main, name};

      setCityData(data);
      setIconUrl(`http://openweathermap.org/img/w/${data.icon}.png`);

    }

    fetchInitialData();
  }, [])

  function handleInputChange (event) {
    setSelectedCity(event.target.value);
  }
  
  async function fetchNewCity () {
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${APIKey}`, {mode: "cors"})

    if (response.ok) {

      let {weather, main, name} = await response.json();

      weather = weather[0];

      main = convertTemp(main);
  
      const data = {...weather, ...main, name};
  
      setCityData(data);
      setIconUrl(`http://openweathermap.org/img/w/${data.icon}.png`)
      
    } else {
      alert("Invalid city!");
    }
  }
  
  function convertTemp (main) {
    
    main.temp = Math.round(main.temp) - 273;
    main.temp_min = Math.round(main.temp_min) - 273;
    main.temp_max = Math.round(main.temp_max) - 273;

    return main;
  }

  return (
    <div>

      <div id="weather">
          <div id="search">
            <input onChange={handleInputChange}/>
            <FiSearch onClick={fetchNewCity}/>
          </div>
          <h2>{cityData.name}</h2>
          <h2>{cityData.main}</h2>
          <h3>{cityData.description}</h3>
          <img src={iconUrl} alt="Weather Icon"></img>
          <h3>Temp: {cityData.temp}  °C</h3>
          <h3>Min: {cityData.temp_min}  °C</h3>
          <h3>Max: {cityData.temp_max}  °C</h3>
      </div>
    </div>
  );
}

export default WeatherApp;
