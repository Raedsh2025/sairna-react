import { useState } from 'react'
import { ArrowLeft, LogOut, Menu, Moon, Sparkles, Sun, UserRound, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { View } from '../../types/data'
import { useAppStore } from '../../store/appStore'

export function SiteHeader({ view, dark, onTheme, navigate }: { view: View; dark: boolean; onTheme: () => void; navigate: (view: View) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const logout = useAppStore((state) => state.logout)
  const go = (next: View) => { setMenuOpen(false); navigate(next) }
  const signOut = () => { logout(); go('home') }
  return <><div className="announcement"><div className="container"><Sparkles size={14} /> احجز رحلتك بسهولة، وخلي الطريق علينا <span>تجربة تعليمية مجانية</span></div></div><header className="site-header"><div className="container header-inner"><Link className="brand" to="/" onClick={() => go('home')}><span className="brand-mark"><img src="/assets/logo.svg" alt="" /></span><span><strong>سيرنا<span>.</span></strong><small>رحلتك بتبلّش من هون</small></span></Link><nav className="desktop-nav"><Link className={view === 'home' ? 'active' : ''} to="/">الرئيسية</Link><Link className={view === 'results' || view === 'booking' ? 'active' : ''} to="/results">احجز رحلة</Link><Link className={view === 'companies' ? 'active' : ''} to="/companies">شركات النقل</Link><Link className={view === 'tracking' ? 'active' : ''} to="/tracking">تتبّع الرحلة</Link></nav><div className="header-actions"><button className="icon-btn" onClick={onTheme} aria-label="تبديل المظهر">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>{isAuthenticated ? <><span className="login-link user-greeting"><UserRound size={15} /> أهلاً بك</span><button className="btn btn-dark btn-sm" onClick={signOut}><LogOut size={15} /> خروج</button></> : <><Link className="login-link" to="/auth">دخول</Link><Link className="btn btn-dark btn-sm" to="/auth">إنشاء حساب <ArrowLeft size={15} /></Link></>}<button className="icon-btn mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen ? <X /> : <Menu />}</button></div></div>{menuOpen && <div className="mobile-menu"><Link to="/" onClick={() => go('home')}>الرئيسية</Link><Link to="/results" onClick={() => go('results')}>احجز رحلة</Link><Link to="/companies" onClick={() => go('companies')}>شركات النقل</Link><Link to="/tracking" onClick={() => go('tracking')}>تتبّع الرحلة</Link>{isAuthenticated ? <button onClick={signOut}><LogOut size={15} /> تسجيل الخروج</button> : <Link to="/auth" onClick={() => go('auth')}>تسجيل الدخول</Link>}</div>}</header></>
}
