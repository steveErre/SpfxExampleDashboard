
import { WeatherData } from "../models/IWeatherData";

export class GetMyAPIService {
  
  private apiKey: string;
  private baseUrl: string = "https://api.openweathermap.org/data/2.5/weather";
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getWeather = async (
     city: string,
  ): Promise<WeatherData> => {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=it`;
    let respData:WeatherData;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati meteo");
      }
      const data = await response.json();

      respData = {
        temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          minTemperature: data.main.temp_min,
          maxTemperature: data.main.temp_max,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          description: data.weather[0].description,
          windSpeed: data.wind.speed,
          windDirection: data.wind.deg,
          rainVolume: data.rain?.["1h"] || 0,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      };
      return respData;
    } catch (error) {
      throw new Error(`Errore: ${error.message}`);
    }
  }
}