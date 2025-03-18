import { WebPartContext } from "@microsoft/sp-webpart-base";
import { WeatherData } from "../../models/IWeatherData";

export interface IReportDashboardProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  weatherData: WeatherData;
  selectedList: string;
  siteUrl: string;
  city: string;
  context:WebPartContext;
  symbol:string;
}
