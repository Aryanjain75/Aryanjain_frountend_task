"use client"
// context/DataContext.tsx
import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';

interface DataContextType {
  columns: {
    headers: string[];
    preview: Record<string, string>;
    rows: Record<string, string>[];
  };
  mappings: Record<string, string>;
  recordCount: number | null;
  setColumns: React.Dispatch<React.SetStateAction<{ headers: string[]; preview: Record<string, string>; rows: Record<string, string>[] }>>;
  setMappings: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setRecordCount: React.Dispatch<React.SetStateAction<number | null>>;
  handleFileParsed: (parsedData: any[]) => void;
  handleMappingChange: (field: string, column: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  step: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<{ headers: string[]; preview: Record<string, string>; rows: Record<string, string>[] }>({ headers: [], preview: {}, rows: [] });
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [recordCount, setRecordCount] = useState<number | null>(null);
  const [step, setStep] = useState(1);

  const handleFileParsed = useCallback((parsedData: any[]) => {
    if (parsedData.length === 0) return;

    const headers = Object.keys(parsedData[0]);
    const preview = headers.reduce((acc, header) => {
      acc[header] = parsedData[0][header];
      return acc;
    }, {} as Record<string, string>);

    const rows = parsedData.map((row: any) => headers.reduce((acc, header) => {
      acc[header] = row[header];
      return acc;
    }, {} as Record<string, string>));
    
    setColumns({ headers, preview, rows });
    setRecordCount(parsedData.length - 1);
    setStep(2);
  }, []);

  const handleMappingChange = (field: string, column: string) => {
    setMappings((prevMappings) => ({
      ...prevMappings,
      [field]: column,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <DataContext.Provider
      value={{ columns, mappings, recordCount, setColumns, setMappings, setRecordCount, handleFileParsed, handleMappingChange, nextStep, prevStep, step }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
