"use client";
import React, { useState } from "react";

const WeatherCard = () => {
  //const api_key = "enter api key ";
  const defaultWeatherIcon = "cloud.png"; // setting default weather icon
  const [weatherIcon, setWeatherIcon] = useState(defaultWeatherIcon);

  const search = async () => {
    const inputElement = document.getElementById("cityInput");
    const cityName = inputElement.value.trim();

    if (!cityName) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
      const response = await fetch(url);

      // check if the response status is not OK (e.g., 404 for not found)
      if (!response.ok) {
        throw new Error("City not found"); // throw custom error if true
      }

      const data = await response.json();

      updateWeatherData(data);
      setWeatherIcon(getWeatherIcon(data.weather[0].icon));

      // clear the input field
      inputElement.value = "";
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // clear input field
      inputElement.value = "";
      // display a message to the user or perform any necessary action
    }
  };

  const updateWeatherData = (data) => {
    document.getElementById("weatherTemp").innerText = `${data.main.temp}°C`;
    document.getElementById("weatherLocation").innerText = data.name;
    document.getElementById(
      "humidityPercent"
    ).innerText = `${data.main.humidity}%`;
    document.getElementById("windSpeed").innerText = `${data.wind.speed} km/h`;
  };

  const getWeatherIcon = (iconCode) => {
    const weatherIcons = {
      "01d": "clear-day.png",
      "01n": "clear-night.png",
      "02d": "cloudy-day.png",
      "02n": "cloudy-night.png",
      "03d": "cloudy-day.png",
      "03n": "cloudy-night.png",
      "04d": "cloudy-day.png",
      "04n": "cloudy-night.png",
      "09d": "rain.png",
      "09n": "rain.png",
      "10d": "rain.png",
      "10n": "rain.png",
      "11d": "thunder.png",
      "11n": "thunder.png",
      "13d": "snow.png",
      "13n": "snow.png",
      "50d": "mist.png",
      "50n": "mist.png",
    };
    return weatherIcons[iconCode] || defaultWeatherIcon;
  };

  return (
    <section className="flex-row items-center justify-center px-8 py-4 rounded-xl bg-blue-950 bg-opacity-95 w-fit">
      <div className="flex items-center bg-yellow-500 rounded-lg p-2 space-x-2 justify-between shadow-xl">
        <input
          id="cityInput"
          type="text"
          className="cityInput py-2 px-2 rounded-lg border-gray-500 w-full"
          placeholder="Enter Location"
        />
        <button
          className="p-2 bg-blue-800 rounded-lg shadow-2xl hover:bg-blue-700 active:bg-blue-900 transition ease-in-out duration-300 text-white"
          onClick={search}
        >
          Search
        </button>
      </div>
      <div className="flex justify-center items-center mt-4">
        <img src={weatherIcon} alt="Weather Icon" className="w-36 h-36" />
      </div>
      <div className="text-center text-white mt-4">
        <h1 id="weatherTemp" className="text-5xl font-semibold">
          °C
        </h1>
      </div>
      <div id="weatherLocation" className="text-center text-white mt-2">
        -
      </div>
      <div className="items-center">
        <div className="flex my-6 items-center justify-between space-x-8">
          <div className="flex items-center">
            <img src="/humidity.png" alt="Humidity" className="w-24 h-24" />
            <div className="text-white ml-2">
              <div
                id="humidityPercent"
                className="humidity-percent text-2xl text-teal-300"
              >
                %
              </div>
              <div>Humidity</div>
            </div>
          </div>
          <div className="flex items-center">
            <img src="/wind.png" alt="Wind Speed" className=" w-24 h-24" />
            <div className="text-white ml-2">
              <div
                id="windSpeed"
                className="wind-speed text-2xl text-purple-300"
              >
                km/h
              </div>
              <div>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
