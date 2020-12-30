import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { DataImporter } from './DataImporter';
import ScalingGraph from './ScalingGraph';
import Button from '@material-ui/core/Button';
// import ExampleFile from '../public/Example_File.csv';

const styles = {
  container: {
    paddingTop: 150
  },
  button: {
    marginTop: 10,
    marginRight: 30
  }
};
const ExampleFile =  require("./Example_File.csv")


// function to access the key-value pairs from local storage
// data is the key object, values are taken from imported csv
function getBrowserData() {
  // 'data' is the key of the data (object variables) from local storage
  const dataString = localStorage.getItem('data') 
  if (!dataString) return []; // if no data stored locally, return no data 
  return JSON.parse(dataString) // converts JSON string into an object
}

// function App() {
//   // from Hooks API

//   // returns a stateful value, and a function to update it
//   // state = data 
//   // initialState is pulled from getBrowserData function,
//   // always reinitializes by pulling data from local storage
//   const [data, setData] = useState(getBrowserData()); 

  

function App() {
  const [data, setData] = useState(getBrowserData());

  function handleDataUpload(data: any) {
    //we are updating the state to whatever the data is in local storage
    //accepts the new state value (data from local storage) and re-renders the component (data?)
    setData(data) 
    // sets the values of the data pulled from local storage to the keys identified in the "getBrowserData" function
    // stringify converts JS values to JSON format
    localStorage.setItem('data', JSON.stringify(data))
  }
  function clearData() {
    setData([]) // set state back to zero (empty) - re-initialzes
    //removes the key-value pair from local storage so you can start all over with new data if need be
    localStorage.removeItem('data') 
  }

  console.log(data)
  return (  
    <div> 

    
    <Container maxWidth='lg' style={styles.container}>
      <DataImporter onDataUpload={handleDataUpload} /> 
      <Button size='small' variant='contained' style={styles.button} href={ExampleFile} download='example-file.csv'> Download Example</Button>
      <Button size='small' variant='contained' style={styles.button} onClick={clearData}> Clear Data</Button>
      {data.map((d: any, index: any) => <ScalingGraph key={index} data={d} />)}
    </Container>
    </div>  
  );
}


export default App; //exports App function