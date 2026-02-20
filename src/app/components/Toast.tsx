"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  emoji?: string;
}

interface ToastContext {
  addToast: (msg: string, type?: ToastItem["type"], emoji?: string) => void;
}

const ToastCtx = createContext<ToastContext>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastItem["type"] = "info", emoji?: string) => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type, emoji }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <ToastCtx.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastCard({ toast }: { toast: ToastItem }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 10); }, []);

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl min-w-[260px] transition-all duration-300",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
        toast.type === "success" && "bg-surface-3 border-brand/40 text-white",
        toast.type === "error" && "bg-surface-3 border-red-500/40 text-white",
        toast.type === "info" && "bg-surface-3 border-blue-500/40 text-white"
      )}
    >
      <span className="text-xl">{toast.emoji ?? (toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : "ℹ️")}</span>
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}
