// src/redux/slices/leadsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lead } from '@/types/lead';
import { AppThunk } from '../store'; // Adjust the import path accordingly
import { db } from '@/firebase/firebaseConfig';

interface LeadsState {
  leads: Lead[];
  filter: string;
}

const initialState: LeadsState = {
  leads: [],
  filter: '',
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads(state, action: PayloadAction<Lead[]>) {
      state.leads = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
});

export const { setLeads, setFilter } = leadsSlice.actions;

export const uploadLeadsToFirebase = (): AppThunk => async (dispatch, getState) => {
  const { leads } = getState().leads;
  try {
    const batch = db.batch();
    leads.forEach((lead) => {
      const leadRef = db.collection('leads').doc(lead.id.toString());
      batch.set(leadRef, lead);
    });
    await batch.commit();
    console.log('Leads uploaded successfully.');
  } catch (error) {
    console.error('Error uploading leads:', error);
  }
};

export const selectFilteredLeads = (state: LeadsState) => {
  const { leads, filter } = state;
  return leads.filter(lead =>
    lead.name.toLowerCase().includes(filter.toLowerCase()) ||
    lead.exportType.toLowerCase().includes(filter.toLowerCase()) ||
    lead.status.toLowerCase().includes(filter.toLowerCase())
  );
};

export default leadsSlice.reducer;
