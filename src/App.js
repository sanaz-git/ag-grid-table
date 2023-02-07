
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import { useState ,useEffect} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {

  const [rowData,setRowData] = useState([
    {make: 'ford', model:'Focus', price:40000},
    {make: 'Toyota', model:'Celica', price:40000},
    {make: 'BMW', model:'4 Series', price:40000}
  ]);

  const [columnDefs,setColumnDefs]=useState([
    {field:'make'},
      {field:'model'},
      {field:'price'}
  ]);



  return (
    <div className="ag-theme-alpine" style={{height:500}}>
      <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      />
    </div>
  );
}

export default App;
