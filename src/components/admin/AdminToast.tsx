"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Trash2, EyeOff, Eye, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "delete" | "hide" | "publish" | "info" | "error";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
}

interface AdminToastContextType {
  toast: (options: { title: string; description?: string; type?: ToastType }) => void;
}

const AdminToastContext = createContext<AdminToastContextType | null>(null);

export function useAdminToast() {
  const ctx = useContext(AdminToastContext);
  if (!ctx) {
    throw new Error("useAdminToast must be used within AdminToastProvider");
  }
  return ctx;
}

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, type = "success" }: { title: string; description?: string; type?: ToastType }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, title, description, type }]);

      // Auto dismiss after 3.8s
      setTimeout(() => {
        removeToast(id);
      }, 3800);
    },
    [removeToast]
  );

  return (
    <AdminToastContext.Provider value={{ toast }}>
      {children}

      {/* Floating Animated Toast Container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence mode="sync">
          {toasts.map((t) => (
            <ToastCard key={t.id} item={t} onDismiss={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </AdminToastContext.Provider>
  );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const isDelete = item.type === "delete";
  const isHide = item.type === "hide";
  const isPublish = item.type === "publish";
  const isError = item.type === "error";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className="pointer-events-auto relative overflow-hidden rounded-xl border border-line/80 bg-cream/95 p-4 shadow-xl backdrop-blur-md dark:bg-ink/95 dark:border-line/40 text-ink dark:text-cream"
    >
      <div className="flex items-start gap-3.5">
        {/* Animated Icon Iconography */}
        <div className="shrink-0 pt-0.5">
          {isDelete ? (
            <motion.div
              initial={{ rotate: -15, scale: 0.7 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/15 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </motion.div>
          ) : isHide ? (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-taupe/20 text-taupe"
            >
              <EyeOff className="h-4 w-4" />
            </motion.div>
          ) : isPublish ? (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
            >
              <Eye className="h-4 w-4" />
            </motion.div>
          ) : isError ? (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/15 text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-clay/15 text-clay dark:text-cream"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </motion.div>
          )}
        </div>

        {/* Message */}
        <div className="min-w-0 flex-1 pr-2">
          <p className="font-serif text-sm font-medium leading-snug tracking-normal">
            {item.title}
          </p>
          {item.description && (
            <p className="mt-1 text-xs text-taupe line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className="shrink-0 p-1 text-taupe hover:text-ink transition-colors focus:outline-none"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Subtle Countdown Progress Bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 3.8, ease: "linear" }}
        className="absolute bottom-0 inset-x-0 h-0.5 origin-left bg-clay/40"
      />
    </motion.div>
  );
}

