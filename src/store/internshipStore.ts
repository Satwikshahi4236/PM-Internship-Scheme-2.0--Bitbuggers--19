import { create } from 'zustand';
import { InternshipFilters } from '@/types';

interface InternshipState {
  filters: InternshipFilters;
  currentPage: number;
  viewMode: 'grid' | 'list';
  setFilters: (filters: Partial<InternshipFilters>) => void;
  setPage: (page: number) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  resetFilters: () => void;
}

const initialFilters: InternshipFilters = {
  search: '',
  sector: '',
  location: '',
  company: '',
  status: '',
};

export const useInternshipStore = create<InternshipState>((set) => ({
  filters: initialFilters,
  currentPage: 1,
  viewMode: 'grid',

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filters change
    })),

  setPage: (page) => set({ currentPage: page }),

  setViewMode: (mode) => set({ viewMode: mode }),

  resetFilters: () => set({ filters: initialFilters, currentPage: 1 }),
}));