"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <span className="text-black font-black text-sm">B</span>
          </div>
          <span className="font-bold text-white text-lg">
            BetDay <span className="text-brand">Lite</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              pathname === "/"
                ? "bg-surface-3 text-white"
                : "text-gray-400 hover:text-white hover:bg-surface-2"
            )}
          >
            🏆 Eventos
          </Link>
          {session ? (
            <>
              <Link
                href="/profile"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === "/profile"
                    ? "bg-surface-3 text-white"
                    : "text-gray-400 hover:text-white hover:bg-surface-2"
                )}
              >
                👤 Perfil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-surface-2 transition-all"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="ml-2 px-4 py-2 rounded-lg text-sm bg-brand text-black hover:bg-brand-dark transition-all font-semibold"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
