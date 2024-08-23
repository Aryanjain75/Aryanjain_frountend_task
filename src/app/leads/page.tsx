"use client";

import React from 'react';
import LeadsTable from '@/components/LeadsTable/LeadTable';
import FilterComponent from '@/components/FilterComponent/FilterComponent';
import { useRouter } from 'next/navigation';  // Correct import
import { Separator } from '@/components/ui/separator';

export default function LeadsListPage() {
  const router = useRouter();

  return (
    <div>
      <div className="flex p-4 justify-between items-center border-gray-200 border">
    <h2 className="text-2xl font-semibold">Lead List</h2>
  </div>
  <div className="flex justify-between items-center">
        <FilterComponent />
      </div>
    <div className="p-6 flex flex-col space-y-6">
     
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Leads List</h2>
       
      </div>
      <Separator className="my-4" />
      <LeadsTable />
    </div>
    </div>
  );
}
