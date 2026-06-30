import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { services, subjects, visuals } from "../data/site";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

export default function Services() {
  return (
    <>
      <section className="section-surface pt-32 pb-20">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase text-brand-orange">Services</p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Tuition support for school, college, languages, and skills.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Whether a student needs daily home tuition, online classes, exam preparation, or a specialized course, we
              help match the requirement with a suitable tutor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={createGeneralWhatsAppUrl("Hello Nepal Home Tuition Center, I want to request a tutor for my child.")}
                className="ripple-button inline-flex items-center justify-center gap-2 rounded-lg bg-brand-success px-6 py-4 font-extrabold text-white shadow-soft transition hover:-translate-y-1 focus-ring"
              >
                <MessageCircle className="h-5 w-5" />
                Request Tutor
              </a>
              <Link
                to="/become-tutor"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-blue bg-white px-6 py-4 font-extrabold text-brand-blue transition hover:-translate-y-1 hover:bg-blue-50 focus-ring"
              >
                Join as Tutor
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-lg shadow-soft">
            <img src={visuals.online} alt="Online learning setup" className="h-full min-h-80 w-full object-cover" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container">
          <SectionHeader
            title="Main Services"
            description="Each service can be arranged as home tuition, online tuition, or a blended schedule based on tutor availability and student need."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.035} className="card-hover rounded-lg border border-slate-100 bg-white p-7 shadow-sm">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-slate-950">{service.title}</h2>
                  <p className="mt-4 leading-8 text-slate-600">{service.text}</p>
                  <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700">
                    {["Qualified tutor matching", "Flexible timing", "Parent support"].map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-brand-success" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-surface py-20">
        <div className="site-container">
          <SectionHeader
            eyebrow="Subject Coverage"
            title="Popular subjects parents request"
            description="The tutor application form also lets teachers select the subjects and classes they are comfortable teaching."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {subjects.map((subject, index) => (
              <Reveal
                key={subject}
                delay={index * 0.01}
                className="rounded-lg border border-white bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm"
              >
                {subject}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
