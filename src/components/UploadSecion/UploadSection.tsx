// src/components/UploadSection/UploadSection.tsx
"use client"
import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const UploadSection = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.includes('csv')) {
      processCSV(file);
    } else if (file.type.includes('sheet')) {
      processXLSX(file);
    } else {
      setUploadStatus('Unsupported file type.');
    }
  };

  const processCSV = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        setUploadedData(results.data as any[]);
        setUploadStatus('CSV Upload successful!');
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const processXLSX = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setUploadedData(json as any[]);
      setUploadStatus('XLSX Upload successful!');
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
      {uploadStatus && <p>{uploadStatus}</p>}
      {/* Display or map uploaded data as needed */}
      {uploadedData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(uploadedData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uploadedData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value:any, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadSection;
