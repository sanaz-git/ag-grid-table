
// import './App.css';
import { AgGridReact } from 'ag-grid-react';
import { useState ,useEffect, useMemo, useCallback, useRef} from 'react';

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

import './App.scss';


const ImageCellRenderer = p => {
  return (
    <img src={p.value} alt={'pic'} style={{width:"30px",borderRadius:"50%",paddingTop:"5px"}}/>
  ) 
  
}

function App() {
  const containerStyle = useMemo(() => ({ width: '70vw', height: '100vh' }), []);
  const gridStyle = useMemo(() => ({ height: 600, width: '100%' }), []);

  const gridRef =useRef();

  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
  
    { field: 'image',  pinned: 'left', filter: false,  cellRenderer: ImageCellRenderer},
    { field: 'name', },
    { field: 'symbol',cellRenderer: p => <>{p.value.toUpperCase()}</> },
    {  headerName: "CurrentPrice",field: 'current_price' , filter: 'agNumberColumnFilter', cellRenderer: p => <>{p.value.toLocaleString()}</>},
    {  headerName: "MarketCap", field: 'market_cap',filter: 'agNumberColumnFilter', cellRenderer: p => <>{p.value.toLocaleString()}</> },
  ]);
  const defaultColDef = useMemo(() => {
   
    return {
      sortable: true,
      resizable: true,
      filter: true,
      editable: true,
      flex: 1,
      minWidth:158,
      floatingFilter:true,
      filterParams:{
        buttons:['apply','clear','reset']
      }
    
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

  //deselect
  // const pushMeClicked = useCallback (e => {
  //   gridRef.current.api.deselectAll();
  // });

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById('page-size').value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);


  return (
    <div  style={containerStyle}>
      <h1 className="title">AG GRID TABLE</h1>
      <div className="example-wrapper">
        <div className="example-header">
            <span>Page Size:  </span>
            <select onChange={onPageSizeChanged} id="page-size">
              <option value="10" >
                10
              </option>
              <option value="5">5</option>
              <option value="15">15</option>
            </select>
            {/* <button onClick={pushMeClicked} style={{marginLeft:"10px"}}>Push Me</button> */}
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
