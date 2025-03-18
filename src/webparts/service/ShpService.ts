
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from "@microsoft/sp-http";
import { IListItems } from "../models/IListItems";
import { ICategoria } from "../models/ICategoria";


export class ShpService {
  //recupera elementi di una lista in base ai parametri nel'url
  private async fetchLists(url: string, context: WebPartContext): Promise<any> {
    return await context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(
            "WARNING - failed to hit URL " +
            url +
            ". Error = " +
            response.statusText
          );
          return null;
        }
      })
      .catch((err: any) => {
        alert(err);
        return [];
      });
  }

  //recupera elemti lista shp
  public async ShpGetListItem(
    listName: string,
    context: WebPartContext,
    search?: string,
    orderBy?: string,
    ascending?: boolean
  ): Promise<Array<IListItems> | null> {
    // Costruzione dei filtri di ricerca
    const filterSearch = search && search.length > 0 ? `&$filter=substringof('${search.replace("'", "''")}',Title)` : '';
    // Definizione dell'ordinamento
    const sorting = `&$orderby=${orderBy} ${ascending ? "asc" : "desc"}`;
    const url =
      context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items?$select=Id,Title,Value,Category/Title,Date&$expand=Category${filterSearch}${sorting}`;
    return await this.fetchLists(url, context)
      .then((response: any) => {
        let items: Array<IListItems> = new Array<IListItems>();
        response.value.map((item: any) => {
          items.push({
            Id: item.Id,
            Titolo: item.Title,
            Categoria: item.Category.Title,
            Valore: item.Value,
            Data: item.Date,
          });
        });
        return items;
      })
      .catch((err: any) => {
        alert(
          "Errore nel recuperare gli elementi " +
          err
        );
        return [];
      });
  }

  //recupera category
  public async ShpGetCategory(
    listName: string,
    context: WebPartContext,
  ): Promise<ICategoria[]> {
    let select = `&$select=Id,Title`;
    const url =
      context.pageContext.web.absoluteUrl +
      `/_api/web/lists/GetByTitle('${listName}')/items?${select}&$orderby=Title`;
    return await this.fetchLists(url, context)
      .then((response: any) => {
        let items: Array<ICategoria> = new Array<ICategoria>();
        response.value.map((item: any) => {
          items.push({
            id: item.Id,
            title: item.Title
          });
        });
        return items;
      })
      .catch((err: any) => {
        alert("Error retrieve element. Detail error: " + err);
        return [];
      });
  }

  //Metodo per aggiornare un elemento della lista
  public async ShpUpdateFastLinkItem(
    updatedItem: IListItems,
    context: WebPartContext
  ): Promise<boolean | void> {


    try {
      const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('ReportData')/items(${updatedItem.Id})`;

      // Prepara le opzioni per la richiesta
      const options: ISPHttpClientOptions = {
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "OData-Version": "", // Importante per il corretto funzionamento
          "If-Match": "*",
          "X-HTTP-Method": "MERGE",
        },
        body: JSON.stringify({
          __metadata: { type: "SP.Data.ReportDataListItem" },
          Title: updatedItem.Titolo,
          Value: updatedItem.Valore,
          Date: updatedItem.Data,
          CategoryId: updatedItem.IdCategoria == 0 ? null : updatedItem.IdCategoria,
        }),
      };

      return await context.spHttpClient
        .post(url, SPHttpClient.configurations.v1, options)
        .then((response) => {
          if (response.ok) {
            alert(`L'elemento ${updatedItem.Titolo} è stato modificato correttamente`);
            return true;
          } else {
            response.json().then((responseJSON) => {
              alert(responseJSON.error.message.value);
              return false;
            });
          }
        });
    } catch (err: any) {
      console.error(`Errore creazione elemento (SaveItem) - ${err.message}`);
      return false;
    }

  }
}