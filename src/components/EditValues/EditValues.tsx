import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useVerifyEmails } from '@/context/VerifyEmailsContext'; // Adjust the import path as needed

interface EditValuesProps {
  mapping: {
    firstname?: boolean;
    lastname?: boolean;
    fullname?: boolean;
    companydomain?: boolean;
    companyname?: boolean;
    linkedinprofileurl?: boolean;
    jobtitle?: boolean;
    email?: boolean;
  };
}

const EditValues: React.FC<EditValuesProps> = ({ mapping }) => {
  const { emailData, setEmailData } = useVerifyEmails();
  const [filteredData, setFilteredData] = useState(emailData);
  const [errors, setErrors] = useState<{ [key: number]: { [field: string]: string } }>({});
  const [showInvalidOnly, setShowInvalidOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    validateData();
  }, [emailData, mapping]);

  useEffect(() => {
    setFilteredData(emailData);
  }, [emailData]);

  const validateData = () => {
    const newErrors: { [key: number]: { [field: string]: string } } = {};

    emailData.forEach((row, index) => {
      const rowErrors: { [field: string]: string } = {};

      if (mapping.firstname && !row.firstname) {
        rowErrors['firstname'] = 'Missing First Name\nFormat Example: John';
      }
      if (mapping.lastname && !row.lastname) {
        rowErrors['lastname'] = 'Missing Last Name\nFormat Example: Doe';
      }
      if (mapping.fullname && !row.fullname) {
        rowErrors['fullname'] = 'Missing Full Name\nFormat Example: John Doe';
      }
      if (mapping.companydomain && row.companydomain && !row.companydomain.includes('.')) {
        rowErrors['companydomain'] = 'Invalid Domain\nFormat Example: google.com';
      }
      if (mapping.companyname && !row.companyname) {
        rowErrors['companyname'] = 'Missing Company Name\nFormat Example: Google';
      }
      if (mapping.linkedinprofileurl && row.linkedinprofileurl && !row.linkedinprofileurl.startsWith('https://linkedin.com')) {
        rowErrors['linkedinprofileurl'] = 'Invalid LinkedIn URL\nFormat Example: https://linkedin.com/in/johndoe';
      }
      if (mapping.jobtitle && !row.jobtitle) {
        rowErrors['jobtitle'] = 'Missing Job Title\nFormat Example: Engineer';
      }
      if (mapping.email) {
        if (!row.email) {
          rowErrors['email'] = 'Missing Email\nFormat Example: john.doe@example.com';
        } else if (!isValidEmail(row.email)) {
          rowErrors['email'] = 'Invalid Email\nFormat Example: john.doe@example.com';
        }
      }

      if (Object.keys(rowErrors).length > 0) {
        newErrors[index] = rowErrors;
      }
    });

    setErrors(newErrors);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedData = [...filteredData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setFilteredData(updatedData);
    console.log('Updating emailData:', updatedData); // Debug line
    setEmailData(updatedData); // Make sure this line is updating the context
    validateRow(index, updatedData[index]);
  };

  const validateRow = (index: number, row: any) => {
    const rowErrors: { [field: string]: string } = {};

    if (mapping.firstname && !row.firstname) {
      rowErrors['firstname'] = 'Missing First Name\nFormat Example: John';
    }
    if (mapping.lastname && !row.lastname) {
      rowErrors['lastname'] = 'Missing Last Name\nFormat Example: Doe';
    }
    if (mapping.fullname && !row.fullname) {
      rowErrors['fullname'] = 'Missing Full Name\nFormat Example: John Doe';
    }
    if (mapping.companydomain && row.companydomain && !row.companydomain.includes('.')) {
      rowErrors['companydomain'] = 'Invalid Domain\nFormat Example: google.com';
    }
    if (mapping.companyname && !row.companyname) {
      rowErrors['companyname'] = 'Missing Company Name\nFormat Example: Google';
    }
    if (mapping.linkedinprofileurl && row.linkedinprofileurl && !row.linkedinprofileurl.startsWith('https://linkedin.com')) {
      rowErrors['linkedinprofileurl'] = 'Invalid LinkedIn URL\nFormat Example: https://linkedin.com/in/johndoe';
    }
    if (mapping.jobtitle && !row.jobtitle) {
      rowErrors['jobtitle'] = 'Missing Job Title\nFormat Example: Engineer';
    }
    if (mapping.email) {
      if (!row.email) {
        rowErrors['email'] = 'Missing Email\nFormat Example: john.doe@example.com';
      } else if (!isValidEmail(row.email)) {
        rowErrors['email'] = 'Invalid Email\nFormat Example: john.doe@example.com';
      }
    }

    setErrors((prevErrors:any) => ({
      ...prevErrors,
      [index]: Object.keys(rowErrors).length > 0 ? rowErrors : undefined
    }));
  };

  const toggleInvalidRows = () => {
    if (showInvalidOnly) {
      setFilteredData(emailData);
    } else {
      const invalidRows = emailData.filter((_, index) => Object.keys(errors[index] || {}).length > 0);
      setFilteredData(invalidRows);
    }
    setShowInvalidOnly(!showInvalidOnly);
  };

  // Pagination calculation
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = Array.isArray(filteredData) ? filteredData.slice(firstIndex, lastIndex) : [];

  const totalPages = Math.ceil((Array.isArray(filteredData) ? filteredData.length : 0) / itemsPerPage);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div>
        <img src="/step3loader.png" alt="" className='w-screen'/>
      </div>
      <div className='border-2 border-black p-5'>
        <div className='flex justify-between flex-col'>
          <div>
            <h2 className="text-xl font-semibold mb-4">Edit Values</h2>
            <p className="text-sm text-gray-500 mb-4">Edit contacts and correct any invalid values.</p>
          </div>
          <div className="flex items-center mb-4 justify-end">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showInvalidOnly}
                  onChange={toggleInvalidRows}
                  className="mr-2"
                />
                Only show leads with invalid values.
              </label>
            </div>
            <div className="flex items-center">
              <span className="text-red-500 border-2 border-[#ff000030] mr-4 bg-[#ff000030] p-1 rounded-full">
                {Object.keys(errors).filter(index => Object.keys(errors[Number(index)]).length > 0).length} Invalid Values
              </span>
              <span className="text-black border-1 border-[#00000080] bg-[#00000080] p-1 rounded-2xl">
                <i className="fa-solid fa-users"></i> {filteredData.length} Leads Found
              </span>
            </div>
          </div>
        <table className="w-full mb-4 border-collapse">
          <thead>
            <tr>
              {mapping.firstname && <th className="text-left border-b p-2">First Name</th>}
              {mapping.lastname && <th className="text-left border-b p-2">Last Name</th>}
              {mapping.fullname && <th className="text-left border-b p-2">Full Name</th>}
              {mapping.companydomain && <th className="text-left border-b p-2">Company Domain</th>}
              {mapping.companyname && <th className="text-left border-b p-2">Company Name</th>}
              {mapping.linkedinprofileurl && <th className="text-left border-b p-2">LinkedIn Profile URL</th>}
              {mapping.jobtitle && <th className="text-left border-b p-2">Job Title</th>}
              {mapping.email && <th className="text-left border-b p-2">Email</th>} {/* Added email header */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => {
              const rowErrors = errors[firstIndex + index] || {};
              return (
                <tr key={firstIndex + index}>
                  {mapping.firstname && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.firstname || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'firstname', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['firstname'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['firstname'] && (
                        <Tippy content={rowErrors['firstname']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                  {mapping.lastname && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.lastname || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'lastname', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['lastname'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['lastname'] && (
                        <Tippy content={rowErrors['lastname']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                  {mapping.fullname && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.fullname || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'fullname', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['fullname'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['fullname'] && (
                        <Tippy content={rowErrors['fullname']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                  {mapping.companydomain && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.companydomain || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'companydomain', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['companydomain'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['companydomain'] && (
                        <Tippy content={rowErrors['companydomain']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                  {mapping.companyname && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.companyname || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'companyname', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['companyname'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['companyname'] && (
                        <Tippy content={rowErrors['companyname']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                  {mapping.linkedinprofileurl && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.linkedinprofileurl || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'linkedinprofileurl', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['linkedinprofileurl'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['linkedinprofileurl'] && (
                        <Tippy content={rowErrors['linkedinprofileurl']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                  {mapping.jobtitle && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.jobtitle || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'jobtitle', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['jobtitle'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['jobtitle'] && (
                        <Tippy content={rowErrors['jobtitle']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                  {mapping.email && (
                    <td className="p-2 relative">
                      <input
                        type="text"
                        value={row.email || ''}
                        onChange={(e) => handleInputChange(firstIndex + index, 'email', e.target.value)}
                        className={`w-full border p-1 rounded ${rowErrors['email'] ? 'border-red-500 bg-red-100' : ''}`}
                      />
                      {rowErrors['email'] && (
                        <Tippy content={rowErrors['email']} arrow={false}>
                          <span className="text-red-500 ml-2 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                          </span>
                        </Tippy>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="text-gray-700"
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="text-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditValues;
