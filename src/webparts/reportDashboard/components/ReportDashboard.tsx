import * as React from 'react';
import styles from './ReportDashboard.module.scss';
import type { IReportDashboardProps } from './IReportDashboardProps';
import WeatherInfo from './weatherInfo/WeatherInfo';
import { makeStyles } from '@fluentui/react-components';
import { GetMyAPIService } from '../../service/PublicAPI';
import { WeatherData } from '../../models/IWeatherData';
import { useState, useEffect } from "react";
import ShpListInfo from './shpListInfo/ShpListInfo';
import { IUser } from '../../models/IUser';
import { GraphService } from '../../service/GraphService';
import UsersList from './usersInfo/UsersInfo';
import FinanceInfo from './financeInfo/FinanceInfo';
import { ITicketFinance } from '../../models/ITicketFinance';
import { MyAPIService } from '../../service/MyApiService';

const useStyles = makeStyles({

  dashboard: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    // maxWidth: '1200px',
    //alignItems: 'flex-start', 
    alignItems: 'stretch', 
  },
  box: {
    flex: '0 1 auto',
    // minWidth: '250px',
    // minHeight: 'auto', 
    display: 'flex',
    flexDirection: 'column', 
  }
});

//Public API service
const apiKey = "78788bfd57a90343a09f5e4195034d6d"; 
const weatherService = new GetMyAPIService(apiKey);

//Graph service
const graphService = new GraphService();

//My API
const myApiService = new MyAPIService();

const ReportDashboard: React.FC<IReportDashboardProps> = (props) => {

  //weather
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const getDataWeather = async () => {
    //recupero i dati meteo per la città di indicata nel config della webpart
    await weatherService.getWeather(props.city).then((data) => { setWeatherData(data) });
  };
  useEffect(() => {
    getDataWeather();
  }, [props.city]);

  //User graph data
  const [users, setUsers] = useState<IUser[]>([]);
  const getUserInfo = async () => {
    //recupero i dati meteo per la città di indicata nel config della webpart
    await graphService.getUsers(props.context).then((data) => { setUsers(data) });
  };
  useEffect(() => {
    getUserInfo();
  }, []);


  //finance data MY API
   const [ticket, setTicket] = useState<ITicketFinance>({Price:0, Percentage:0,Symbol:""});
   const getFinanceInfo = async () => {
     //recupero i dati meteo per la città di indicata nel config della webpart
     await myApiService.getTicket(props.symbol).then((data) => { setTicket(data) });
   };
   useEffect(() => {
    getFinanceInfo();
   }, [props.symbol]);

  const stylesCustom = useStyles();
  return (
    <section className={`${styles.reportDashboard} ${props.hasTeamsContext ? styles.teams : ''}`}>
      <div className={stylesCustom.dashboard}>
        <div className={stylesCustom.box}>
          <WeatherInfo label={'Meteo a ' + props.city} data={weatherData} />
        </div>
        <div className={stylesCustom.box}>
          <ShpListInfo label={"Elementi da lista " + props.selectedList} listName={props.selectedList} context={props.context}/>
        </div>
        <div className={stylesCustom.box}>
          <UsersList users={users} label="Utenti a sistema" />
        </div>
        <div className={stylesCustom.box}>
          <FinanceInfo Data={ticket} label={'Andamento del titolo ' +props.symbol}/>
        </div>
      </div>

    </section>
  );
}

export default ReportDashboard;
