import React, {useState} from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {

    let urlWather = 'https://api.openweathermap.org/data/2.5/weather?appid=3587b4580f6b10b3d524b05647a0bccc&lang=es';
    let cityUrl = "&q=";

    let urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?appid=3587b4580f6b10b3d524b05647a0bccc&lang=es';
   
   const [weather, setWeather] = useState([]);
   const [forecast, setForecast] = useState([]);
   const [loading, setLoading] = useState(false);
   const [show, setShow] = useState(false);
   const [location, setLocation] = useState("");

   const getLocation = async(Loc) => {
    setLoading(true);
    setLocation(Loc);

    // weather 

    urlWather = urlWather + cityUrl + Loc;

    await fetch(urlWather).then((response) => {
        if (!response.ok) throw (response)
        return response.json();
    }) .then((weatherData) => {
        console.log(weatherData);
        setWeather(weatherData);
    }) .catch(error => {
        console.log(error);
        setLoading(false);
        setShow(false);
    });
      
    /// Forecast 

    urlForecast = urlForecast + cityUrl + Loc;

    await fetch(urlForecast).then((response) => {
        if (!response.ok) throw (response)
        return response.json();
    }) .then((forecastData) => {
        console.log(forecastData);
        setForecast(forecastData);
      
        setLoading(false);
        setShow(true);

    }) .catch(error => {
        console.log(error);
        setLoading(false);
        setShow(false);
    });

   }

   return(
     <React.Fragment>
       
       <Form 
            newLocation={getLocation}
        />


         <Card 
             showData = {show}
             loadingData = {loading}
             weather = {weather}
             forecast = {forecast}
             />
     </React.Fragment>
   );
}

export default WeatherPanel;