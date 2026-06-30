import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { createTutorWhatsAppUrl } from "../utils/whatsapp";

export default function ApplySuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const submitted = location.state?.submitted;

  useEffect(() => {
    if (!submitted) {
      navigate("/become-tutor");
      return;
    }

    const timer = setTimeout(() => {
      const whatsappUrl = createTutorWhatsAppUrl();
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 2000);

    return () => clearTimeout(timer);
  }, [submitted, navigate]);

  if (!submitted) return null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-soft p-8 border border-slate-100 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 text-brand-success mb-6"
        >
          <CheckCircle2 className="h-12 w-12" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-extrabold text-slate-900 font-heading"
        >
          ✅ Application Submitted Successfully
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-4 text-slate-600 space-y-3 leading-relaxed"
        >
          <p className="text-sm">
            Your application and CV have been submitted successfully.
          </p>
          <p className="text-sm">
            Our team will contact you soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-6 border-t border-slate-100"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-brand-blue font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            Opening WhatsApp in 2 seconds...
          </div>

          <a
            href={createTutorWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-success px-5 py-3 font-extrabold text-white shadow-soft transition hover:bg-green-500 focus-ring"
          >
            <MessageCircle className="h-5 w-5" />
            Open WhatsApp Manually
          </a>
        </motion.div>
      </div>
    </section>
  );
}
