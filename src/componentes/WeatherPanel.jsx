import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState("");

  const apiUrl = 'https://api.openweathermap.org/data/2.5/';
  const apiKey = '3587b4580f6b10b3d524b05647a0bccc';
  const lang = 'es';

  const fetchWeatherData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo obtener datos del clima');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setShow(false);
    }
  };

  const fetchForecastData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo obtener datos del pronóstico');
      }
      const data = await response.json();
      setForecast(data);
      setLoading(false);
      setShow(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setShow(false);
    }
  };

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    const weatherUrl = `${apiUrl}weather?appid=${apiKey}&lang=${lang}&q=${loc}`;
    await fetchWeatherData(weatherUrl);

    const forecastUrl = `${apiUrl}forecast?appid=${apiKey}&lang=${lang}&q=${loc}`;
    await fetchForecastData(forecastUrl);
  };

  return (
    <React.Fragment>
      <Form newLocation={getLocation} />
      <Card showData={show} loadingData={loading} weather={weather} forecast={forecast} />
    </React.Fragment>
  );
};

export default WeatherPanel;