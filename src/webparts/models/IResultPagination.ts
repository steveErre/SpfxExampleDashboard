import { IListItems } from "./IListItems";

export interface IResultPagination{
    Items:IListItems[];
    setNextPageUrl:String;
    setPrevPages:string;
}