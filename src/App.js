
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import { useState ,useEffect, useMemo, useCallback, useRef} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function App() {

  const gridRef =useRef();

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

  const defaultColDef = useMemo(()=> ({
    sortable:true,
    filter:true
  }))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);

  const cellClickedListener = useCallback(e => {
  console.log('cellClicked', e)
  })

  const pushMeClicked = useCallback (e => {
    gridRef.current.api.deselectAll();
  });

  return (
    <div className="ag-theme-alpine" style={{height:500}}>
      <button onClick={pushMeClicked}>Push Me</button>
      <AgGridReact
      ref={gridRef}
      onCellClicked={cellClickedListener}
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowSelection='multiple'
      animateRows={true}
      />
    </div>
  );
}

export default App;
