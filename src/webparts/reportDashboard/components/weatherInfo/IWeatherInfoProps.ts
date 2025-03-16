import { WeatherData } from "../../../models/IWeatherData";

export interface IWeatherInfo{
    data: WeatherData|undefined;
    label: string;
}