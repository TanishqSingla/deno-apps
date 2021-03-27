import { key } from "./secrets.ts";

const location: string = Deno.args[0];
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

if (location) {
  const data = fetch(url, { method: "GET" });

  data
    .then((res) => {
      return res.json();
    })
    .then((weatherData) => {
      const description = weatherData?.weather[0]?.description;
      const temp: number = weatherData?.main?.temp;

      const tempInCels = (temp - 273).toFixed(2);

      console.log(`The temperature in ${location} is ${tempInCels}C`);
      console.log(`It is ${description} today in ${location}`);
    })
    .catch((e) => {
      console.log("ERROR: request not handled");
    });
} else {
  console.log("LOCATION NOT SPECIFIED");
}
