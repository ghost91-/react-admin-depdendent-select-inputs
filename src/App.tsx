import { Admin,  Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { RecordEdit } from "./RecordEdit";
import { RecordList } from "./RecordList";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="records" list={RecordList} edit={RecordEdit} />
  </Admin>
);

export default App;
