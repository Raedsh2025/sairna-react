import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Check } from 'lucide-react'
import './App.css'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { Auth } from './pages/Auth'
import { Booking } from './pages/Booking'
import { Home } from './pages/Home'
import { Results } from './pages/Results'
import { Tracking } from './pages/Tracking'
import { AdminAuth } from './pages/AdminAuth'
import { getCities } from './api/client'
import { hashToView, trips, type City, type Trip, type View } from './types/data'

function App() {
  const [view, setView] = useState<View>(() => hashToView(window.location.hash))
  const [dark, setDark] = useState(() => localStorage.getItem('sairna-theme') === 'dark')
  const [from, setFrom] = useState('دمشق')
  const [to, setTo] = useState('حلب')
  const [date, setDate] = useState('2026-11-12')
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [toast, setToast] = useState('')
  const [cityOptions, setCityOptions] = useState<City[]>([])

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('sairna-theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { void getCities().then(setCityOptions).catch(() => undefined) }, [])
  useEffect(() => { const onHash = () => setView(hashToView(window.location.hash)); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])

  const navigate = (next: View) => { window.location.hash = next; setView(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const search = (event?: FormEvent) => { event?.preventDefault(); if (from === to) return notify('اختار مدينتين مختلفتين للرحلة'); navigate('results') }
  const book = (trip: Trip) => { setSelectedTrip(trip); navigate('booking') }
  const swap = () => { setFrom(to); setTo(from) }

  const cityNames = cityOptions.length ? cityOptions.map((city) => city.name) : undefined
  const originId = cityOptions.find((city) => city.name === from)?.id
  const destinationId = cityOptions.find((city) => city.name === to)?.id
  return <div className="app-root motion-safe:animate-fade-in">{view !== 'admin-login' && <SiteHeader view={view} dark={dark} onTheme={() => setDark(!dark)} navigate={navigate} />}<main>{view === 'home' && <Home {...{ onSearch: search, from, to, date, setFrom, setTo, setDate, swap, navigate }} cityOptions={cityNames} />}{view === 'results' && <Results {...{ from, to, date, originId, destinationId, onSearch: search, setFrom, setTo, setDate, swap, onBook: book }} cityOptions={cityNames} />}{view === 'booking' && <Booking trip={selectedTrip ?? trips[0]} {...{ from, to, date, notify, navigate }} />}{view === 'tracking' && <Tracking notify={notify} />}{view === 'auth' && <Auth {...{ notify, navigate }} />}{view === 'admin-login' && <AdminAuth {...{ notify, navigate }} />}</main>{view !== 'auth' && view !== 'admin-login' && <SiteFooter navigate={navigate} />}{toast && <div className="toast motion-safe:animate-pop"><Check size={17} /> {toast}</div>}</div>
}

export default App
