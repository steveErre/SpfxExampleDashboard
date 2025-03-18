import { ICategoria } from "../../../../models/ICategoria";
export interface IDropDown {
    label?:string;
    options?:Array<ICategoria>;
    selectedOptions:string[];
    disable?:boolean;
    onNewSelect: (value: string|undefined, id:string|undefined) => void;
    // onDeleteSelect?: (value: IFilter) => void;
  }