import * as React from 'react';
// import styles from './ReportDashboard.module.scss';
import { IShpListInfo } from './IShpListInfoProps';
import { Card, CardHeader, CardFooter, CardPreview } from "@fluentui/react-components";

const WeatherInfo: React.FC<IShpListInfo> = (props) => {

  return (
    <Card>
      <CardHeader>
        <h3>{props.label}</h3>
      </CardHeader>
      {props.items ?
        <CardPreview>
          
        </CardPreview>
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
