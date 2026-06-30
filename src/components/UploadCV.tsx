import React, { useRef } from "react";
import { Controller, Control } from "react-hook-form";
import { FileText, UploadCloud, X, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadCVProps {
  control: Control<any>;
  name: string;
  error?: string;
}

export function UploadCV({ control, name, error }: UploadCVProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const file = value as File | null;
        const isPdf = file?.name?.toLowerCase().endsWith(".pdf");

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            onChange(selectedFile);
          }
        };

        const handleRemove = (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        };

        const handleReplace = (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          fileInputRef.current?.click();
        };

        return (
          <div className="w-full">
            <input
              type="file"
              ref={fileInputRef}
              name="CV"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="sr-only"
              id="cv-upload-input"
            />
            
            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-6 text-center transition-all focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-brand-blue ${
                    error
                      ? "border-red-300 bg-red-50/30 hover:border-red-400 hover:bg-red-50/50"
                      : "border-slate-300 bg-slate-50/50 hover:border-brand-blue hover:bg-blue-50/30"
                  }`}
                >
                  <UploadCloud className={`mb-3 h-9 w-9 ${error ? 'text-red-500' : 'text-brand-blue'}`} />
                  <span className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                    📄 Upload Your CV
                  </span>
                  <span className="mt-1.5 text-xs text-slate-500 font-medium">
                    Supported formats: <strong className="text-slate-700">PDF, DOC, DOCX</strong>
                  </span>
                  <span className="mt-0.5 text-xs text-slate-400 font-medium">
                    Maximum size: <strong className="text-slate-600">5 MB</strong>
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="file-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border p-4 shadow-sm transition ${
                    isPdf
                      ? "border-red-100 bg-red-50/10 hover:border-red-200"
                      : "border-blue-100 bg-blue-50/10 hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${
                        isPdf
                          ? "bg-red-50 text-red-500"
                          : "bg-blue-50 text-brand-blue"
                      }`}
                    >
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900 pr-2">
                        {file.name}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-500">
                          {formatFileSize(file.size)}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-brand-success bg-green-50 px-2 py-0.5 rounded-full text-[10px]">
                          <CheckCircle2 className="h-3 w-3" />
                          Success
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <button
                      type="button"
                      onClick={handleReplace}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition focus-ring"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition focus-ring"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {error && <p className="field-error">{error}</p>}
          </div>
        );
      }}
    />
  );
}
