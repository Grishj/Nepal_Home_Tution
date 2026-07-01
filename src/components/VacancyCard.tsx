import { Clock, Coins, GraduationCap, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShareDropdown } from "./ShareDropdown";
import type { Vacancy } from "../types/vacancy";

interface VacancyCardProps {
  vacancy: Vacancy;
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const applyUrl = `${window.location.origin}/become-tutor?salary=${vacancy.salary}&subject=${encodeURIComponent(vacancy.subject)}&class=${encodeURIComponent(vacancy.class)}`;
  const shareText = `📢 *Vacancy Alert!*\n\n📚 *Subject:* ${vacancy.subject}\n🎓 *Class:* ${vacancy.class}\n📍 *Location:* ${vacancy.location}\n💰 *Salary:* Rs. ${vacancy.salary.toLocaleString()}\n👤 *Gender:* ${vacancy.teacherGender}\n⏳ *Experience:* ${vacancy.experience}\n🕒 *Duration:* ${vacancy.duration}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl border border-slate-100 bg-white p-6 shadow-soft transition hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-brand-blue">
            {vacancy.id}
          </span>
          {vacancy.urgent && (
            <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-orange-600">
              Urgent
            </span>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${
            vacancy.status === "OPEN"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {vacancy.status}
        </span>
      </div>

      <h3 className="font-heading text-xl font-extrabold text-slate-900">
        {vacancy.subject}
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        {vacancy.class}
      </p>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {vacancy.description}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="font-medium">{vacancy.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Coins className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="font-medium">Rs. {vacancy.salary.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <User className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="font-medium">{vacancy.teacherGender}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="font-medium">{vacancy.duration}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {vacancy.experience && (
          <span className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">
            {vacancy.experience}
          </span>
        )}
        {vacancy.education && (
          <span className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">
            <GraduationCap className="mr-1 inline h-3 w-3" />
            {vacancy.education}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to={`/become-tutor?salary=${vacancy.salary}&subject=${encodeURIComponent(vacancy.subject)}&class=${encodeURIComponent(vacancy.class)}`}
          className="flex-1 rounded-lg bg-brand-blue px-4 py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-blue-700 focus-ring"
        >
          Apply Now
        </Link>
        <ShareDropdown shareUrl={applyUrl} shareText={shareText} />
      </div>
    </motion.div>
  );
}
