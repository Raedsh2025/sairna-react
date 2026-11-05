import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { dashboardLogin } from '../api/dashboard'
import type { View } from '../types/data'

export function AdminAuth({ notify, navigate }: { notify: (message: string) => void; navigate: (view: View) => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    try {
      await dashboardLogin(email, password)
      notify('تم تسجيل دخول الإدارة بنجاح')
      navigate('home')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'تعذر تسجيل دخول الإدارة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="/assets/hero.svg" alt="" />
        <div>
          <h2>لوحة الإدارة،<br /><span>تحت السيطرة.</span></h2>
          <p>إدارة الرحلات والحجوزات والمدن من مكان واحد.</p>
        </div>
      </div>

      <div className="auth-form">
        <a className="brand" href="#home">
          <span className="brand-mark"><img src="/assets/logo.svg" alt="" /></span>
          <span>
            <strong>سيرنا<span>.</span></strong>
            <small>دخول آمن للوحة الإدارة</small>
          </span>
        </a>

        <div className="auth-heading">
          <h1>دخول الإدارة</h1>
          <p>استخدم حساب Dashboard المصرح له فقط.</p>
        </div>

        <form onSubmit={submit}>
          <label>
            البريد الإلكتروني
            <input name="email" type="email" placeholder="admin@example.com" required />
          </label>

          <label>
            كلمة المرور
            <div className="password">
              <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          {error && <p className="api-state error-state">{error}</p>}

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'جاري التحقق…' : 'دخول لوحة الإدارة'}
            {!loading && <ArrowLeft size={16} />}
          </button>
        </form>

        <p className="secure"><ShieldCheck size={14} /> يتم إرسال البيانات إلى Dashboard API فقط</p>
        <button className="back-home" onClick={() => navigate('auth')}>العودة لدخول المستخدم</button>
      </div>
    </div>
  )
}
