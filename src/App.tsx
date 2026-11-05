import { useEffect } from 'react'
import type { FormEvent } from 'react'
import { Check } from 'lucide-react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { Auth } from './pages/Auth'
import { Booking } from './pages/Booking'
import { Home } from './pages/Home'
import { Results } from './pages/Results'
import { Tracking } from './pages/Tracking'
import { AdminAuth } from './pages/AdminAuth'
import { Companies } from './pages/Companies'
import { useCities } from './hooks/useCities'
import { useAppStore } from './store/appStore'
import { trips, type View } from './types/data'
import { pathToView, viewPaths } from './routing'

function App() {
  const routerNavigate = useNavigate()
  const location = useLocation()
  const { dark, from, to, date, selectedTrip, toast, setDark, setFrom, setTo, setDate, selectTrip, notify, clearToast } = useAppStore()
  const { cities } = useCities()
  const view = pathToView(location.pathname)
  const navigate = (next: View) => { routerNavigate(viewPaths[next]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(clearToast, 2800); return () => window.clearTimeout(timer) }, [toast, clearToast])

  const search = (event?: FormEvent) => { event?.preventDefault(); if (from === to) return notify('اختار مدينتين مختلفتين للرحلة'); navigate('results') }
  const book = (trip: typeof trips[number]) => { selectTrip(trip); navigate('booking') }
  const swap = () => { setFrom(to); setTo(from) }

  const cityNames = cities.length ? cities.map((city) => city.name) : undefined
  const originId = cities.find((city) => city.name === from)?.id
  const destinationId = cities.find((city) => city.name === to)?.id
  const commonProps = { from, to, date, setFrom, setTo, setDate, swap, navigate }
  return <div className="app-root motion-safe:animate-fade-in">{view !== 'admin-login' && <SiteHeader view={view} dark={dark} onTheme={() => setDark(!dark)} navigate={navigate} />}<main><Routes><Route path={viewPaths.home} element={<Home {...{ onSearch: search }} {...commonProps} cityOptions={cityNames} />} /><Route path={viewPaths.results} element={<Results {...{ originId, destinationId, onSearch: search, onBook: book }} {...commonProps} cityOptions={cityNames} />} /><Route path={viewPaths.booking} element={<Booking trip={selectedTrip ?? trips[0]} {...{ notify }} {...commonProps} />} /><Route path={viewPaths.companies} element={<Companies />} /><Route path={viewPaths.tracking} element={<Tracking notify={notify} />} /><Route path={viewPaths.auth} element={<Auth {...{ notify, navigate }} />} /><Route path={viewPaths['admin-login']} element={<AdminAuth {...{ notify, navigate }} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main>{view !== 'auth' && view !== 'admin-login' && <SiteFooter navigate={navigate} />}{toast && <div className="toast motion-safe:animate-pop"><Check size={17} /> {toast}</div>}</div>
}

export default App
