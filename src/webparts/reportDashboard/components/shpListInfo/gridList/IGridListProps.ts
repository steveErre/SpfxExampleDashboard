import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListItems } from "../../../../models/IListItems";
import { PartialTheme } from "@fluentui/react";

export interface IGridList{
    pageNumber: number,
    pageSize: number,
    sortField: string,
    isSortedDescending: boolean;
    totalItems:number;
    itemList: Array<IListItems>|any;
    context:WebPartContext;
    theme?:PartialTheme;
    onSortColumn: (field: string, isDescending?: boolean) => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
}