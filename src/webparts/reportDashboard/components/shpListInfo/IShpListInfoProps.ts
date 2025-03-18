import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IShpListInfo{
   listName:string;
   label:string;
   context:WebPartContext;
}