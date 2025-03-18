import * as React from 'react';
import { useState } from 'react';
// import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react/lib/DetailsList';
// import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
// import { mergeStyles } from '@fluentui/react/lib/Styling';
import { IListItems } from '../../../../models/IListItems';
import { IGridList } from './IGridListProps';
import DialogDetails from '../dialogDetails/DialogDetails';
// import { Button, CardFooter } from "@fluentui/react-components";
// import * as strings from 'ReportDashboardWebPartStrings';

const moment = require('moment');


const GridList: React.FC<IGridList> = (props) => {

    //gestione ordinamento colonna
    const _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const newColumns: IColumn[] = columnsGrid.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
                //passo al metodo del componente padre la colonna da riordinare
                props.onSortColumn(column.key!, currColumn.isSortedDescending);
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });

        setColumns(newColumns);
    };

    //definizione colonne griglia commesse
    const columns: IColumn[] = [
        { key: 'Titolo', isResizable: true, name: 'Titolo', fieldName: 'Titolo', minWidth: 80, maxWidth: 120, isMultiline: true },

        { key: 'Valore', isResizable: true, name: 'Valore', fieldName: 'Valore', minWidth: 50, maxWidth: 60, isMultiline: true },
        { key: 'Categoria', isResizable: true, name: 'Categoria', fieldName: 'Categoria', minWidth: 80, maxWidth: 120, isMultiline: true },
        {
            key: 'Date', name: 'Data',
            fieldName: 'Data',
            isSorted: true,
            isSortedDescending: props.isSortedDescending,
            onColumnClick: _onColumnClick,
            isResizable: true,
            minWidth: 80,
            maxWidth: 150,
            isMultiline: true,
            onRender: (item: IListItems) => (
                moment(item.Data).format('DD/MM/YYYY')
            )
        }
    ];

    //hook per gestire colonne
    const [columnsGrid, setColumns] = useState<IColumn[]>(columns);

    //gestione dialog per update
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IListItems | null>(null);
    //gestione apertura update
    const _onItemInvoked = React.useCallback(
        (item: IListItems) => {
            setSelectedItem(item);
            setIsDialogOpen(true);
        },
        []
    );
    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };


    return (
        <div>
            <DetailsList
                items={props.itemList}
                columns={columnsGrid}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
                onItemInvoked={_onItemInvoked}
            />
            {selectedItem && (
                <DialogDetails open={isDialogOpen} onOpenChange={closeDialog} onCloseDialog={closeDialog} item={selectedItem} context={props.context} />
            )}
        </div>
    );
};


export default GridList;
