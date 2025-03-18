import {
  Dropdown,
  makeStyles,
  Option,
  shorthands,
  useId,
  DropdownProps,
} from "@fluentui/react-components";
import * as React from "react";

import { IDropDown } from "./IDropDownProps";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    minWidth:"250px",
    ...shorthands.gap("4px"),

  },
});


const DropDownFilter: React.FC<IDropDown> = (props) => {
  const dropdownId = useId("dropdown");
  const styles = useStyles();
  const comboId = useId("combo-controlled");
  // const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
  //   ,
  // ]);
  // const [value, setValue] = React.useState("");

  const onOptionSelect: DropdownProps["onOptionSelect"] = (event:any, data:any) => {
    // setSelectedOptions(data.selectedOptions);
    // setValue(data.optionText ?? " - ");
    // console.log(selectedOptions + value)
    props.onNewSelect(data.optionText,data.optionValue);
  };

  return (
    <div className={styles.root}>
      {/* <h3>{props.label}</h3> */}
      <label id={`${dropdownId}-outline`}>{props.label}</label>
      <Dropdown
      id={`${comboId}-controlled`}
        disabled={props.disable}
        value={props.selectedOptions[0] && props.selectedOptions[0].length>0 ? props.selectedOptions[0] :  " - "}
        selectedOptions={props.selectedOptions}
        onOptionSelect={onOptionSelect}
        clearable
      >
        {props.options?.map((item) => (
          <Option text={item.title} value={item.id.toString()}>{item.title}</Option>
        ))}
      </Dropdown>
    </div>
  );
};

export default DropDownFilter;
