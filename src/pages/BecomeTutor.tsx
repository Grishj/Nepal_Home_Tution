import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, FileText, Loader2, Send, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { UploadCV } from "../components/UploadCV";
import { classOptions, contact, languageOptions, tutorSubjectOptions } from "../data/site";
import { createTutorWhatsAppUrl } from "../utils/whatsapp";

const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

const tutorApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number."),
  whatsappNumber: z.string().trim().regex(phoneRegex, "Enter a valid WhatsApp number."),
  email: z.union([z.string().trim().email("Enter a valid email."), z.literal("")]).optional(),
  gender: z.string().trim().min(1, "Select gender."),
  age: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce
      .number({ required_error: "Age is required.", invalid_type_error: "Enter age as a number." })
      .min(16, "Age must be at least 16.")
      .max(80, "Enter a valid age.")
  ),
  address: z.string().trim().min(3, "Address is required."),
  district: z.string().trim().min(2, "District is required."),
  highestQualification: z.string().trim().min(2, "Highest qualification is required."),
  collegeUniversity: z.string().trim().min(2, "College or university is required."),
  teachingExperience: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce
      .number({ required_error: "Teaching experience is required.", invalid_type_error: "Teaching experience must be a number." })
      .min(0, "Experience cannot be negative.")
  ),
  subjects: z.array(z.string()).min(1, "Select at least one subject."),
  classes: z.array(z.string()).min(1, "Select at least one class level."),
  preferredTeachingArea: z.string().trim().min(2, "Preferred teaching area is required."),
  teachingMode: z.enum(["Home", "Online", "Both"], { required_error: "Select teaching mode." }),
  availableTime: z.string().trim().min(2, "Available time is required."),
  expectedMonthlySalary: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce
      .number({ required_error: "Expected monthly salary is required.", invalid_type_error: "Expected monthly salary must be a number." })
      .positive("Salary must be a positive number.")
  ),
  languagesKnown: z.array(z.string()).min(1, "Select at least one language."),
  shortIntroduction: z.string().trim().min(20, "Write at least 20 characters."),
  cv: z
    .any()
    .refine((file) => file instanceof File, "CV is required.")
    .refine((file) => !(file instanceof File) || file.size <= 5 * 1024 * 1024, "CV must be under 5MB.")
    .refine(
      (file) =>
        !(file instanceof File) ||
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type) ||
        file.name.toLowerCase().endsWith(".pdf") ||
        file.name.toLowerCase().endsWith(".doc") ||
        file.name.toLowerCase().endsWith(".docx"),
      "Only PDF, DOC, and DOCX formats are supported."
    ),
  agreePolicy: z.boolean().refine((value) => value, "You must agree with the commission policy."),
});

export type TutorApplicationValues = z.infer<typeof tutorApplicationSchema>;

const inputFields = [
  { name: "fullName", label: "Full Name *", placeholder: "Your full name" },
  { name: "phone", label: "Phone *", placeholder: "+977 98XXXXXXXX" },
  { name: "whatsappNumber", label: "WhatsApp Number *", placeholder: "+977 98XXXXXXXX" },
  { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { name: "age", label: "Age *", placeholder: "24", type: "number" },
  { name: "address", label: "Address *", placeholder: "Current address" },
  { name: "district", label: "District *", placeholder: "Kathmandu" },
  { name: "highestQualification", label: "Highest Qualification *", placeholder: "Bachelor running / completed" },
  { name: "collegeUniversity", label: "College / University *", placeholder: "College or university name" },
  { name: "teachingExperience", label: "Teaching Experience (Years) *", placeholder: "e.g. 2", type: "number" },
  { name: "preferredTeachingArea", label: "Preferred Teaching Area *", placeholder: "Baneshwor, Lalitpur, Online..." },
  { name: "availableTime", label: "Available Time *", placeholder: "Morning / Evening / Weekends" },
  { name: "expectedMonthlySalary", label: "Expected Monthly Salary (Rs.) *", placeholder: "e.g. 15000", type: "number" },
] as const;

const ErrorText = ({ message }: { message?: string }) => (message ? <p className="field-error">{message}</p> : null);

export default function BecomeTutor() {
  const submittedRef = useRef(false);
  const whatsappTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TutorApplicationValues>({
    resolver: zodResolver(tutorApplicationSchema),
    defaultValues: {
      subjects: [],
      classes: [],
      languagesKnown: [],
      teachingMode: "Both",
      email: "",
      agreePolicy: false,
      cv: null as any,
    },
  });

  const [submitState, setSubmitState] = useState<"idle" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    return () => {
      if (whatsappTimerRef.current) clearTimeout(whatsappTimerRef.current);
    };
  }, []);

  const onSubmit: SubmitHandler<TutorApplicationValues> = async (values) => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    setSubmitState("idle");
    setSubmitMessage("");

    const formEl = formRef.current;
    if (!formEl) {
      submittedRef.current = false;
      return;
    }

    // Remove any previously injected hidden fields
    formEl.querySelectorAll(".fs-hiddens").forEach((el) => el.remove());

    const addHidden = (name: string, value: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      input.className = "fs-hiddens";
      formEl.appendChild(input);
    };

    addHidden("_subject", "New Tutor Application - Nepal Home Tuition Center");
    addHidden("_captcha", "false");

    // Structured fields that aren't standard form inputs
    addHidden("Email", values.email || "Not provided");
    addHidden("Age", String(values.age));
    addHidden("Teaching Experience", `${values.teachingExperience} years`);
    addHidden("Subjects", values.subjects.join(", "));
    addHidden("Classes", values.classes.join(", "));
    addHidden("Expected Salary", `Rs. ${values.expectedMonthlySalary}`);
    addHidden("Languages", values.languagesKnown.join(", "));
    addHidden("Commission Policy", values.agreePolicy ? "Agreed" : "Not agreed");

    // Set form to submit natively to FormSubmit via hidden iframe
    formEl.action = `https://formsubmit.co/${encodeURIComponent(contact.formEmail)}`;
    formEl.target = "formsubmit-frame";

    // Listen for iframe load as confirmation of submission
    const iframe = iframeRef.current;
    const onIframeLoad = () => {
      iframe?.removeEventListener("load", onIframeLoad);
      setShowSuccess(true);

      whatsappTimerRef.current = setTimeout(() => {
        const url = createTutorWhatsAppUrl({
          fullName: values.fullName,
          phone: values.phone,
          highestQualification: values.highestQualification,
          subjects: values.subjects,
          teachingExperience: values.teachingExperience,
        });
        window.open(url, "_blank", "noopener,noreferrer");
      }, 2000);
    };
    iframe?.addEventListener("load", onIframeLoad);

    // Submit natively — the file input is already inside the form in the DOM
    formEl.submit();
  };

  return (
    <>
      <section className="section-surface pt-32 pb-20">
        <div className="site-container">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-bold uppercase text-brand-orange">Become a Tutor</p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Apply to teach with Nepal Home Tuition Center.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Submit your tutor profile, agree with the transparent commission policy, and notify the team instantly on
              WhatsApp after your application is delivered.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="site-container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-brand-blue">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-xl font-bold text-slate-950">Before You Apply</h2>
              <ul className="mt-5 grid gap-4 text-sm leading-7 text-slate-700">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-success" />
                  Fill accurate contact, qualification, subject, and area details.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-success" />
                  Read the one-time commission policy before submitting.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-success" />
                  After success, WhatsApp opens with your application summary ready to send.
                </li>
              </ul>
              <Link
                to="/commission"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-brand-blue bg-white px-5 py-3 font-extrabold text-brand-blue transition hover:bg-blue-50 focus-ring"
              >
                View Commission Policy
              </Link>
            </Reveal>
          </aside>

          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft sm:p-7">
            {submitState === "error" ? (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-5 text-red-800" role="alert">
                <div className="flex gap-3">
                  <AlertCircle className="mt-1 h-6 w-6 shrink-0" />
                  <div>
                    <h2 className="font-heading text-lg font-extrabold">Submission Error</h2>
                    <p className="mt-2 leading-7">{submitMessage}</p>
                  </div>
                </div>
              </div>
            ) : null}

            <form ref={formRef} method="POST" className="grid gap-8" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <div>
                <SectionHeader align="left" title="Tutor Details" description="Tell us who you are and where you can teach." />
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {inputFields.map((field) => (
                    <div key={field.name}>
                      <label className="form-label" htmlFor={field.name}>
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        type={"type" in field ? field.type : "text"}
                        className="form-field"
                        placeholder={field.placeholder}
                        aria-invalid={Boolean(errors[field.name as keyof TutorApplicationValues])}
                        {...register(field.name as any)}
                      />
                      <ErrorText message={errors[field.name as keyof TutorApplicationValues]?.message?.toString()} />
                    </div>
                  ))}

                  <div>
                    <label className="form-label" htmlFor="gender">
                      Gender *
                    </label>
                    <select id="gender" className="form-field" aria-invalid={Boolean(errors.gender)} {...register("gender")}>
                      <option value="">Select gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <ErrorText message={errors.gender?.message} />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="teachingMode">
                      Teaching Mode *
                    </label>
                    <select
                      id="teachingMode"
                      className="form-field"
                      aria-invalid={Boolean(errors.teachingMode)}
                      {...register("teachingMode")}
                    >
                      <option value="Home">Home</option>
                      <option value="Online">Online</option>
                      <option value="Both">Both</option>
                    </select>
                    <ErrorText message={errors.teachingMode?.message} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-extrabold text-slate-950">Subjects *</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Select every subject you are comfortable teaching.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {tutorSubjectOptions.map((subject) => (
                    <label
                      key={subject}
                      className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-blue hover:bg-blue-50"
                    >
                      <input type="checkbox" value={subject} className="h-4 w-4 accent-brand-blue" {...register("subjects")} />
                      {subject}
                    </label>
                  ))}
                </div>
                <ErrorText message={errors.subjects?.message} />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-extrabold text-slate-950">Classes You Can Teach *</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {classOptions.map((classLevel) => (
                    <label
                      key={classLevel}
                      className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-blue hover:bg-blue-50"
                    >
                      <input type="checkbox" value={classLevel} className="h-4 w-4 accent-brand-blue" {...register("classes")} />
                      {classLevel}
                    </label>
                  ))}
                </div>
                <ErrorText message={errors.classes?.message} />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-extrabold text-slate-950">Languages Known *</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {languageOptions.map((language) => (
                    <label
                      key={language}
                      className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-blue hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        value={language}
                        className="h-4 w-4 accent-brand-blue"
                        {...register("languagesKnown")}
                      />
                      {language}
                    </label>
                  ))}
                </div>
                <ErrorText message={errors.languagesKnown?.message} />
              </div>

              <div>
                <label className="form-label" htmlFor="shortIntroduction">
                  Short Introduction *
                </label>
                <textarea
                  id="shortIntroduction"
                  rows={5}
                  className="form-field resize-y"
                  placeholder="Introduce yourself, your teaching style, and the type of students you prefer to teach."
                  aria-invalid={Boolean(errors.shortIntroduction)}
                  {...register("shortIntroduction")}
                />
                <ErrorText message={errors.shortIntroduction?.message} />
              </div>

              <div>
                <label className="form-label">
                  Upload CV *
                </label>
                <UploadCV control={control as any} name="cv" error={errors.cv?.message?.toString()} />
              </div>

              <div>
                <label className="flex cursor-pointer gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                  <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-brand-blue" {...register("agreePolicy")} />
                  <span>
                    I agree with the{" "}
                    <Link to="/commission" className="font-bold text-brand-blue underline underline-offset-4">
                      commission policy
                    </Link>
                    .
                  </span>
                </label>
                <ErrorText message={errors.agreePolicy?.message} />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || submittedRef.current}
                  className="ripple-button inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-brand-blue px-7 py-4 text-base font-extrabold text-white shadow-soft transition hover:-translate-y-1 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 focus-ring"
                >
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </button>

                {isSubmitting && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-brand-blue">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting your application...</span>
                  </div>
                )}
              </div>
            </form>
            <iframe
              ref={iframeRef}
              name="formsubmit-frame"
              className="hidden"
              title="Form submission target"
            />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => {
                  setShowSuccess(false);
                  if (whatsappTimerRef.current) clearTimeout(whatsappTimerRef.current);
                }}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-ring"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-brand-success"
              >
                <CheckCircle2 className="h-12 w-12" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 font-heading text-2xl font-extrabold text-slate-900"
              >
                Application Submitted Successfully
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600"
              >
                <p>Your application and CV have been sent successfully.</p>
                <p>Our team will contact you soon.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-brand-blue">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
                  </span>
                  Opening WhatsApp in 2 seconds...
                </div>
                <a
                  href={createTutorWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-success px-5 py-3 font-extrabold text-white shadow-soft transition hover:bg-green-500 focus-ring"
                >
                  <MessageCircle className="h-5 w-5" />
                  Open WhatsApp Manually
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
