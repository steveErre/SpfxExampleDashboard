export interface WeatherData {
    temperature: number;
    feelsLike: number;
    minTemperature: number;
    maxTemperature: number;
    humidity: number;
    pressure: number;
    description: string;
    windSpeed: number;
    windDirection: number;
    rainVolume?: number;
    icon: string;
}