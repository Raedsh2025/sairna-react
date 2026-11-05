import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Trip } from '../types/data'

type AppState = {
  dark: boolean
  from: string
  to: string
  date: string
  selectedTrip: Trip | null
  toast: string
  setDark: (dark: boolean) => void
  setFrom: (from: string) => void
  setTo: (to: string) => void
  setDate: (date: string) => void
  selectTrip: (trip: Trip) => void
  notify: (message: string) => void
  clearToast: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      dark: false,
      from: 'دمشق',
      to: 'حلب',
      date: '2026-11-12',
      selectedTrip: null,
      toast: '',
      setDark: (dark) => set({ dark }),
      setFrom: (from) => set({ from }),
      setTo: (to) => set({ to }),
      setDate: (date) => set({ date }),
      selectTrip: (selectedTrip) => set({ selectedTrip }),
      notify: (toast) => set({ toast }),
      clearToast: () => set({ toast: '' }),
    }),
    {
      name: 'sairna-app-state',
      partialize: (state) => ({ dark: state.dark }),
    },
  ),
)
