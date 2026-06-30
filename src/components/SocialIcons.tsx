import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MessageCircle,
  Music,
} from "lucide-react";
import { contact } from "../data/site";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

// Custom TikTok icon SVG because lucide-react version doesn't export Tiktok
const Tiktok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    style={{ width: "100%", height: "100%", ...props.style }}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface SocialConfigItem {
  key: string;
  label: string;
  getHref: () => string;
  icon: React.ComponentType<any>;
  brandColor: string;
  brandText: string;
}

const platformConfig: SocialConfigItem[] = [
  {
    key: "phone",
    label: "Call Us",
    getHref: () => `tel:${contact.phoneHref}`,
    icon: Phone,
    brandColor: "hover:bg-brand-orange hover:text-white",
    brandText: "text-brand-orange",
  },
  {
    key: "whatsapp",
    label: "Message on WhatsApp",
    getHref: () => createGeneralWhatsAppUrl("Hello Nepal Home Tuition Center, I need assistance."),
    icon: MessageCircle,
    brandColor: "hover:bg-[#25D366] hover:text-white",
    brandText: "text-brand-success",
  },
  {
    key: "facebook",
    label: "Visit our Facebook Page",
    getHref: () => contact.facebook,
    icon: Facebook,
    brandColor: "hover:bg-[#1877F2] hover:text-white",
    brandText: "text-blue-600",
  },
  {
    key: "email",
    label: "Send us an Email",
    getHref: () => `mailto:${contact.email}`,
    icon: Mail,
    brandColor: "hover:bg-[#0B5ED7] hover:text-white",
    brandText: "text-brand-blue",
  },
  {
    key: "instagram",
    label: "Follow us on Instagram",
    getHref: () => contact.instagram,
    icon: Instagram,
    brandColor: "hover:bg-[#E1306C] hover:text-white",
    brandText: "text-pink-600",
  },
  {
    key: "tiktok",
    label: "Follow us on TikTok",
    getHref: () => contact.tiktok,
    icon: Tiktok || Music,
    brandColor: "hover:bg-black hover:text-white",
    brandText: "text-slate-900",
  },
  {
    key: "youtube",
    label: "Subscribe on YouTube",
    getHref: () => contact.youtube,
    icon: Youtube,
    brandColor: "hover:bg-[#FF0000] hover:text-white",
    brandText: "text-red-600",
  },
  {
    key: "linkedin",
    label: "Connect on LinkedIn",
    getHref: () => contact.linkedin,
    icon: Linkedin,
    brandColor: "hover:bg-[#0077B5] hover:text-white",
    brandText: "text-blue-700",
  },
];

export function getEnabledPlatforms() {
  return platformConfig.filter((p) => {
    if (p.key === "phone" || p.key === "whatsapp" || p.key === "email") return true;
    const value = (contact as any)[p.key];
    return typeof value === "string" && value.trim() !== "";
  });
}

interface SocialIconsProps {
  light?: boolean;
}

export function NavbarSocials({ light }: SocialIconsProps) {
  // Only show Facebook, Instagram, and WhatsApp in the navbar to keep it tidy
  const platforms = getEnabledPlatforms().filter((p) =>
    ["facebook", "instagram", "whatsapp"].includes(p.key)
  );

  return (
    <div className="flex items-center gap-1.5 mr-2">
      {platforms.map((p) => {
        const Icon = p.icon;
        return (
          <a
            key={p.key}
            href={p.getHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5 focus-ring ${
              light
                ? `bg-white/10 text-white/80 ${p.brandColor}`
                : `bg-slate-100 text-slate-600 ${p.brandColor}`
            }`}
            aria-label={p.label}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

export function FooterSocials() {
  const platforms = getEnabledPlatforms();

  return (
    <div className="flex flex-wrap gap-2.5">
      {platforms.map((p) => {
        const Icon = p.icon;
        return (
          <a
            key={p.key}
            href={p.getHref()}
            target={p.key !== "phone" && p.key !== "email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`grid h-10 w-10 place-items-center rounded-full bg-white/10 text-slate-300 transition-all duration-300 ${p.brandColor} hover:-translate-y-1 focus-ring`}
            aria-label={p.label}
          >
            <Icon className="h-4.5 w-4.5" />
          </a>
        );
      })}
    </div>
  );
}

export function ContactGridSocials() {
  const platforms = getEnabledPlatforms().filter((p) =>
    ["phone", "whatsapp", "email", "facebook", "instagram"].includes(p.key)
  );

  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((p) => {
        const Icon = p.icon;
        return (
          <a
            key={p.key}
            href={p.getHref()}
            target={p.key !== "phone" && p.key !== "email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`flex h-11 px-4 items-center gap-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 transition-all duration-300 hover:border-transparent ${p.brandColor} hover:-translate-y-1 focus-ring`}
            aria-label={p.label}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-bold">{p.key.charAt(0).toUpperCase() + p.key.slice(1)}</span>
          </a>
        );
      })}
    </div>
  );
}
