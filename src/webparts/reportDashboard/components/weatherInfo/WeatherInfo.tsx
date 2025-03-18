import * as React from 'react';
// import styles from './ReportDashboard.module.scss';
import { IWeatherInfo } from './IWeatherInfoProps';
import { Card, CardHeader, CardFooter, Text } from "@fluentui/react-components";

const WeatherInfo: React.FC<IWeatherInfo> = (props) => {


  return (
    <Card>
       <CardHeader
        header={<Text weight="semibold">{props.label}</Text>}
      />
      {props.data && props.label.length>0 ?
        <p>
          <img src={props.data.icon} alt={props.data.description} style={{ maxWidth: 100 }} />
          <p>Temperatura: {props.data.temperature}°C</p>
          <p>Percepita: {props.data.feelsLike}°C</p>
          <p>Min: {props.data.minTemperature}°C, Max: {props.data.maxTemperature}°C</p>
          <p>Umidità: {props.data.humidity}%</p>
          <p>Pressione: {props.data.pressure} hPa</p>
          <p>Descrizione: {props.data.description}</p>
          <p>Vento: {props.data.windSpeed} m/s, Direzione: {props.data.windDirection}°</p>
          {props.data.rainVolume && props.data.rainVolume > 0 ? <p>Pioggia nell'ultima ora: {props.data.rainVolume} mm</p> : null}
        </p>
        :
        <p>Dati non presenti o città non corretta</p>
      }

      <CardFooter>
        <small>Fonte: OpenWeatherMap</small>
      </CardFooter>
    </Card>
  );
}

export default WeatherInfo;
