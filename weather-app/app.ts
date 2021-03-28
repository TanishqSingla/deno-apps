import { key } from "./secrets.ts";

interface weatherData {
  main: {
    temp: number;
  };
  weather: {
    0: {
      id: string;
      description: string;
    };
  };
}

const location: string = Deno.args[0];
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

const weatherReq = async (): Promise<weatherData> => {
  const response = await fetch(url);
  return response.json();
};

const data: weatherData = await weatherReq();

const temperature = data.main.temp;
const description = data.weather[0].description;

const tempInCels = (temperature - 273).toFixed(2);

console.log(`The temperature in ${location} is ${tempInCels}C`);
console.log(`It is ${description} today in ${location}`);
