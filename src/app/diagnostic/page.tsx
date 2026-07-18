import type { Metadata } from "next";
import { DiagnosticQuiz } from "@/components/diagnostic-quiz";

export const metadata: Metadata = {
  title: "Диагностика знаний",
  description:
    "Короткая диагностика базовых навыков по математике и персональная рекомендация для старта.",
};

export default function DiagnosticPage() {
  return (
    <main className="diagnostic-page">
      <section className="diagnostic-hero">
        <div className="container diagnostic-layout">
          <div className="diagnostic-intro">
            <p className="eyebrow">7 минут · без оценки</p>
            <h1>Найдём точку,<br />с которой всё<br /><em>станет понятнее.</em></h1>
            <p>
              Пять вопросов проверяют не скорость счёта, а понимание связей.
              Ошибка здесь — не минус, а подсказка для маршрута.
            </p>
            <div className="diagnostic-facts">
              <span><strong>5</strong> вопросов</span>
              <span><strong>1</strong> маршрут</span>
              <span><strong>0</strong> стресса</span>
            </div>
          </div>
          <DiagnosticQuiz />
        </div>
      </section>
    </main>
  );
}
