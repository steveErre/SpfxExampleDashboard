
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  SPHttpClient,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import { IListItem } from "../models/IListItem";


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

    //recupera risposte faq, trigger all'apertura dell'accordion
  public async ShpGetListItem(
    listName: string,
    context: WebPartContext,
  ): Promise<Array<IListItem>|null> {
    const url =
      context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items?$select=Id,Title,Valore,Categoria/Title,Data&$expand=Categoria`;
    return await this.fetchLists(url, context)
      .then((response: any) => {
        let items: Array<IListItem> = new Array<IListItem>();
        response.value.map((item: any) => {
          items.push({
            Id: item.Id,
            Titolo: item.Title,
            Categoria:item.Category.Title,
            Valore: item.Value,
            Data: item.Date,
          });
        });
        return items;
      })
      .catch((err: any) => {
        alert(
          "Error to get the answer. Send mail to web@project.it with this error:  " +
          err
        );
        return null;
      });
  }

}