import { FC } from "react";
import { Datagrid, List, TextField } from "react-admin";

export const RecordList: FC = () => (
  <List>
    <Datagrid rowClick={"edit"}>
      <TextField source="id" />
      <TextField source="category" />
      <TextField source="subCategory" />
    </Datagrid>
  </List>
);
