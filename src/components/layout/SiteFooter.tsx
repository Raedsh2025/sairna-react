import { Phone } from 'lucide-react'
import type { View } from '../../types/data'

export function SiteFooter({ navigate }: { navigate: (view: View) => void }) {
  return <footer className="footer"><div className="container footer-grid"><div><a className="brand" href="#home"><span className="brand-mark"><img src="/assets/logo.svg" alt="" /></span><span><strong>سيرنا<span>.</span></strong><small>رحلتك بتبلّش من هون</small></span></a><p>طريقة أجمل وأسهل للسفر بين المحافظات السورية. ابحث، اختار، واحجز بكل راحة.</p></div><div><h4>استكشف</h4><button onClick={() => navigate('home')}>الرئيسية</button><button onClick={() => navigate('results')}>احجز رحلتك</button><button onClick={() => navigate('tracking')}>تتبّع رحلتك</button></div><div><h4>نحن هون لمساعدتك</h4><button onClick={() => navigate('auth')}>حسابك</button><button onClick={() => window.alert('تواصل معنا عبر hello@sairna.example')}>تواصل معنا</button><span className="footer-contact"><Phone size={14} /> 0944 123 456</span></div></div><div className="container footer-bottom"><span>© 2026 سيرنا — نموذج تعليمي لتصميم الواجهات</span><span>صُمّم بحب لسوريا <b>♥</b></span></div></footer>
}
