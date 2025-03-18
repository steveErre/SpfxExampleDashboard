import * as React from "react";
// import { useEffect, useState } from "react";

import { Card, CardFooter, CardHeader, Text } from "@fluentui/react-components";
import { IFiananceTicket } from "./IFinanceInfoProps";


const FinanceInfo: React.FC<IFiananceTicket> = (props) => {

  return (
    <Card>
       <CardHeader
        header={<Text weight="semibold">{props.label}</Text>}
      />
      <p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {props.Data.Price} $
        </p>
        <p style={{
          color: props.Data.Percentage >= 0 ? "green" : "red",
          fontSize: "1.2rem",
          fontWeight: "bold"
        }}>
          {props.Data.Percentage}%
        </p>
      </p>
      <CardFooter>
        <small>Fonte: My API</small>
      </CardFooter>
    </Card>
  );
};

export default FinanceInfo;
