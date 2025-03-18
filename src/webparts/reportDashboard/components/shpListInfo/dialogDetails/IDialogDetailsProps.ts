import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListItems } from "../../../../models/IListItems";

export interface IDialogDetails {
    open:boolean;
    onOpenChange:()=>void;
    onCloseDialog:()=>void;
    item:IListItems;
    context:WebPartContext;
}