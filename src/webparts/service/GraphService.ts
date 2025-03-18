
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { IUser } from "../models/IUser";


export class GraphService {
    //recupera elementi di una lista in base ai parametri nel'url

    public getUsers = async (context: WebPartContext) => {
        try {
            const users: IUser[] = [];
            const client = await context.msGraphClientFactory.getClient('3');
            const response = await client.api("/users")
            .filter("startswith(displayName,'user')")
            .get();

            response.value.map((item: any) => {
                users.push({
                    Name: item.displayName,
                    Email: item.mail
                });
            });
            return users;
        } catch (error) {
            throw new Error(`Errore: ${error.message}`);
        }
    };

}