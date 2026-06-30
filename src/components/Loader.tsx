import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, visibility: "hidden" }}
      transition={{ delay: 0.65, duration: 0.45, ease: "easeOut" }}
      aria-hidden="true"
    >
      <div className="grid place-items-center gap-5">
        <div className="relative h-16 w-16">
          <motion.span
            className="absolute inset-0 rounded-full border-4 border-brand-blue/15 border-t-brand-blue"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-3 rounded-full border-4 border-brand-orange/20 border-b-brand-orange"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-sm font-bold uppercase text-slate-500">Nepal Home Tuition Center</p>
      </div>
    </motion.div>
  );
}
