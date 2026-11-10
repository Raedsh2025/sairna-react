import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WEBSITE_TOKEN_KEY } from '../api/client'
import type { Trip } from '../types/data'

type AppState = {
  dark: boolean
  from: string
  to: string
  date: string
  selectedTrip: Trip | null
  toast: string
  isAuthenticated: boolean
  setDark: (dark: boolean) => void
  setFrom: (from: string) => void
  setTo: (to: string) => void
  setDate: (date: string) => void
  selectTrip: (trip: Trip) => void
  notify: (message: string) => void
  clearToast: () => void
  setAuthenticated: (isAuthenticated: boolean) => void
  logout: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      dark: false,
      from: '',
      to: '',
      date: '2026-11-12',
      selectedTrip: null,
      toast: '',
      isAuthenticated: Boolean(localStorage.getItem(WEBSITE_TOKEN_KEY)),
      setDark: (dark) => set({ dark }),
      setFrom: (from) => set({ from }),
      setTo: (to) => set({ to }),
      setDate: (date) => set({ date }),
      selectTrip: (selectedTrip) => set({ selectedTrip }),
      notify: (toast) => set({ toast }),
      clearToast: () => set({ toast: '' }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => {
        localStorage.removeItem(WEBSITE_TOKEN_KEY)
        set({ isAuthenticated: false })
      },
    }),
    {
      name: 'sairna-app-state',
      partialize: (state) => ({ dark: state.dark }),
    },
  ),
)
