import * as React from 'react';
// import styles from './ReportDashboard.module.scss';
import { IShpListInfo } from './IShpListInfoProps';
import { Card, CardHeader, CardFooter, Text } from "@fluentui/react-components";

import { useState, useEffect } from "react";

import GridList from './gridList/GridList';

// import { Result } from '../../../models/result';
import InputText from '../fields/inputText/InputText';
import { ShpService } from '../../../service/ShpService';
import { IListItems } from '../../../models/IListItems';

//Shp service
const shpService = new ShpService();

const ShpListInfo: React.FC<IShpListInfo> = (props) => {

  //gestione paginazione
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  //gestione ordinamento
  const [sortField, setSortField] = useState<string>('Date');
  const [isSortedDescending, setIsSortedDescending] = useState<boolean>(true);
  //gestione campo search
  const [search, setSearch] = useState("");

  //shp data
  const [shpData, setShpData] = useState<IListItems[]>([]);
  const getShpListItems = async () => {
    //recupero i dati dalla lista shp selezionata
    await shpService.ShpGetListItem(props.listName, 
      props.context, 
      search,
      sortField,
      isSortedDescending
      ).then((data: IListItems[]) => {
      setShpData(data);
      setTotalItems(data.length);
    });
  };
  useEffect(() => {
    getShpListItems();
  }, [props.listName, search, sortField, isSortedDescending]);

  // Handle column sorting
  const _onSortColumn = (field: string, isDescending: boolean) => {
    setSortField(field);
    setPageNumber(1);
    setIsSortedDescending(isDescending);
  };

  // Handle pagination (Next page)
  const _onNextPage = () => {
    if ((pageNumber * /*pageSize*/ 10) < totalItems) {
      setPageNumber(prevPage => prevPage + 1);
    }
  };

  // Handle pagination (Previous page)
  const _onPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPage => prevPage - 1);
    }
  };

  //metodo per passare al componente il valore selezionato
  const _onFilterChanged = (text: any): void => {
    //gestione con filter querystring rest api
    setSearch(text);
  };

  return (
    <Card>
      <CardHeader
        header={<Text weight="semibold">{props.label}</Text>}
      />
      <InputText filterList={_onFilterChanged} type='text'/>
      {shpData.length > 0 ?
        <p>
          {
            <GridList
              itemList={/*listItems?.items*/ shpData}
              context={props.context}
              pageNumber={pageNumber}
              pageSize={5}
              totalItems={totalItems}
              sortField={sortField}
              isSortedDescending={isSortedDescending}
              onSortColumn={_onSortColumn}
              onNextPage={_onNextPage}
              onPreviousPage={_onPreviousPage}/>
          }
        </p>
        :
        <p>Dati non presenti o nome lista non corretta</p>
      }

      <CardFooter>
        <small>Fonte: Lista shp {props.label}</small>
      </CardFooter>
    </Card>
  );
}

export default ShpListInfo;
