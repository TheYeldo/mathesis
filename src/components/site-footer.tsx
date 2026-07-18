import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>MATHESIS</span>
          </Link>
          <p>
            Математика с пониманием: от первого доказательства до уверенного
            решения сложных задач.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Учиться</span>
            <Link href="/catalog">Программа 7–11</Link>
            <Link href="/lesson/quadratic-equations">Открытый урок</Link>
            <Link href="/diagnostic">Диагностика</Link>
          </div>
          <div>
            <span>Подход</span>
            <Link href="/#method">Как устроены уроки</Link>
            <Link href="/#progress">Личный прогресс</Link>
            <Link href="/#homework">Домашние задания</Link>
          </div>
        </div>
        <Link className="footer-cta" href="/diagnostic">
          Найти свою точку старта
          <ArrowUpRight size={20} />
        </Link>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Mathesis</span>
        <span>Сделано для любознательных умов</span>
      </div>
    </footer>
  );
}
