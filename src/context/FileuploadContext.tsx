// context/FileUploadContext.tsx
"use client"
import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import Papa from 'papaparse'; // CSV parsing library
import { useDataContext } from './DataContext'; // Import DataContext

interface FileUploadContextType {
  file: File | null;
  isParsed: boolean;
  setFile: (file: File | null) => void;
  setIsParsed: (isParsed: boolean) => void;
  parseCSV: () => void;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);

export const FileUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setColumns } = useDataContext(); // Use DataContext
  const [file, setFile] = useState<File | null>(null);
  const [isParsed, setIsParsed] = useState(false);

  const parseCSV = useCallback(() => {
    if (file) {
      Papa.parse(file, {
        complete: (result: any) => {
          if (result.data && result.data.length > 0) {
            // Convert parsed data to the required format
            const headers = Object.keys(result.data[0]);
            const preview = headers.reduce((acc, header) => {
              acc[header] = result.data[0][header];
              return acc;
            }, {} as Record<string, string>);
            const rows = result.data.map((row: any) => headers.reduce((acc, header) => {
              acc[header] = row[header];
              return acc;
            }, {} as Record<string, string>));

            setColumns({ headers, preview, rows });
            setIsParsed(true);
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  }, [file, setColumns]);

  return (
    <FileUploadContext.Provider
      value={{ file, isParsed, setFile, setIsParsed, parseCSV }}
    >
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUpload = () => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error('useFileUpload must be used within a FileUploadProvider');
  }
  return context;
};
