import * as React from "react";
// import { useEffect, useState } from "react";
// import { MSGraphClient } from "@microsoft/sp-http";
import { IUserInfo } from "./IUsersInfo";
import { Card, CardHeader, CardFooter, Text } from "@fluentui/react-components";


const UsersList: React.FC<IUserInfo> = (props) => {

  return (
    <Card>
      <CardHeader
        header={<Text weight="semibold">{props.label}</Text>}
      />
      {props.users.length > 0 ?
        <p>
          {
            <>
              {props.users.map((user) => (
                <p key={user.Name}>
                  {user.Name} ({user.Email})
                </p>
              ))}
            </>
          }
        </p>
        :
        <p>Nessun utente a sistema</p>
      }

      <CardFooter>
        <small>Fonte: Lista EntraID</small>
      </CardFooter>
    </Card >
  );
};

export default UsersList;
