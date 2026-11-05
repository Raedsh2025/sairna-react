function Footer() {
return ( <footer className="footer"> <div className="container footer-main">

    {/* Brand */}
    <div className="footer-brand">
      <a href="#home" className="brand" aria-label="سيرنا - الرئيسية">
        <span className="brand-icon">
          <img src="/assets/logo.svg" alt="" />
        </span>

        <span className="brand-text">
          <strong>
            سيرنا<span className="brand-dot">.</span>
          </strong>
          <small>رحلتك بتبلّش من هون</small>
        </span>
      </a>

      <p>
        طريقة أجمل وأسهل للسفر بين المحافظات السورية.
        ابحث، اختار، واحجز بكل راحة.
      </p>

      <div className="footer-social">
        <span>◎</span>
        <span>✉</span>
        <span>☎</span>
      </div>
    </div>

    {/* Explore */}
    <div className="footer-col">
      <h4>استكشف</h4>
      <a href="#home">الرئيسية</a>
      <a href="#results">احجز رحلتك</a>
      <a href="#companies">شركات النقل</a>
      <a href="#tracking">تتبّع رحلتك</a>
    </div>

    {/* Account */}
    <div className="footer-col">
      <h4>حسابك</h4>
      <a href="#login">تسجيل الدخول</a>
      <a href="#register">إنشاء حساب</a>
      <a href="#trips">حجوزاتي</a>
      <a href="#account">الملف الشخصي</a>
    </div>

    {/* Contact */}
    <div className="footer-col">
      <h4>نحن هون لمساعدتك</h4>
      <a href="#about">عن سيرنا</a>
      <a href="#support">مركز المساعدة</a>

      <div className="footer-contact">
        ✉ hello@sairna.example
      </div>
    </div>
  </div>

  {/* Bottom */}
  <div className="container footer-bottom">
    <span>
      © 2026 سيرنا — نموذج تعليمي لتصميم الواجهات،
      ليس خدمة حجوزات فعلية.
    </span>

    <span>
      صُمّم بحب لسوريا <span className="heart">♥</span>
    </span>
  </div>
</footer>


);
}

export default Footer;
