// components/ColumnMapping.tsx
import React, { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import tooltip styles

interface ColumnMappingProps {
  columns: string[];
  previews: Record<string, string>;
  onMappingChange: (field: string, column: string) => void;
  recordCount: any;
}

const ColumnMapping: React.FC<ColumnMappingProps> = ({ columns, previews, onMappingChange, recordCount }) => {
  useEffect(() => {
    console.log('Columns:', columns);
    console.log('Preview:', previews);
  }, [columns, previews]);
useEffect(()=>{
  onMappingChange('email','Email');
},[])
  return (
    <div className=" bg-white shadow-md rounded-lg">
      <img src="/step2loader.png" alt="" className="w-screen mb-6" />
      <div style={{ border: '1px solid gray', borderRadius: '20px' }} className='p-0 m-4'>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid gray' }}>
          <div>
            <h2 className="text-xl font-semibold mb-2">Set up imported custom variables</h2>
            <p className="text-sm text-gray-500 mb-6">
              Select how columns from your file map to contact columns needed for enrich
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', height: 'fit-content', alignItems: 'center', border: '2px solid #00000063', padding: '7px', borderRadius: '21px', gap: '13px', background: '#00000063' }}>
            <i className="fa-solid fa-users" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}></i>{recordCount} Leads Found
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 font-semibold mb-4 text-gray-600" style={{ border: '1px solid gray', background: '#0606061f', padding: '9px' }}>
          <div>COLUMN</div>
          <div>FILE COLUMN</div>
          <div>PREVIEW</div>
        </div>

        {/* Field 1 */}
        <div className="grid grid-cols-3 gap-4 items-center  py-4 px-4">
          <div className="flex items-center gap-2">
            <Tippy content="">
              <span>
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </span>
            </Tippy>
            <span>First Name</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-gray-400"></i>
            <select
              onChange={(e) => onMappingChange('firstname', e.target.value)}
              className="border border-gray-300 rounded-full p-2 w-full"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-equals"></i>
          </div>
          <div className="text-gray-600">
            {previews['First Name'] || 'Sushmita'}
          </div>
        </div>


        {/* Field 2 */}
        <div className="grid grid-cols-3 gap-4 items-center py-4 px-4">
          <div className="flex items-center gap-2">
            <Tippy content="">
              <span>
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </span>
            </Tippy>
            <span>Last Name</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-gray-400"></i>
            <select
              onChange={(e) => onMappingChange('lastname', e.target.value)}
              className="border border-gray-300 rounded-full p-2 w-full"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-equals"></i>
          </div>
          <div className="text-gray-600">
            {previews['Last Name'] || 'Swain'}
          </div>
        </div>

        <div className="text-slate-300 px-4">---------OR---------</div>

        {/* Field 3 */}
        <div className="grid grid-cols-3 gap-4 items-center py-4 px-4">
          <div className="flex items-center gap-2">
            <Tippy content="If you have it, using First Name and Last Name is better since we will split the Full name into a First Name and Last Name anyway.">
              <span>
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </span>
            </Tippy>
            <span>Fullname</span>
            <Tippy content="If you have it, using First Name and Last Name is better since we will split the Full name into a First Name and Last Name anyway.">
              <span>
              <i className="fa-solid fa-info-circle text-gray-400 ml-2 cursor-pointer"></i>
              </span>
            </Tippy>

          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-gray-400"></i>
            <select
              onChange={(e) => onMappingChange('fullname', e.target.value)}
              className="border border-gray-300 rounded-full p-2 w-full"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-equals"></i>
          </div>
          <div className="text-gray-600">
            {previews['Fullname'] || '-'}
          </div>
        </div>

        {/* Field 4 */}
        <div className="grid grid-cols-3 gap-4 items-center py-4 px-4 border-t">
          <div className="flex items-center gap-2">
            <Tippy content="Using Company Domain will yield more results.">
              <span>
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </span>
            </Tippy>
            <span>Company Domain</span>
            <span className='bg-gradient-to-r from-[#8C57EA]/20 to-[#5570E8]/20 text-blue border-2 p-1 rounded-full '><i className="fa-solid fa-arrow-up"></i>+15% more result</span>

          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-gray-400"></i>
            <select
              onChange={(e) => onMappingChange('companydomain', e.target.value)}
              className="border border-gray-300 rounded-full p-2 w-full"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-equals"></i>
          </div>
          <div className="text-gray-600">
            {previews['Company Domain'] || 'Shoden'}
          </div>
        </div>

        <div className="text-slate-300 px-4 flex items-center">
        -------And/OR
        <Tippy
          content="Select both if you can, but to enrich a contact we'll need at least the company name OR the company domain."
          trigger="mouseenter"
          hideOnClick={false}
        >
          <span className="ml-2">
            <i className="fa-solid fa-info-circle text-gray-400 cursor-pointer"></i>
          </span>
        </Tippy>----------
      </div>

        {/* Field 5 */}
        <div className="grid grid-cols-3 gap-4 items-center py-4 px-4">
          <div className="flex items-center gap-2">
            <Tippy content="">
              <span>
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </span>
            </Tippy>
            <span>Company Name</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-gray-400"></i>
            <select
              onChange={(e) => onMappingChange('companyname', e.target.value)}
              className="border border-gray-300 rounded-full p-2 w-full"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-equals"></i>
          </div>
          <div className="text-gray-600">
            {previews['Company Name'] || '-'}
          </div>
        </div>

        <div className="text-slate-300 border-t px-4">
            OPTIONAL
        </div>
        {/* Field 6 */}
        <div className="grid grid-cols-3 gap-4 items-center  py-4 px-4">
          <div className="flex items-center gap-2">
            <Tippy content="Using LinkedIn Profile URL will yield more results.">
              <span>
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </span>
            </Tippy>
            <span>LinkedIn Profile URL</span>
            <span className='bg-gradient-to-r from-[#8C57EA]/20 to-[#5570E8]/20 text-blue border-2 p-1 rounded-full '><i className="fa-solid fa-arrow-up"></i>+10% more result</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-gray-400"></i>
            <select
              onChange={(e) => onMappingChange('linkedinprofileurl', e.target.value)}
              className="border border-gray-300 rounded-full p-2 w-full"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-equals"></i>
          </div>
          <div className="text-gray-600">
            {previews['LinkedIn Profile URL'] || 'https://www.linkedin.com/in/aryanjaincoder/'}
          </div>
        </div>


        {/* Field 7 */}
        <div className="grid grid-cols-3 gap-4 items-center  py-4 px-4">
          <div className="flex items-center gap-2">
            <Tippy content="">
              <span>
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </span>
            </Tippy>
            <span>Job Title</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-right text-gray-400"></i>
            <select
              onChange={(e) => onMappingChange('jobtitle', e.target.value)}
              className="border border-gray-300 rounded-full p-2 w-full"
            >
              <option value="">Select Column</option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <i className="fa-solid fa-equals"></i>
          </div>
          <div className="text-gray-600">
            {previews['Job Title'] || '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnMapping;
