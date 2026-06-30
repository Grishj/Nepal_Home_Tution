import { CheckCircle2, Eye, Flag, Users } from "lucide-react";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { stats, visuals } from "../data/site";

export default function About() {
  return (
    <>
      <section className="section-surface pt-32 pb-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase text-brand-orange">About Us</p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              A focused tuition center built on trust and clear matching.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Nepal Home Tuition Center helps parents find suitable tutors for home tuition, online classes, exam
              preparation, language learning, and skill-based courses across Nepal.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="overflow-hidden rounded-lg shadow-soft">
            <img src={visuals.about} alt="Students learning together" className="h-full min-h-80 w-full object-cover" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container">
          <SectionHeader
            title="Who We Are"
            description="We are not a complicated platform. We are a practical bridge between families who need trusted teaching support and tutors who want fair opportunities."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Mission",
                icon: Flag,
                text: "To make quality home tuition accessible, transparent, and reliable for families across Nepal.",
              },
              {
                title: "Vision",
                icon: Eye,
                text: "To become Nepal's most trusted tutor matching brand for academic, language, and skill-based learning.",
              },
              {
                title: "Our Promise",
                icon: CheckCircle2,
                text: "Clear communication, verified tutors, transparent commission, and responsive support from first contact.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.06} className="card-hover rounded-lg border border-slate-100 bg-white p-7 shadow-sm">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-4 leading-8 text-slate-600">{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-surface py-20">
        <div className="site-container">
          <SectionHeader eyebrow="Statistics" title="A growing network of learners and tutors" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon || Users;
              return (
                <Reveal key={stat.label} delay={index * 0.05} className="rounded-lg border border-white bg-white p-7 text-center shadow-sm">
                  <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-lg bg-orange-50 text-brand-orange">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="font-heading text-4xl font-extrabold text-slate-950">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 font-bold text-slate-600">{stat.label}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
