/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Paginations';
import { useLeads } from '@/context/LeadContext';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/navigation';

interface Lead {
  id: string;
  name: string;
  exportType: string;
  numberOfLeads: number;
  createdOn: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

const LEADS_PER_PAGE = 5;

export default function LeadsTable() {
  const { filteredLeads, renameLead, deleteLead } = useLeads();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLeadModal, setDeleteLeadModal] = useState<Lead | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [searchBarValue, setSearchBarValue] = useState<string>(''); 
  const router = useRouter();

  const totalPages = Math.ceil(filteredLeads.length / LEADS_PER_PAGE);
useEffect(()=>{console.log(currentLeads)});
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * LEADS_PER_PAGE,
    currentPage * LEADS_PER_PAGE
  );

  const handleEditClick = (lead: Lead) => {
    setEditLead(lead);
    setNewName(lead.name);
  };

  const handleDeleteClick = (lead: Lead) => {
    setDeleteLeadModal(lead);
  };

  const handleRename = () => {
    if (editLead && newName !== editLead.name) {
      renameLead(editLead.id, newName);
      setEditLead(null);
    }
  };

  const handleDelete = () => {
    if (deleteLeadModal) {
      deleteLead(deleteLeadModal.id);
      setDeleteLeadModal(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="border-b-[0.5px] border-solid border-blue_gray-50 bg-foundation-background-lighter p-[1.80rem]">
        <div className="flex items-start justify-between flex-row">
          <h6 className="mt-[0.50rem]">All Leads List</h6>
          <div className="flex flex-1 justify-end gap-[0.50rem] self-center sm:flex-col sm:self-stretch flex-row h-11">
            <input
              name="search"
              placeholder="Search by name"
              value={searchBarValue}
              onChange={(e) => setSearchBarValue(e.target.value)}
              className="gap-[0.50rem] rounded-[28px] border border-solid border-gray-300 text-blue_gray-300 w-64 p-4"
            />
            <button
              className="min-w-[10.00rem] gap-[0.50rem] rounded-[28px] font-medium tracking-[0.00rem] bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 flex items-center"
            >
              <img
                src="img_download.svg"
                width={16}
                height={16}
                alt="Download"
                className="h-[1.00rem] w-[1.80rem]"
              />
              Create New List
            </button>
          </div>
        </div>
      </div>
      <table className="table-auto w-full text-left border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-gray-600">Name</th>
            <th className="px-4 py-2 text-gray-600">Export Type</th>
            <th className="px-4 py-2 text-gray-600">No. of Leads</th>
            <th className="px-4 py-2 text-gray-600">Created On</th>
            <th className="px-4 py-2 text-gray-600">Status</th>
            <th className="px-4 py-2 text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.map((lead: Lead) => (
            <tr key={lead.id} className="border-t">
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.exportType}</td>
              <td className="px-4 py-2">{lead.numberOfLeads}</td>
              <td className="px-4 py-2">{lead.createdOn}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-lg text-white text-sm ${
                    lead.status === 'Completed'
                      ? 'bg-green-500'
                      : lead.status === 'In Progress'
                      ? 'bg-orange-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEditClick(lead)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline ml-4"
                  onClick={() => handleDeleteClick(lead)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Edit Lead Modal */}
      {editLead && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Lead</h2>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
              placeholder="New Lead Name"
            />
            <button
              onClick={handleRename}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditLead(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Lead Modal */}
      {deleteLeadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Delete Lead</h2>
            <p>Are you sure you want to delete {deleteLeadModal.name}?</p>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 mt-4"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteLeadModal(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
