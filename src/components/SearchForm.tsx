import type { FormEvent } from 'react'
import { ArrowUpDown, CalendarDays, MapPin, Navigation, Search } from 'lucide-react'
import { cities } from '../types/data'

type Props = {
  onSearch: (event?: FormEvent) => void
  from: string
  to: string
  date: string
  setFrom: (value: string) => void
  setTo: (value: string) => void
  setDate: (value: string) => void
  swap: () => void
  cityOptions?: string[]
}

export function SearchForm({ onSearch, from, to, date, setFrom, setTo, setDate, swap, cityOptions = cities }: Props) {
  return <form className="search-form" onSubmit={onSearch}>
    <label className="field"><MapPin size={19} /><span>من</span><select value={from} onChange={(event) => setFrom(event.target.value)}>{cityOptions.map((city) => <option key={city}>{city}</option>)}</select></label>
    <button className="swap" type="button" onClick={swap} aria-label="تبديل المدن"><ArrowUpDown size={17} /></button>
    <label className="field"><Navigation size={19} /><span>إلى</span><select value={to} onChange={(event) => setTo(event.target.value)}>{cityOptions.map((city) => <option key={city}>{city}</option>)}</select></label>
    <label className="field"><CalendarDays size={19} /><span>تاريخ الرحلة</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
    <button className="btn btn-primary search-submit" type="submit"><Search size={18} /> ابحث عن رحلة</button>
  </form>
}
