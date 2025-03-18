import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
    HttpClientResponse,
    AadHttpClient,
} from "@microsoft/sp-http";
import { Result } from "../models/result";
import { IFilterItems } from "../models/IFilterItems";

export class AzfService {
    /*
     * recupera elenco dei listItems, con filtro, ordinamento e paginazione
     * @param context 
     * @param filter 
     * @param pageNumber 
     * @param pageSize 
     * @param sortField 
     * @param isSortedDescending 
     * @returns 
     */
    public async getJobsAnonimous(context: WebPartContext, filter?: IFilterItems, pageNumber?: number, pageSize?: number, sortField?: string, isSortedDescending?: boolean): Promise<Result | any> {
        const requestBody = {
            filter: filter || {},
            pageNumber: pageNumber || 1,
            pageSize: pageSize || 10,
            sortField: sortField || 'data',
            isSortedDescending: typeof isSortedDescending !== 'undefined' ? isSortedDescending : true
        }

        return await context.httpClient
            //ambiente prod
            .post('https://mypersonalreporthub.azurewebsites.net/api/getitems', AadHttpClient.configurations.v1,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }
            )
            .then((res: HttpClientResponse): Promise<any> => {
                return res.json();
            })
            .then((json: Result) => {
                return json
            })
            .catch((err: any) => {
                console.log("error: " + err.message);
                return [];
            });
    }

    
}
