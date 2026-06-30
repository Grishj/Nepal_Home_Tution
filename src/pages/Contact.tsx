import { Clock, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { contact } from "../data/site";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

export default function Contact() {
  return (
    <>
      <section className="section-surface pt-32 pb-20">
        <div className="site-container">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-bold uppercase text-brand-orange">Contact</p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Looking for Home Tuition? Call us today.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Parents can call or message directly. Tutors can apply through the online form and notify the team through
              WhatsApp after submission.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${contact.phoneHref}`}
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-soft transition hover:-translate-y-1 focus-ring"
                aria-label="Call Us"
              >
                <FaPhone className="h-5 w-5" />
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
                  Call Now
                </span>
              </a>
              <a
                href={createGeneralWhatsAppUrl("Hello Nepal Home Tuition Center, I am looking for home tuition.")}
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-success text-white shadow-soft transition hover:-translate-y-1 focus-ring"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
                  WhatsApp
                </span>
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#1877F2] bg-white text-[#1877F2] shadow-soft transition hover:-translate-y-1 hover:bg-[#1877F2] hover:text-white focus-ring"
                aria-label="Facebook"
              >
                <FaFacebook className="h-6 w-6" />
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
                  Facebook
                </span>
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#E1306C] bg-white text-[#E1306C] shadow-soft transition hover:-translate-y-1 hover:bg-[#E1306C] hover:text-white focus-ring"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
                  Instagram
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Phone Number", value: contact.phone, href: `tel:${contact.phoneHref}`, icon: FaPhone },
            {
              label: "WhatsApp",
              value: "Message us",
              href: createGeneralWhatsAppUrl("Hello Nepal Home Tuition Center, I need assistance."),
              icon: FaWhatsapp,
            },
            { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: FaEnvelope },
            { label: "Facebook", value: "Open page", href: contact.facebook, icon: FaFacebook },
            { label: "Instagram", value: "Follow us", href: contact.instagram, icon: FaInstagram },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={index * 0.05} className="card-hover rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand-blue">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-lg font-bold text-slate-950">{item.label}</h2>
                <a className="mt-3 block break-words font-semibold text-slate-600 transition hover:text-brand-blue focus-ring" href={item.href} target={item.label !== "Phone Number" && item.label !== "Email" ? "_blank" : undefined} rel="noopener noreferrer">
                  {item.value}
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-surface py-20">
        <div className="site-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="rounded-lg border border-white bg-white p-7 shadow-sm">
            <SectionHeader align="left" title="Office Details" />
            <div className="mt-8 grid gap-5">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 text-brand-orange" />
                <div>
                  <h2 className="font-heading font-bold text-slate-950">Office Address</h2>
                  <p className="mt-1 text-slate-600">{contact.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 text-brand-blue" />
                <div>
                  <h2 className="font-heading font-bold text-slate-950">Working Hours</h2>
                  <p className="mt-1 text-slate-600">{contact.workingHours}</p>
                </div>
              </div>
            </div>
            <Link
              to="/become-tutor"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-4 font-extrabold text-white shadow-soft transition hover:-translate-y-1 focus-ring"
            >
              Become a Tutor
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-lg border border-white bg-white shadow-soft">
            <iframe
              title="Nepal Home Tuition Center map"
              src={contact.mapsEmbed}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
