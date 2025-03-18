import * as React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@fluentui/react/lib/TextField";
// import { IIconProps } from "@fluentui/react/lib/Icon";
// import { ActionButton } from "office-ui-fabric-react";
import { IInputText } from "./ITextFilterProps";

import {
  makeStyles,
  shorthands,
  useId,
  Input,
} from "@fluentui/react-components";


// const filterIcon: IIconProps = { iconName: "Filter" };
const useStyles = makeStyles({
  root: {
    display: "flex",
    maxWidth:"300px",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
});

const InputText: React.FC<IInputText> = (props) => {
  const styles = useStyles();

  const afterId = useId("content-after");
  const [inputValue, setInputValue] = useState(props.value);

  useEffect(() => {
    props.filterList(inputValue);
  }, [inputValue]);

  const _onSearchForChanged = (event: any) => {
    // Update the component state accordingly to the current user's input
    if (event) {
      setInputValue(event.target.value);
    }
  };

 
  return (
    <div className={styles.root}>
      <Input
        id={afterId}
        onChange={_onSearchForChanged}
        // onKeyDown={_handleEnterKeyPress}
        value={inputValue}
        placeholder="Cerca per titolo"
      />
    </div>
  );
};

export default InputText;
