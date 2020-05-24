import React from "react";
import CSVReader from "react-csv-reader";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_")
};

export function DataImporter({ onDataUpload }: any) {
    return (
    <div className="container">
            <CSVReader
            cssClass="react-csv-input"
            label="Select CSV "
            onFileLoaded={onDataUpload}
            parserOptions={papaparseOptions}
            />
            
            </div>)
    
}
