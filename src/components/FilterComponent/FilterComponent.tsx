import React, { useState, useMemo } from 'react';
import { useLeads } from '@/context/LeadContext';
import { FileSpreadsheet } from 'lucide-react';

export default function FilterComponent() {
  const { leads, setFilter } = useLeads();
  const [activeTab, setActiveTab] = useState<string>('All Leads List');

  const handleFilterChange = (filterValue: string) => {
    setActiveTab(filterValue);
    setFilter({ exportType: filterValue === 'All Leads List' ? '' : filterValue });
  };

  const getTabClasses = (tabName: string) =>
    `cursor-pointer p-2 ${
      activeTab === tabName
        ? 'bg-gradient-to-r from-[#8C57EA] to-[#5570E8] text-transparent bg-clip-text border-b-4 border-[#8C57EA]'
        : 'text-gray-700'
    }`;

  // Function to get the count of leads based on the filter
  const getLeadsCount = (filterValue: string) => {
    if (filterValue === 'All Leads List') {
      return leads.length;
    }
    return leads.filter(lead => lead.exportType === filterValue).length;
  };

  return (
    <div className="flex space-x-4 mb-4">
      <div
        className={getTabClasses('All Leads List')}
        onClick={() => handleFilterChange('All Leads List')}
      >
        <i className="fa-solid fa-paper-plane mr-2"></i>
        All Leads List ({getLeadsCount('All Leads List')})
      </div>
      <div
        className={getTabClasses('CSV')}
        onClick={() => handleFilterChange('CSV')}
      >
        <FileSpreadsheet className="inline mr-2" />
        From CSV Files ({getLeadsCount('CSV')})
      </div>
      <div
        className={getTabClasses('Hubspot')}
        onClick={() => handleFilterChange('Hubspot')}
      >
        <i className="fa-brands fa-hubspot mr-2"></i>
        From Hubspot ({getLeadsCount('Hubspot')})
      </div>
      <div
        className={getTabClasses('LinkedIn Sales Navigator')}
        onClick={() => handleFilterChange('LinkedIn Sales Navigator')}
      >
        <i className="fa-brands fa-linkedin mr-2"></i>
        From LinkedIn Sales Navigator ({getLeadsCount('LinkedIn Sales Navigator')})
      </div>
    </div>
  );
}
