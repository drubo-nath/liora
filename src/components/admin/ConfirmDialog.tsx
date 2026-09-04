"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={loading ? undefined : onCancel}
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
          />

          {/* Dialog Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-cream p-6 shadow-2xl dark:bg-ink text-ink dark:text-cream"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1.5 pt-0.5">
                <h3 className="font-serif text-lg font-semibold leading-none tracking-tight">
                  {title}
                </h3>
                <p className="text-sm text-taupe leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={loading}
                className="cursor-pointer"
              >
                {cancelLabel}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onConfirm}
                disabled={loading}
                className="cursor-pointer gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

