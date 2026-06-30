import { motion } from "framer-motion";

export function VacancySkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className="animate-pulse rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-5 w-16 rounded-full bg-slate-200" />
          </div>
          <div className="mb-3 h-6 w-3/4 rounded bg-slate-200" />
          <div className="mb-4 space-y-2">
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-5/6 rounded bg-slate-100" />
            <div className="h-4 w-2/3 rounded bg-slate-100" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 rounded-full bg-slate-200" />
            <div className="h-6 w-24 rounded-full bg-slate-200" />
            <div className="h-6 w-16 rounded-full bg-slate-200" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
