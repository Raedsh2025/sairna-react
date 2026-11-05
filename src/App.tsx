import { useEffect } from 'react'
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
import { useCities } from './hooks/useCities'
import { useAppStore } from './store/appStore'
import { hashToView, trips } from './types/data'

function App() {
  const { view, dark, from, to, date, selectedTrip, toast, setView, setDark, setFrom, setTo, setDate, selectTrip, notify, clearToast, navigate } = useAppStore()
  const { cities } = useCities()

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => { setView(hashToView(window.location.hash)); const onHash = () => setView(hashToView(window.location.hash)); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [setView])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(clearToast, 2800); return () => window.clearTimeout(timer) }, [toast, clearToast])

  const search = (event?: FormEvent) => { event?.preventDefault(); if (from === to) return notify('اختار مدينتين مختلفتين للرحلة'); navigate('results') }
  const book = (trip: typeof trips[number]) => { selectTrip(trip); navigate('booking') }
  const swap = () => { setFrom(to); setTo(from) }

  const cityNames = cities.length ? cities.map((city) => city.name) : undefined
  const originId = cities.find((city) => city.name === from)?.id
  const destinationId = cities.find((city) => city.name === to)?.id
  return <div className="app-root motion-safe:animate-fade-in">{view !== 'admin-login' && <SiteHeader view={view} dark={dark} onTheme={() => setDark(!dark)} navigate={navigate} />}<main>{view === 'home' && <Home {...{ onSearch: search, from, to, date, setFrom, setTo, setDate, swap, navigate }} cityOptions={cityNames} />}{view === 'results' && <Results {...{ from, to, date, originId, destinationId, onSearch: search, setFrom, setTo, setDate, swap, onBook: book }} cityOptions={cityNames} />}{view === 'booking' && <Booking trip={selectedTrip ?? trips[0]} {...{ from, to, date, notify, navigate }} />}{view === 'tracking' && <Tracking notify={notify} />}{view === 'auth' && <Auth {...{ notify, navigate }} />}{view === 'admin-login' && <AdminAuth {...{ notify, navigate }} />}</main>{view !== 'auth' && view !== 'admin-login' && <SiteFooter navigate={navigate} />}{toast && <div className="toast motion-safe:animate-pop"><Check size={17} /> {toast}</div>}</div>
}

export default App
