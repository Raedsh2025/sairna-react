import type { FormEvent } from 'react'
import { ArrowLeft, BusFront, Check, ChevronLeft, Headphones, MapPin, ShieldCheck, Zap } from 'lucide-react'
import { SearchForm } from '../components/SearchForm'
import type { View } from '../types/data'

type Props = {
  onSearch: (event?: FormEvent) => void
  from: string
  to: string
  date: string
  setFrom: (value: string) => void
  setTo: (value: string) => void
  setDate: (value: string) => void
  swap: () => void
  navigate: (view: View) => void
  cityOptions?: string[]
}

export function Home({ onSearch, from, to, date, setFrom, setTo, setDate, swap, navigate, cityOptions = [] }: Props) {
  return <>
    <section className="hero-section"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span>✦</span> سفر أهدى، وصول أسرع</div><h1>الرحلة الحلوة<br /><span>بتبلّش من هون.</span></h1><p>من أول بحث لآخر محطة، سيرنا بيخلي حجز رحلتك بين المحافظات السورية أبسط وأريح.</p><div className="hero-points"><span><ShieldCheck size={16} /> حجز آمن</span><span><Zap size={16} /> أسعار واضحة</span><span><Headphones size={16} /> دعم دايم</span></div><div className="social-proof"><div className="avatars"><i>م</i><i>ر</i><i>س</i><i>+</i></div><div><div className="stars">★★★★★ <b>4.9</b></div><small>أكثر من 12,000 مسافر مبسوط</small></div></div></div><div className="hero-visual"><img src="/assets/hero.svg" alt="حافلة سيرنا بين المدن" /><div className="float-card float-top"><span className="float-icon"><Check size={16} /></span><span><b>حجز مؤكد</b><small>رحلتك جاهزة</small></span></div><div className="float-card float-bottom"><span className="float-icon"><MapPin size={16} /></span><span><b>على الطريق</b><small>وصلت لحماة</small></span></div></div></div></section>
    <section className="container search-card" aria-label="البحث عن رحلة"><div className="search-card-head"><div><span className="live-dot motion-safe:animate-pulse" /> <strong>وين رايح اليوم؟</strong><small>ابحث عن الرحلة المناسبة إلك</small></div><span className="steps"><b>1</b> ابحث <i /> <b>2</b> اختار <i /> <b>3</b> احجز</span></div><SearchForm {...{ onSearch, from, to, date, setFrom, setTo, setDate, swap, cityOptions }} /></section>
    <section id="companies" className="section container"><div className="section-heading"><div><h2>وجهات الناس المفضلة</h2><p>من دمشق لكل مكان بتحبه</p></div><button className="quiet-button" onClick={() => navigate('results')}>شوف كل الرحلات <ArrowLeft size={15} /></button></div><div className="destination-grid">{cityOptions.slice(0, 4).map((city, index) => <button key={city} className="destination" onClick={() => { setTo(city); navigate('results') }}><img src={`/assets/city-${['damascus', 'aleppo', 'homs', 'latakia'][index]}.svg`} alt="" /><span><b>{city}</b></span><ChevronLeft size={17} /></button>)}</div></section>
    <section className="feature-strip"><div className="container feature-grid"><div><div className="eyebrow">كل شي بمكان واحد</div><h2>خطوتك الجاية<br /><span>أسهل مما بتتخيل.</span></h2><p>قارن المواعيد والأسعار، اختار مقعدك، وخلي سيرنا يهتم بالباقي.</p><button className="btn btn-primary" onClick={() => navigate('results')}>بلّش حجزك <ArrowLeft size={16} /></button></div><div className="mini-route"><span><MapPin size={18} /> دمشق</span><div><i /><BusFront size={22} /><i /></div><span><MapPin size={18} /> حلب</span><small>رحلة مريحة، بخطوات قليلة</small></div></div></section>
  </>
}
