// src/types/lead.ts

import { ReactNode } from "react";

export interface Lead {
    id: number;
    name: string;
    exportType: string;
    numberOfLeads: number;
    createdOn: any;
    status: "In Progress" | "Completed" | "Pending";
    actions: {
      edit: boolean;
      delete: boolean;
    };
  }
  