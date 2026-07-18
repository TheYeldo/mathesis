import Link from "next/link";
import { ArrowUpRight, Menu, UserRound } from "lucide-react";

const nav = [
  { href: "/", label: "Обзор" },
  { href: "/catalog", label: "Программа" },
  { href: "/lesson/quadratic-equations", label: "Урок" },
  { href: "/diagnostic", label: "Диагностика" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Mathesis — на главную">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>MATHESIS</span>
        </Link>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-profile" href="/#progress">
          <UserRound size={17} strokeWidth={1.8} />
          <span>Мой прогресс</span>
        </Link>

        <details className="mobile-nav">
          <summary aria-label="Открыть меню">
            <Menu size={22} />
          </summary>
          <div className="mobile-nav-panel">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
            <Link href="/#progress">
              Мой прогресс
              <UserRound size={18} />
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
