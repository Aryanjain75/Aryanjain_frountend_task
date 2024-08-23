"use client"
import { useState } from 'react';
import { Send, Mail, Users, Settings } from 'lucide-react';
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

type Campaign = {
  id: number;
  name: string;
  createdOn: string;
  status: 'Active' | 'Paused' | 'Completed' | 'Incomplete' | 'Draft';
  noOfLead: number;
  sent: string;
  clicked: number;
  open: number;
};

const campaignsData: Campaign[] = [
  {
    id: 1,
    name: 'Default Campaign',
    createdOn: '20/05/2024',
    status: 'Completed',
    noOfLead: 560,
    sent: '454/560',
    clicked: 25,
    open: 400,
  },
  // Add more mock data here
  // ...
];

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this to increase/decrease items per page
  const [statusFilter, setStatusFilter] = useState('');

  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? campaign.status === statusFilter : true)
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Campaign</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">+ New Campaign</button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-4">
          <button
            className="text-sm font-medium"
            onClick={() => handleStatusFilter('')}
          >
            All Campaigns
          </button>
          <button
            className="text-sm font-medium"
            onClick={() => handleStatusFilter('Active')}
          >
            Active
          </button>
          <button
            className="text-sm font-medium"
            onClick={() => handleStatusFilter('Paused')}
          >
            Paused
          </button>
          <button
            className="text-sm font-medium"
            onClick={() => handleStatusFilter('Completed')}
          >
            Completed
          </button>
          <button
            className="text-sm font-medium"
            onClick={() => handleStatusFilter('Incomplete')}
          >
            Incomplete
          </button>
          <button
            className="text-sm font-medium"
            onClick={() => handleStatusFilter('Draft')}
          >
            Draft
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Created On</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">No. of Lead</th>
                <th className="px-4 py-2">Sent</th>
                <th className="px-4 py-2">Clicked</th>
                <th className="px-4 py-2">Open</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-4 py-2">{campaign.name}</td>
                    <td className="px-4 py-2">{campaign.createdOn}</td>
                    <td className="px-4 py-2">{campaign.status}</td>
                    <td className="px-4 py-2">{campaign.noOfLead}</td>
                    <td className="px-4 py-2">{campaign.sent}</td>
                    <td className="px-4 py-2">{campaign.clicked}%</td>
                    <td className="px-4 py-2">{campaign.open}</td>
                    <td
                      className="px-4 py-2 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(campaign.id)}
                    >
                      Delete
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No campaigns found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
