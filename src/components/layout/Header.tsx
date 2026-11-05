import { useState } from "react";

const navLinks = [
{ id: "home", label: "الرئيسية" },
{ id: "results", label: "احجز رحلة" },
{ id: "companies", label: "شركات النقل" },
{ id: "trips", label: "حجوزاتي" },
{ id: "tracking", label: "تتبّع الرحلة" },
];

function Header() {
const [menuOpen, setMenuOpen] = useState(false);

const currentPage = window.location.hash.replace("#", "") || "home";

return ( <header className="site-header"> <div className="container header-inner">


    {/* Logo */}
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

    {/* Desktop Navigation */}
    <nav className="desktop-nav" aria-label="التنقل الرئيسي">
      {navLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`nav-link ${
            currentPage === link.id ||
            (link.id === "results" && currentPage === "booking")
              ? "active"
              : ""
          }`}
        >
          {link.label}
        </a>
      ))}
    </nav>

    {/* Header Actions */}
    <div className="header-actions">
      <button
        className="icon-button theme-switch"
        type="button"
        aria-label="تبديل المظهر"
        title="تبديل المظهر"
      >
        ☾
      </button>

      <a href="#login" className="login-link">
        دخول
      </a>

      <a href="#register" className="btn btn-dark btn-sm">
        إنشاء حساب ←
      </a>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="mobile-toggle icon-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="فتح القائمة"
      >
        {menuOpen ? "×" : "☰"}
      </button>
    </div>
  </div>

  {/* Mobile Navigation */}
  <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
    {navLinks.map((link) => (
      <a
        key={link.id}
        href={`#${link.id}`}
        className={`mobile-link ${
          currentPage === link.id ? "active" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
      </a>
    ))}

    <a href="#login" className="mobile-link">
      تسجيل الدخول
    </a>

    <a href="#register" className="mobile-link">
      إنشاء حساب
    </a>
  </div>
</header>


);
}

export default Header;
