import { BusFront, ChevronLeft, Snowflake, Star, Plug, Wifi } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCompanies } from '../hooks/useCompanies'
import type { Company } from '../types/data'

const demoCompanies: Company[] = [
  { id: 'sham', name: 'الشام للنقل', rating: '4.9', tag: 'الأعلى تقييماً', features: ['مكيّف', 'Wi-Fi', 'شحن USB'], about: 'رحلات منتظمة بين المحافظات وتجربة سفر مريحة.' },
  { id: 'furat', name: 'الفرات للسياحة', rating: '4.8', tag: 'الأكثر حجزاً', features: ['مكيّف', 'مقاعد واسعة'], about: 'أسطول حديث ومواعيد متنوعة على مدار الأسبوع.' },
  { id: 'nawras', name: 'النورس إكسبرس', rating: '4.7', tag: 'سعر مميّز', features: ['مكيّف', 'Wi-Fi'], about: 'رحلات يومية وخيارات مناسبة لكل المسافرين.' },
  { id: 'ittihad', name: 'الاتحاد للنقل', rating: '4.6', tag: 'مواعيد مرنة', features: ['مكيّف', 'شحن USB'], about: 'ربط المدن السورية بمواعيد مرنة وسهلة الحجز.' },
]

function serviceIcon(feature: string) {
  if (feature === 'Wi-Fi') return <Wifi size={13} />
  if (feature === 'مكيّف') return <Snowflake size={13} />
  return <Plug size={13} />
}

function CompanyLogo({ company, size = 'large' }: { company: Company; size?: 'large' | 'tiny' }) {
  return <span className={`company-logo ${size}`} style={{ background: company.logoUrl ? 'var(--surface-alt)' : '#e7f9f6', color: '#109d9c' }}>{company.logoUrl ? <img src={company.logoUrl} alt="" /> : company.name.slice(0, 1)}</span>
}

function CompanyCard({ company, onRoutes }: { company: Company; onRoutes: () => void }) {
  const features = company.features ?? ['مكيّف', 'Wi-Fi']
  return <article className="company-card"><div className="company-card-head"><CompanyLogo company={company} /><span className="tag teal-tag"><Star size={14} fill="currentColor" /> {company.rating ?? '4.8'} / 5</span></div><h2>{company.name}</h2><p>{company.about ?? 'رحلات منتظمة بين المحافظات وتجربة سفر مريحة.'}</p><div className="company-amenities">{features.map((feature) => <span className="service-pill" key={feature}>{serviceIcon(feature)} {feature}</span>)}</div><div className="company-meta"><div><b>+12</b><small>وجهة تجريبية</small></div><div><b>يومياً</b><small>مواعيد متاحة</small></div></div><button className="btn btn-outline full" onClick={onRoutes}>عرض رحلات الشركة <ChevronLeft size={17} /></button></article>
}

export function Companies() {
  const routerNavigate = useNavigate()
  const { companies: apiCompanies, loading, error, retry } = useCompanies()
  const companies = apiCompanies.length ? apiCompanies.map((company, index) => ({ ...demoCompanies[index % demoCompanies.length], ...company })) : demoCompanies
  return <div className="inner-main"><section className="page-banner"><div className="container"><div className="breadcrumb"><Link to="/">الرئيسية</Link><ChevronLeft size={14} /><span>شركات النقل</span></div><span className="eyebrow"><BusFront size={14} /> شركاء الطريق</span><h1 className="page-title">شركات بتوصلك <span>لوين ما بدك.</span></h1><p>تعرّف على شركات النقل الموجودة في النموذج واختار الأنسب إلك.</p></div></section><section className="container section">{loading && <p className="api-state">جاري تحميل شركات النقل…</p>}{error && <div className="api-state error-state">تعذر تحميل الشركات. <button onClick={() => void retry()}>إعادة المحاولة</button></div>}{!loading && <><div className="companies-grid">{companies.map((company) => <CompanyCard key={company.id} company={company} onRoutes={() => routerNavigate(`/results?company=${encodeURIComponent(String(company.id))}`)} />)}</div><p className="disclaimer-line">ملاحظة: أسماء الشركات وتقييماتها وأوقات الرحلات المعروضة بيانات توضيحية ضمن مشروع التدريب.</p></>}</section></div>
}
