"use client";

import React, { createContext, useContext, useState } from 'react';
import { push, ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';  // Import the useRouter hook
import { database } from "@/firebase/firebaseConfig";

interface VerifyEmailsContextType {
    emailData: any[];
    statusData: Record<number, string>;
    setEmailData: React.Dispatch<React.SetStateAction<any[]>>;
    setStatusData: React.Dispatch<React.SetStateAction<Record<number, string>>>;
    exportData: () => void;
    setfilename: React.Dispatch<React.SetStateAction<string>>;
    setfiletype: React.Dispatch<React.SetStateAction<string>>;
}

const VerifyEmailsContext = createContext<VerifyEmailsContextType | undefined>(undefined);

export const VerifyEmailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [emailData, setEmailData] = useState<any[]>([]);
    const [statusData, setStatusData] = useState<Record<number, string>>({});
    const [filename, setfilename] = useState<string>('');
    const [filetype, setfiletype] = useState<string>('');
    const router = useRouter(); // Initialize the router

    const userref = ref(database, "users");

    const exportData = async () => {
        try {
            const formattedData = {
                id: new Date().toISOString(), // Use a timestamp or unique ID for the document
                name: filename, // Replace with actual file name if needed
                type: filetype, // Replace with actual file type if needed
                data: emailData, // Send all data of the table
            };
            const newDataref = push(userref);
            await set(newDataref, formattedData);
            alert("Data submitted successfully");
            router.push('/leads'); // Navigate to the Leads page after submission
        } catch (e) {
            console.error("Error submitting data:", e);
        }
    };

    return (
        <VerifyEmailsContext.Provider value={{ setfilename, setfiletype, emailData, statusData, setEmailData, setStatusData, exportData }}>
            {children}
        </VerifyEmailsContext.Provider>
    );
};

export const useVerifyEmails = () => {
    const context = useContext(VerifyEmailsContext);
    if (context === undefined) {
        throw new Error('useVerifyEmails must be used within a VerifyEmailsProvider');
    }
    return context;
};
