import { Check, Facebook, Link, MessageCircle, Share2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ShareDropdownProps {
  shareUrl: string;
  shareText: string;
}

export function ShareDropdown({ shareUrl, shareText }: ShareDropdownProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const shareNative = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Vacancy", text: shareText + "\n\n🔗 " + shareUrl });
        return;
      } catch { /* user cancelled or error */ }
    }
    setOpen(true);
  }, [shareText, shareUrl]);

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={shareNative}
        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-brand-success focus-ring"
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 z-50 mb-2 w-52 rounded-xl border border-slate-100 bg-white p-2 shadow-lg">
          <div className="mb-1 flex items-center justify-between px-2 py-1">
            <span className="text-xs font-bold text-slate-500">Share via</span>
            <button type="button" onClick={() => setOpen(false)} className="grid h-6 w-6 place-items-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-0.5">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText + "\n\n🔗 Apply: " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <MessageCircle className="h-4 w-4 text-green-600" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link className="h-4 w-4 text-slate-500" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}