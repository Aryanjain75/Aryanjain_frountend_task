"use client";
import React from 'react';
import FileUpload from '@/components/FileUpload/FileUpload';
import ColumnMapping from '@/components/ColumnMapping/ColumnMapping';
import EditValues from '@/components/EditValues/EditValues';
import VerifyEmails from '@/components/verifyemail/VerifyEmail';
import { useDataContext } from '@/context/DataContext';
import { useVerifyEmails } from '@/context/VerifyEmailsContext';

export default function HomeContent() {
  const {
    step,
    columns,
    mappings,
    recordCount,
    handleFileParsed,
    handleMappingChange,
    nextStep,
    prevStep,
  } = useDataContext();
  
  const { setEmailData, emailData } = useVerifyEmails();

  React.useEffect(() => {
    if (step === 3 || step === 4) {
      const updatedEmailData = emailData.length > 0 ? emailData : columns.rows.map((row: any) =>
        Object.keys(mappings).reduce((acc, field) => {
          acc[field] = row[mappings[field]] || '';
          return acc;
        }, {} as Record<string, string>)
      );
      setEmailData(updatedEmailData);
    }
  }, [columns.rows, mappings, step, emailData, setEmailData]);

  return (
    <div>
      <div className="flex justify-between border-2 border-[#00000024] p-2">
        <div className="flex mx-7 content-center flex-wrap">
          <i className="fa-solid fa-arrow-left justify-center items-center flex w-7"></i>
          <span className="font-extrabold text-lg">
            <h2>Sample-data</h2>
          </span>
          <div
            style={{
              margin: '4px 17px',
              border: '2px solid #ffa50030',
              borderRadius: '10px',
              padding: '1px 12px',
              background: '#ffa50030',
              color: 'orange',
            }}
          >
            In Progress
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '30px',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              border: '2px solid blue',
              padding: '0.25rem',
              borderRadius: '19px',
              color: 'blue',
            }}
          >
            Rename Leads List
          </div>
          <div
            style={{
              border: '2px solid red',
              padding: '0.25rem',
              borderRadius: '19px',
              background: '#ff00004f',
              color: 'red',
            }}
          >
            Delete Leads List
          </div>
        </div>
      </div>

      {step === 1 && <FileUpload onFileParsed={handleFileParsed} />}
      {step === 2 && (
        <ColumnMapping
          columns={columns.headers}
          previews={columns.preview}
          recordCount={recordCount}
          onMappingChange={handleMappingChange}
        />
      )}
      {step === 3 && <EditValues mapping={mappings} />}
      {step === 4 && <VerifyEmails />}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button onClick={prevStep} className="text-gray-700">
            Previous
          </button>
        )}
        {step < 4 && (
          <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
            Continue
          </button>
        )}
      </div>
    </div>
  );
};
