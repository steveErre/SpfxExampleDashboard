import * as React from 'react';
import styles from './ReportDashboard.module.scss';
import type { IReportDashboardProps } from './IReportDashboardProps';
import WeatherInfo from './weatherInfo/WeatherInfo';
import { makeStyles } from '@fluentui/react-components';
import { GetMyAPIService } from '../../service/PublicAPI';
import { WeatherData } from '../../models/IWeatherData';
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  containerFilter: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px', // Spazio tra i componenti
  },
  dashboard: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    width: '90%',
    maxWidth: '1200px',
  },
  box: {
    flex: 1,
    minWidth: '300px',
    background: 'white',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }
});

const apiKey = "78788bfd57a90343a09f5e4195034d6d"; // Sostituisci con la tua chiave API di OpenWeatherMap
const weatherService = new GetMyAPIService(apiKey);

const ReportDashboard: React.FC<IReportDashboardProps> = (props) => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const getDataWeather = async () => {
    //recupero i dati meteo per la città di Roma
    await weatherService.getWeather(props.city).then((data) => { setWeatherData(data) });
  };
  useEffect(() => {
    getDataWeather();
  }, [props.city]);

  const stylesCustom = useStyles();
  return (
    <section className={`${styles.reportDashboard} ${props.hasTeamsContext ? styles.teams : ''}`}>
      <div className={stylesCustom.dashboard}>
        <div className={stylesCustom.box}><WeatherInfo label={'Meteo a ' + props.city} data={weatherData} /></div>
        <div className={stylesCustom.box}>{props.selectedList}</div>
        <div className={stylesCustom.box}>{props.siteUrl}</div>
      </div>

    </section>
  );
}

export default ReportDashboard;
