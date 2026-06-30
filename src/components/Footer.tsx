import { Mail, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { contact, navItems, services, subjects } from "../data/site";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";
import { FooterSocials } from "./SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  const serviceLinks = services.slice(0, 6);
  const subjectLinks = subjects.slice(0, 8);

  return (
    <footer className="bg-slate-950 text-white">
      <div className="site-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 rounded-lg focus-ring" aria-label="Nepal Home Tuition Center home">
            <img src="/logo.jpg" alt="Nepal Home Tuition Center Logo" className="h-11 w-11 rounded-lg object-cover" />
            <span>
              <span className="block font-heading text-lg font-extrabold">Nepal Home</span>
              <span className="block text-sm font-bold text-brand-orange">Tuition Center</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-7 text-slate-300">
            A focused home tuition and tutor recruitment brand connecting families with qualified teachers across Nepal.
          </p>
          <div className="mt-6">
            <FooterSocials />
          </div>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold">Quick Links</h2>
          <ul className="mt-5 grid gap-3 text-sm text-slate-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-white focus-ring" to={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a className="transition hover:text-white focus-ring" href="#">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold">Services</h2>
          <ul className="mt-5 grid gap-3 text-sm text-slate-300">
            {serviceLinks.map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-lg font-bold">Contact</h2>
          <ul className="mt-5 grid gap-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-brand-orange" />
              <a className="transition hover:text-white focus-ring" href={`tel:${contact.phoneHref}`}>
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 text-brand-success" />
              <a
                className="transition hover:text-white focus-ring"
                href={createGeneralWhatsAppUrl("Hello Nepal Home Tuition Center, I need assistance.")}
              >
                WhatsApp
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-brand-blue" />
              <a className="break-all transition hover:text-white focus-ring" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {subjectLinks.map((subject) => (
              <span key={subject} className="rounded-lg bg-white/8 px-3 py-1.5 text-xs font-semibold text-slate-300">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="site-container flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {year} Nepal Home Tuition Center. All rights reserved.</p>
          <p>Premium home tuition service in Nepal.</p>
        </div>
      </div>
    </footer>
  );
}
