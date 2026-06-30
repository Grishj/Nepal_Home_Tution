import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { contact } from "../data/site";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

export function FloatingActions() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const actions = [
    {
      label: "WhatsApp",
      href: createGeneralWhatsAppUrl("Hello Nepal Home Tuition Center, I want to request a tutor."),
      icon: MessageCircle,
      className: "bg-brand-success hover:bg-green-500",
    },
    {
      label: "Call",
      href: `tel:${contact.phoneHref}`,
      icon: Phone,
      className: "bg-brand-orange hover:bg-orange-500",
    },
  ];

  return (
    <div className="fixed bottom-5 right-4 z-40 grid gap-3 sm:right-6">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <a
            key={action.label}
            href={action.href}
            className={`group relative grid h-12 w-12 place-items-center rounded-full text-white shadow-soft transition hover:-translate-y-1 focus-ring ${action.className}`}
            aria-label={action.label}
          >
            <Icon className="h-5 w-5" />
            <span className="pointer-events-none absolute right-14 rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
              {action.label}
            </span>
          </a>
        );
      })}

      <button
        type="button"
        onClick={scrollTop}
        className="group relative grid h-12 w-12 place-items-center rounded-full bg-slate-950 text-white shadow-soft transition hover:-translate-y-1 hover:bg-brand-blue focus-ring"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
        <span className="pointer-events-none absolute right-14 rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-soft transition group-hover:opacity-100">
          Top
        </span>
      </button>
    </div>
  );
}
