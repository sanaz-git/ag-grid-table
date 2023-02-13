
// import './App.css';
import { ColumnGroup } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState ,useEffect, useMemo, useCallback, useRef, Component} from 'react';

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

import './App.scss';


const ImageCellRenderer = p => {
  return (
    <img src={p.value} style={{width:"30px",borderRadius:"50%"}}/>
  ) 
  
}

function App() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
  const gridStyle = useMemo(() => ({ height: 600, width: '100%' }), []);

  const gridRef =useRef();

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
  
    { field: 'image',  pinned: 'left', cellRenderer: ImageCellRenderer},
    { field: 'name' },
    { field: 'symbol',cellRenderer: p => <>{p.value.toUpperCase()}</> },
    {  headerName: "currentPrice",field: 'current_price' ,cellRenderer: p => <>{p.value.toLocaleString()}</>},
    {  headerName: "marketCap", field: 'market_cap',cellRenderer: p => <>{p.value.toLocaleString()}</> },
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
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
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
      <h1>AG GRID TABLE</h1>
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
            <button onClick={pushMeClicked} style={{marginLeft:"10px"}}>Push Me</button>
      </div>
        <div style={gridStyle} className="ag-theme-alpine" >
          
             <AgGridReact
              ref={gridRef}
              onCellClicked={cellClickedListener}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              //pagination
              animateRows={true}
              pagination={true}
              paginationPageSize={10}
              //checkbox
              rowSelection={'multiple'}
              suppressRowClickSelection={true}
              //dragrow
              // rowDragManaged={true} //dose not work when use pagination
          
           
      
           
           
            
              />
            </div>
          </div>
    </div>
  );
}

export default App;
