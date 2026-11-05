import { useState } from 'react'
import { BusFront, ChevronLeft, Clock3, MapPin, Navigation, Search, Ticket, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTracking } from '../hooks/useTracking'

export function Tracking({ notify }: { notify: (message: string) => void }) {
  const [code, setCode] = useState('SR-204')
  const { result, search: track, loading, error } = useTracking()
  const search = async () => {
    try { await track(code); notify('تم تحديث موقع الرحلة') } catch { /* hook exposes the service error */ }
  }
  return <div className="inner-main"><section className="page-banner"><div className="container"><div className="breadcrumb"><Link to="/">الرئيسية</Link><ChevronLeft size={13} /><span>تتبّع الرحلة</span></div><h1>خليك مطمّن، وتابع رحلتك لحظة بلحظة</h1><p>أدخل رقم الحجز لتعرف وين وصلت الرحلة.</p></div></section><div className="container tracking"><div className="tracking-search"><label><Ticket size={19} /><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="مثال: SR-204" /></label><button className="btn btn-primary" onClick={() => void search()} disabled={loading}><Search size={17} /> {loading ? 'جاري البحث…' : 'تتبّع الآن'}</button></div>{error && <div className="api-state error-state">{error}</div>}{result && <div className="tracking-grid"><div className="map"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-pin pin-start"><MapPin size={20} /></div><div className="map-pin pin-bus"><BusFront size={21} /></div><div className="map-pin pin-end"><MapPin size={20} /></div><div className="map-label label-start">دمشق</div><div className="map-label label-end">حلب</div></div><aside className="track-panel"><div className="live-status"><span /><b>{result.status}</b><small>{result.updatedAt}</small></div><div className="track-route"><span><b>دمشق</b><small>06:30</small></span><i /><span><b>حلب</b><small>{result.arrival}</small></span></div><div className="progress"><span style={{ width: `${result.progress}%` }} /></div><div className="track-stats"><span><Clock3 size={16} /><b>{result.remaining}</b><small>وقت الوصول المتوقع {result.arrival}</small></span><span><Navigation size={16} /><b>{result.location}</b><small>{result.progress}% من الرحلة</small></span></div><button className="btn btn-subtle full" onClick={() => notify('سنرسل لك تنبيهاً عند الوصول')}>فعّل تنبيهات الوصول <Zap size={15} /></button></aside></div>}</div></div>
}
