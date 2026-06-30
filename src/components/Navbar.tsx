import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contact, navItems } from "../data/site";
import { NavbarSocials } from "./SocialIcons";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const isHomePage = location.pathname === "/";
  const useLightText = isHomePage && !scrolled;

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    if (useLightText) {
      return `rounded-lg px-3 py-2 text-sm font-bold transition-all duration-300 focus-ring ${
        isActive ? "bg-white text-brand-blue shadow-sm" : "text-white hover:bg-white/15 hover:text-white"
      }`;
    }
    return `rounded-lg px-3 py-2 text-sm font-bold transition-all duration-300 focus-ring ${
      isActive ? "bg-brand-blue text-white shadow-sm" : "text-slate-700 hover:bg-blue-50 hover:text-brand-blue"
    }`;
  };

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2.5 text-sm font-bold transition-all duration-300 focus-ring ${
      isActive ? "bg-brand-blue text-white" : "text-slate-700 hover:bg-blue-50 hover:text-brand-blue"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/60 bg-white/90 shadow-sm backdrop-blur-xl"
          : isHomePage
          ? "bg-black/10 backdrop-blur-sm"
          : "bg-white/40 backdrop-blur-md"
      }`}
    >
      <nav className="site-container flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3 rounded-lg focus-ring" aria-label="Nepal Home Tuition Center home">
          <img src="/logo.jpg" alt="Nepal Home Tuition Center Logo" className="h-11 w-11 rounded-lg object-cover shadow-glow" />
          <span className="leading-tight">
            <span className={`block font-heading text-base font-extrabold sm:text-lg transition-colors duration-300 ${useLightText ? "text-white" : "text-slate-950"}`}>
              Nepal Home
            </span>
            <span className="block text-xs font-bold text-brand-orange sm:text-sm">Tuition Center</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1.5 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3.5 lg:flex">
          <NavbarSocials light={useLightText} />
          <a
            href={`tel:${contact.phoneHref}`}
            className="ripple-button inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-orange-500 focus-ring"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className={`grid h-11 w-11 place-items-center rounded-lg border shadow-sm transition duration-300 focus-ring lg:hidden ${
            useLightText
              ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
              : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
          }`}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white/98 shadow-soft backdrop-blur-xl lg:hidden">
          <div className="site-container grid gap-2 py-4">
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href} className={mobileLinkClass}>
                {item.label}
              </NavLink>
            ))}
            <a
              href={`tel:${contact.phoneHref}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-3 text-sm font-bold text-white focus-ring"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
