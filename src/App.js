
// import './App.css';
import { AgGridReact } from 'ag-grid-react';
import { useState ,useEffect, useMemo, useCallback, useRef} from 'react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';


import './App.scss';

function App() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: 600, width: '100%' }), []);

  const gridRef =useRef();

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete',   pinned: 'left', },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: true,
      editable: true,
      flex: 1,
      minWidth: 100,
    
    };
  }, []);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);

  const cellClickedListener = useCallback(e => {
  console.log('cellClicked', e)
  })

  const pushMeClicked = useCallback (e => {
    gridRef.current.api.deselectAll();
  });

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById('page-size').value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);


  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
            Page Size:
            <select onChange={onPageSizeChanged} id="page-size">
              <option value="10" >
                10
              </option>
              <option value="5">5</option>
              <option value="15">15</option>
            </select>
      </div>
        <div style={gridStyle} className="ag-theme-alpine" >
           <button onClick={pushMeClicked}>Push Me</button>
             <AgGridReact
              ref={gridRef}
              onCellClicked={cellClickedListener}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection='multiple'
              animateRows={true}
              pagination={true}
              paginationPageSize={10}
              />
            </div>
          </div>
    </div>
  );
}

export default App;
