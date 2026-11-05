import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Trip, View } from '../types/data'

type AppState = {
  view: View
  dark: boolean
  from: string
  to: string
  date: string
  selectedTrip: Trip | null
  toast: string
  setView: (view: View) => void
  navigate: (view: View) => void
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
      view: 'home',
      dark: false,
      from: 'دمشق',
      to: 'حلب',
      date: '2026-11-12',
      selectedTrip: null,
      toast: '',
      setView: (view) => set({ view }),
      navigate: (view) => {
        window.location.hash = view
        set({ view })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
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
