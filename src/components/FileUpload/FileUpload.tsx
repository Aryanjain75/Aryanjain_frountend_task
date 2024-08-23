/* eslint-disable @next/next/no-img-element */
// components/FileUpload.tsx
import React, { useState } from 'react';
import Papa from 'papaparse'; // CSV parsing library
import { useVerifyEmails } from '@/context/VerifyEmailsContext';

interface ParsedData {
  data: string[][];
  errors: any[];
}

interface FileUploadProps {
  onFileParsed: (data: string[][]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileParsed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsed, setIsParsed] = useState(false);
  const {setfilename, setfiletype } = useVerifyEmails();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsParsed(false);
    }
  };

  const parseCSV = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result: any) => {
          if (result.data && result.data.length > 0) {
            onFileParsed(result.data);
            setIsParsed(true);
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleSubmit = () => {
    if (file && !isParsed) {
        setfilename(file.name);
        setfiletype(file.type);
      parseCSV();
    } else if (!file) {
      alert('Please upload a file first.');
    }
  };

  const handleReupload = () => {
    setFile(null);
    setIsParsed(false);
  };

  const handleDelete = () => {
    setFile(null);
    setIsParsed(false);
  };

  return (
    <div>
      <img src="/step1loader.png" alt="" className="w-screen" />
      <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300 mx-6 mt-6">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-xl font-semibold mb-4">Upload Lead List</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus beatae nostrum sapiente.</p>
        </div>

        <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg bg-gray-100 w-[40rem] h-[13rem] my-8 mx-auto">
          {file ? (
            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-100% gap-3 rounded-lg  p-4 border-2 border-gray">
                <img
                  src="ing_frame_foundation__boarder_normal.svg"
                  width={49}
                  height={40}
                  alt="Image"
                  className="h-10 w-10"
                />
                <div className="flex-1">
                  <p className="text-xl font-medium text-gray-700">{file.name}</p>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
                    <span className="text-sm text-gray-500">|</span>
                    <span className="text-sm text-gray-500">N/A</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="text-blue-500" onClick={handleReupload}>Re-upload</button>
                  <button className="text-red-500" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <img
                  src="/pngtree-upload-cloud-vector-icon-png-image_1027251.jpg"
                  alt=""
                  className="w-[70px] mx-auto mb-4"
                />
                <div className="flex gap-1 text-blue-500 font-medium">
                  <span className="underline">Click to upload</span>
                  <span className="text-gray-500">or drag and drop</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  only .csv files are accepted - Maximum 10000 leads
                </p>
              </label>
            </>
          )}
        </div>

        <div className="w-[40rem] mx-auto">
          <div className="flex justify-between">
            <div className="font-bold">Fields Formatting</div>
            <div className="font-bold text-blue-500 underline cursor-pointer">
              Download/View sample
            </div>
          </div>
          <div className="mt-4">
            <img src="/image.png" alt="" />
          </div>
        </div>

        <div className="w-[40rem] mx-auto mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!file || isParsed}
            className={`px-4 py-2 rounded ${
              file && !isParsed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isParsed ? 'Submitted' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
