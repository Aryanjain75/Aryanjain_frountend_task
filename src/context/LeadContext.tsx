"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { get, ref, onValue } from 'firebase/database';
import { database } from '@/firebase/firebaseConfig';

interface Lead {
  id: string;
  name: string;
  exportType: string;
  numberOfLeads: number;
  createdOn: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

interface LeadFilter {
  name: string;
  exportType: string;
  status: string;
  createdOn: string;
}

interface LeadsContextProps {
  leads: Lead[];
  filteredLeads: Lead[];
  setFilter: (filter: Partial<LeadFilter>) => void;
  renameLead: (id: string, newName: string) => void;
  deleteLead: (id: string) => void;
}

const LeadsContext = createContext<LeadsContextProps>({
  leads: [],
  filteredLeads: [],
  setFilter: () => {},
  renameLead: () => {},
  deleteLead: () => {},
});

export const LeadsProvider = ({ children }: { children: React.ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Partial<LeadFilter>>({
    name: '',
    exportType: '',
    status: '',
    createdOn: '',
  });

  useEffect(() => {
    const userRef = ref(database, "users");
    
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersArray = Object.entries(snapshot.val()).map(([key, value]: [string, any]) => {
          return {
            id: value.id,
            name: value.name,
            exportType: value.type,
            numberOfLeads: value.data.length, // Mock number of leads
            createdOn: new Date().toISOString(), // Mock created date
            status: 'Completed', // Mock status
          } as Lead;
        });

        setLeads(usersArray);
      } else {
        console.log("No data available");
      }
    }, (error) => {
      console.error("Error fetching users:", error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const renameLead = (id: string, newName: string) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === id ? { ...lead, name: newName } : lead
      )
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(
      (lead) =>
        (!filter.name || lead.name.toLowerCase().includes(filter.name.toLowerCase())) &&
        (!filter.exportType || lead.exportType.toLowerCase().includes(filter.exportType.toLowerCase())) &&
        (!filter.status || lead.status.toLowerCase().includes(filter.status.toLowerCase())) &&
        (!filter.createdOn || lead.createdOn === filter.createdOn)
    );
  }, [leads, filter]);

  return (
    <LeadsContext.Provider
      value={{ leads, filteredLeads, setFilter, renameLead, deleteLead }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => useContext(LeadsContext);
