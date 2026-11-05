import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import type { View } from '../types/data'

export function Auth({ notify, navigate }: { notify: (message: string) => void; navigate: (view: View) => void }) {
  const [register, setRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { submit: authenticateUser, loading, error } = useAuth()
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try { await authenticateUser({ email: String(form.get('email')), password: String(form.get('password')), name: register ? String(form.get('name')) : undefined }); notify(register ? 'تم إنشاء الحساب بنجاح' : 'تم تسجيل الدخول بنجاح'); navigate('home') } catch { return }
  }
  return <div className="auth-page"><div className="auth-visual"><img src="/assets/hero.svg" alt="" /><div><h2>سافر براحة،<br /><span>وخلي الباقي علينا.</span></h2><p>حساب واحد بيخليك تدير كل رحلاتك وحجوزاتك بسهولة.</p></div></div><div className="auth-form"><a className="brand" href="#home"><span className="brand-mark"><img src="/assets/logo.svg" alt="" /></span><span><strong>سيرنا<span>.</span></strong><small>رحلتك بتبلّش من هون</small></span></a><div className="auth-heading"><h1>{register ? 'أهلاً فيك معنا' : 'رجعت بالسلامة!'}</h1><p>{register ? 'أنشئ حسابك وبلّش أول رحلة.' : 'سجّل دخولك لتكمل رحلتك.'}</p></div><form onSubmit={submit}><label>البريد الإلكتروني<input name="email" type="email" placeholder="name@example.com" required /></label>{register && <label>الاسم الكامل<input name="name" placeholder="اكتب اسمك" required /></label>}<label>كلمة المرور<div className="password"><input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>{error && <p className="api-state error-state">{error}</p>}<button className="btn btn-primary full" type="submit" disabled={loading}>{loading ? 'جاري الإرسال…' : register ? 'إنشاء حساب' : 'تسجيل الدخول'} {!loading && <ArrowLeft size={16} />}</button></form><div className="auth-switch">{register ? 'عندك حساب؟' : 'لسا ما عندك حساب؟'} <button onClick={() => setRegister(!register)}>{register ? 'سجّل دخولك' : 'أنشئ حسابك'}</button></div><button className="back-home" onClick={() => navigate('admin-login')}>دخول الإدارة</button><button className="back-home" onClick={() => navigate('home')}>العودة للرئيسية</button></div></div>
}
