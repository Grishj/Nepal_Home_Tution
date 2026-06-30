import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { contact, howItWorks, services, subjectIcons, subjects, testimonials, visuals, whyChooseUs } from "../data/site";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

const heroIcons = [
  { icon: BookOpen, label: "Books", className: "left-[7%] top-[24%] bg-white/90 text-brand-blue" },
  { icon: Calculator, label: "Math", className: "bottom-[20%] right-[13%] bg-brand-orange text-white" },
  { icon: GraduationCap, label: "Graduate", className: "right-[24%] top-[18%] bg-white/90 text-brand-success" },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden pt-24 text-white">
        <img
          src={visuals.hero}
          alt="Teacher helping students during a lesson"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="hero-mask absolute inset-0 -z-10" />

        {heroIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              className={`absolute hidden h-14 w-14 place-items-center rounded-lg shadow-soft md:grid ${item.className}`}
              initial={{ opacity: 0, scale: 0.8, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{ delay: 0.45 + index * 0.18, duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <Icon className="h-7 w-7" />
            </motion.div>
          );
        })}

        <div className="site-container py-20 sm:py-24">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-brand-orange" />
              Premium tutor matching across Nepal
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              नेपालभर भरपर्दो Home Tuition Service
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
              We connect qualified tutors with students across Nepal.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="ripple-button inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-4 text-base font-extrabold text-white shadow-soft transition hover:-translate-y-1 hover:bg-orange-500 focus-ring"
              >
                Find Tutor
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/become-tutor"
                className="ripple-button inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/12 px-6 py-4 text-base font-extrabold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20 focus-ring"
              >
                Become Tutor
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="site-container grid gap-3 sm:grid-cols-3">
          {["Verified teachers", "Fast matching", "Transparent commission"].map((item) => (
            <Reveal key={item} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3 shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-success" />
              <span className="text-sm font-bold text-slate-700">{item}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-surface py-20">
        <div className="site-container">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Reliable support for parents, students, and tutors"
            description="Nepal Home Tuition Center keeps the process simple: understand the learner, match the right teacher, and support both sides with clear communication."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.03} className="card-hover rounded-lg border border-white bg-white p-6 shadow-sm">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container">
          <SectionHeader
            eyebrow="Services"
            title="Tuition services for every learning goal"
            description="From school-level foundations to language and computer courses, we help families find tutors who match the student's exact needs."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.025} className="card-hover rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-orange-50 text-brand-orange">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-surface py-20">
        <div className="site-container">
          <SectionHeader
            eyebrow="Subjects"
            title="Beautifully matched tutors for core subjects"
            description="Parents can request tutors for school subjects, science, management, language, programming, and exam preparation."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {subjects.map((subject, index) => {
              const Icon = subjectIcons[index % subjectIcons.length];
              return (
                <Reveal
                  key={subject}
                  delay={index * 0.015}
                  className="card-hover flex min-h-24 items-center gap-4 rounded-lg border border-white bg-white p-4 shadow-sm"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-brand-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-slate-900">{subject}</h3>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container">
          <SectionHeader
            eyebrow="How It Works"
            title="A clear process from first call to regular classes"
            description="The matching process is simple, practical, and designed to help parents start tuition quickly with confidence."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {howItWorks.map((step, index) => (
              <Reveal key={step} delay={index * 0.06} className="relative rounded-lg border border-slate-100 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-lg bg-brand-blue text-lg font-extrabold text-white">
                  {index + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-950">{step}</h3>
                {index < howItWorks.length - 1 ? (
                  <ArrowDown className="mx-auto mt-5 h-5 w-5 text-brand-orange lg:absolute lg:-right-3 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:-rotate-90" />
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-surface py-20">
        <div className="site-container">
          <SectionHeader eyebrow="Testimonials" title="Trusted by families and teachers" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.label} delay={index * 0.07} className="card-hover rounded-lg border border-white bg-white p-6 shadow-sm">
                <p className="text-sm font-extrabold text-brand-blue">{testimonial.label}</p>
                <p className="mt-4 leading-8 text-slate-700">"{testimonial.quote}"</p>
                <p className="mt-5 font-bold text-slate-950">{testimonial.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container">
          <Reveal className="mesh-surface overflow-hidden rounded-lg border border-blue-100 p-8 shadow-soft sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-bold text-brand-orange">Need a Tutor? Become a Tutor?</p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
                  Start with one quick conversation.
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-slate-700">
                  Parents can request a tutor today. Tutors can apply online and notify the team instantly through WhatsApp.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="ripple-button inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-4 font-extrabold text-white shadow-soft transition hover:-translate-y-1 focus-ring"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <a
                  href={createGeneralWhatsAppUrl("Hello Nepal Home Tuition Center, I am looking for a home tutor.")}
                  className="ripple-button inline-flex items-center justify-center gap-2 rounded-lg bg-brand-success px-6 py-4 font-extrabold text-white shadow-soft transition hover:-translate-y-1 focus-ring"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
                <Link
                  to="/become-tutor"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-blue bg-white px-6 py-4 font-extrabold text-brand-blue transition hover:-translate-y-1 hover:bg-blue-50 focus-ring"
                >
                  Become Tutor
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
