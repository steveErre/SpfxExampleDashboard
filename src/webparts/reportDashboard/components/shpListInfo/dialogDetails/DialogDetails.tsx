import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import { IDialogDetails } from "./IDialogDetailsProps";
import InputText from "../../fields/inputText/InputText";
import { useState, useEffect } from "react";
import DropDownFilter from "../../fields/dropDown/DropDownFilter";
import { ShpService } from "../../../../service/ShpService";
import { ICategoria } from "../../../../models/ICategoria";
import { IListItems } from "../../../../models/IListItems";

const getservice = new ShpService();
// const moment = require('moment')


const DialogDetails: React.FC<IDialogDetails> = (props) => {

  const [titolo, setTitolo] = useState(props.item.Titolo);
  const [valore, setValore] = useState(props.item.Valore);
  const [data, setData] = useState(props.item.Data);

  const [listaCategorie, setListaCategorie] = useState<ICategoria[]>([]);
  const [categoria, setCategoria] = useState([props.item.Categoria]);

  // Carica le categorie (solo per `List`)
  useEffect(() => {
    getservice
      .ShpGetCategory("ServiceCategorie", props.context)
      .then((response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          setListaCategorie(response);
        } else {
          setListaCategorie([]);
        }
      })
      .catch(() => setListaCategorie([]));

  }, []);

  //metodo per passare al componente il valore selezionato
  const _onFilterChanged = (text: string): void => {
    //gestione con filter querystring rest api
    setTitolo(text);
  };
  const _onValoreChanged = (text: number): void => {
    //gestione con filter querystring rest api
    setValore(text);
  };

  const _onCategoriaChanged = (text: string): void => {
    //gestione con filter querystring rest api
    setCategoria([text]);
  };

  const _onDataChanged = (text: string): void => {
    //gestione con filter querystring rest api
    setData(text);
  };

  const _updateItem = async () => {
    let updateItem: IListItems;
    // Se si tratta della lista standard, gestiamo anche la categoria
    let categoriaId = 0;
    if (Array.isArray(categoria) && categoria.length > 0) {
      for (let i = 0; i < listaCategorie.length; i++) {
        if (listaCategorie[i].title === categoria[0]) {
          categoriaId = listaCategorie[i].id;
          break;
        }
      }
    }
    updateItem = {
      Titolo: titolo,
      Valore: valore,
      Data: data,
      Categoria: categoria[0],
      IdCategoria: categoriaId,
      Id: props.item.Id
    }
    await getservice.ShpUpdateFastLinkItem(updateItem, props.context)
      .then(() => {
        props.onCloseDialog()
      }
      )
  }


  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dettagli {props.item.Titolo}</DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputText filterList={_onFilterChanged} label="Titolo" value={titolo} type="text" />
            <InputText filterList={_onValoreChanged} label="Valore" value={valore.toString()} type="number" />
            <InputText filterList={_onDataChanged} label="Data" value={data} type="text" />
            <DropDownFilter options={listaCategorie} selectedOptions={categoria} onNewSelect={_onCategoriaChanged} label="Filter by priority" />
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={_updateItem}>Aggiorna</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={props.onCloseDialog}>Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DialogDetails;