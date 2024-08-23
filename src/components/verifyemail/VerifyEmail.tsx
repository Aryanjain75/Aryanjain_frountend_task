import React, { useEffect, useState } from 'react';
import { useVerifyEmails } from '@/context/VerifyEmailsContext';

const VerifyEmails: React.FC = () => {
    const { emailData, statusData, setStatusData, exportData } = useVerifyEmails();
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed

    useEffect(() => {
        console.log('Current emailData in VerifyEmails:', emailData); // Debug line
        const interval = setInterval(() => {
            setStatusData((prevStatusData) => {
                const newStatusData = { ...prevStatusData };
                emailData.forEach((_, index) => {
                    if (!newStatusData[index] || newStatusData[index] === 'Verifying') {
                        newStatusData[index] = 'Completed';
                    }
                });
                return newStatusData;
            });
        }, 10000);
    console.log(currentItems);
        return () => clearInterval(interval);

    }, [emailData, setStatusData]);

    // Paginate data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = emailData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(emailData.length / itemsPerPage);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
                  <img src="/step4loader.png" alt="" className="w-screen" />

            <h2 className="text-xl font-semibold mb-4">Verify Emails</h2>
            <p className="text-sm text-gray-500 mb-4">
                Verify email addresses for leads to improve lead generation efforts.
            </p>

            <table className="w-full mb-4 border-collapse">
                <thead>
                    <tr>
                        <th className="text-left border-b p-2">First Name</th>
                        <th className="text-left border-b p-2">Last Name</th>
                        <th className="text-left border-b p-2">Company Domain</th>
                        <th className="text-left border-b p-2">LinkedIn Profile URL</th>
                        <th className="text-left border-b p-2">Email Address</th>
                        <th className="text-left border-b p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, index) => {
                        const status = statusData[index + indexOfFirstItem] || 'Verifying';
                        return (
                            <tr key={index} className="border-b">
                                <td className="p-2">{row['firstname']}</td>
                                <td className="p-2">{row['lastname']}</td>
                                <td className="p-2">{row['companydomain']}</td>
                                <td className="p-2">{row['linkedinprofileurl']}</td>
                                <td className="p-2">{row["email"] || '-'}</td>
                                <td className="p-2">
                                    {status === 'Verifying' ? (
                                        <span className="flex items-center">
                                            <div className="w-4 h-4 border-t-2 border-blue-600 rounded-full animate-spin mr-2"></div>
                                            Verifying
                                        </span>
                                    ) : (
                                        <span className="text-green-600">Completed</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <div>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 border rounded ${
                                i + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <div className="flex justify-end">
                    <button 
                        onClick={exportData} 
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Export Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmails;
