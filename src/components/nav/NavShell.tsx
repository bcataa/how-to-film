"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, Film, GraduationCap, Home, Scissors } from "lucide-react";
import { cn } from "@/lib/cn";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/academy", label: "Academy", icon: GraduationCap },
  { href: "/ready", label: "Ready", icon: Clapperboard, primary: true },
  { href: "/projects", label: "Projects", icon: Film },
  { href: "/editor", label: "Editor", icon: Scissors },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Immersive routes (guided shooting) hide the chrome — the user is holding the
 * phone to record and every pixel of distraction costs them a take.
 */
function isImmersive(pathname: string) {
  return /^\/project\/[^/]+\/shoot/.test(pathname);
}

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = isImmersive(pathname);

  if (immersive) return <>{children}</>;

  return (
    <div className="lg:flex lg:min-h-dvh">
      <DesktopSidebar pathname={pathname} />

      <div className="flex min-h-dvh flex-1 flex-col lg:min-h-dvh">
        <main className="flex-1 pb-[calc(5.25rem+env(safe-area-inset-bottom))] lg:pb-10">
          {children}
        </main>
      </div>

      <MobileTabBar pathname={pathname} />
    </div>
  );
}

function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-bone-50/8 bg-ink-900 px-4 py-6 lg:flex">
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-2">
        <span className="grid size-8 place-items-center rounded-lg bg-lime-400 text-ink-950">
          <Clapperboard className="size-4" aria-hidden />
        </span>
        <span className="text-[15px] font-semibold tracking-tight">How to Film</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-field px-3 py-2.5 text-sm transition-colors duration-200",
                active
                  ? "bg-ink-800 text-bone-50"
                  : "text-bone-400 hover:bg-ink-850 hover:text-bone-200",
              )}
            >
              <Icon
                className={cn("size-[18px]", active && "text-lime-400")}
                aria-hidden
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-auto px-3 text-[11px] leading-relaxed text-bone-600">
        Shot plans are generated on-device from the built-in shot library. No AI
        service is connected.
      </p>
    </aside>
  );
}

function MobileTabBar({ pathname }: { pathname: string }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-bone-50/8 bg-ink-900/92 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Main"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {ITEMS.map(({ href, label, icon: Icon, ...rest }) => {
          const active = isActive(pathname, href);
          const primary = "primary" in rest && rest.primary;

          return (
            <li key={href} className="flex justify-center">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className="flex min-h-[64px] w-full flex-col items-center justify-center gap-1 pt-1.5"
              >
                {primary ? (
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-full transition-colors duration-200",
                      active
                        ? "bg-lime-400 text-ink-950"
                        : "bg-lime-400/15 text-lime-400",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                ) : (
                  <Icon
                    className={cn(
                      "size-[21px] transition-colors duration-200",
                      active ? "text-lime-400" : "text-bone-500",
                    )}
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-wide transition-colors duration-200",
                    active ? "text-bone-50" : "text-bone-500",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
