import {
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  WalletCards,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

const faqs = [
  {
    question: "When do I pay?",
    answer:
      "Tutors pay the one-time commission only after a tuition is confirmed according to the agreed process. The team will communicate details clearly before you begin.",
  },
  {
    question: "Do I pay before getting students?",
    answer:
      "No. There is no advance monthly deduction just for applying. Commission is connected to an actual tuition opportunity.",
  },
  {
    question: "Can I refuse a tuition?",
    answer:
      "Yes. Tutors can refuse a tuition if the subject, location, timing, salary, or teaching mode does not fit their preference.",
  },
  {
    question: "What if tuition is cancelled?",
    answer:
      "If a tuition is cancelled early, contact the team immediately so the situation can be reviewed fairly based on the actual case.",
  },
];

export default function Commission() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="section-surface pt-32 pb-20">
        <div className="site-container">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-bold uppercase text-brand-orange">
              Commission Policy
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Simple, one-time commission. No hidden deductions.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Tutors should understand the policy before applying. Nepal Home
              Tuition Center keeps the process transparent so teachers know
              exactly what they are agreeing to.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-lg border border-slate-100 bg-white p-7 shadow-sm">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand-blue">
              <WalletCards className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950">
              Home Tuition
            </h2>
            <p className="mt-4 leading-8 text-slate-700">
              Tutor pays only <strong>ONE TIME commission</strong>, equal to{" "}
              <strong>25% of the total monthly income</strong> from the tuition.
            </p>
            <div className="mt-6 rounded-lg bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">Example</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">
                    Monthly Salary
                  </p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-950">
                    Rs. 10,000
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">
                    Commission (25%)
                  </p>
                  <p className="mt-2 text-2xl font-extrabold text-brand-orange">
                    Rs. 2,500
                  </p>
                </div>
              </div>
              <p className="mt-5 leading-7 text-slate-700">
                After that, the tutor receives future payments directly from
                parents.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-lg border border-slate-100 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-orange-50 text-brand-orange">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950">
              Language Tutors
            </h2>
            <p className="mt-4 leading-8 text-slate-700">
              Language tutors also follow a one-time commission of{" "}
              <strong>25% of the total monthly income</strong>. The exact amount
              is calculated based on the course type, duration, and agreed
              tuition fee.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Japanese Language",
                "IELTS Preparation",
                "Spoken English",
                "Other language classes",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg bg-slate-50 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-success" />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-surface py-20">
        <div className="site-container">
          <SectionHeader
            eyebrow="Important Notes"
            title="Transparent process for every tutor"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              "No hidden fees.",
              "No monthly deductions.",
              "No yearly charges.",
              "Transparent process.",
            ].map((note, index) => (
              <Reveal
                key={note}
                delay={index * 0.05}
                className="flex items-center gap-4 rounded-lg border border-white bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-success" />
                <p className="font-heading text-lg font-bold text-slate-950">
                  {note}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 rounded-lg border border-red-100 bg-red-50 p-5 text-red-800">
            <div className="flex gap-3">
              <XCircle className="mt-1 h-5 w-5 shrink-0" />
              <p className="leading-7">
                Tutors should read this policy before submitting the application
                form. Applying means you agree with the commission policy shown
                here.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container">
          <SectionHeader eyebrow="FAQ" title="Common tutor questions" />
          <div className="mx-auto mt-12 grid max-w-3xl gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <Reveal
                  key={faq.question}
                  delay={index * 0.04}
                  className="rounded-lg border border-slate-100 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-ring"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 font-heading text-lg font-bold text-slate-950">
                      <HelpCircle className="h-5 w-5 text-brand-blue" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <p className="border-t border-slate-100 px-5 py-5 leading-8 text-slate-600">
                      {faq.answer}
                    </p>
                  ) : null}
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              to="/become-tutor"
              className="ripple-button inline-flex items-center justify-center rounded-lg bg-brand-blue px-7 py-4 font-extrabold text-white shadow-soft transition hover:-translate-y-1 focus-ring"
            >
              Apply as Tutor
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
