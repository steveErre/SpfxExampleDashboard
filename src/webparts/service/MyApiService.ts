
import { ITicketFinance } from "../models/ITicketFinance";

export class MyAPIService {
    public getTicket = async (
     symbol: string,
  ): Promise<ITicketFinance> => {
    const url = `https://reportexampleapi.azurewebsites.net/api/stocks/${symbol}`;
    let respData:ITicketFinance;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati finance");
      }
      const data = await response.json();

      respData = {
        Symbol:data.symbol,
        Price: data.currentPrice,
        Percentage:data.percentageChange
      };
      return respData;
    } catch (error) {
      throw new Error(`Errore: ${error.message}`);
    }
  }
}