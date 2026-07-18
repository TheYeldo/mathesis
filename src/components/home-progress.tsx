"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock3, Target } from "lucide-react";
import { useEffect, useState } from "react";

export function HomeProgress() {
  const [lessonFinished, setLessonFinished] = useState(false);
  const [homeworkDone, setHomeworkDone] = useState(0);

  useEffect(() => {
    const syncProgress = () => {
      setLessonFinished(
        window.localStorage.getItem("mathesis:quadratic:finished") === "true",
      );
      const storedHomework = JSON.parse(
        window.localStorage.getItem("mathesis:quadratic:homework") || "[]",
      ) as string[];
      setHomeworkDone(storedHomework.length);
    };
    const timer = window.setTimeout(syncProgress, 0);
    window.addEventListener("storage", syncProgress);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", syncProgress);
    };
  }, []);

  const progress = Math.min(
    100,
    36 + (lessonFinished ? 34 : 0) + homeworkDone * 10,
  );

  return (
    <section className="section learning-section" id="progress">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Личный маршрут</p>
            <h2>Продолжайте с того места, где остановились</h2>
          </div>
          <p>
            Платформа запоминает практику и домашние задания прямо на вашем
            устройстве — без регистрации.
          </p>
        </div>

        <div className="learning-grid">
          <article className="continue-card">
            <div className="continue-topline">
              <span className="status-dot" />
              <span>В процессе</span>
              <span className="continue-grade">8 класс · Алгебра</span>
            </div>
            <div className="continue-copy">
              <div>
                <p className="lesson-index">Урок 3 из 11</p>
                <h3>
                  Квадратные уравнения:
                  <br />
                  смысл дискриминанта
                </h3>
              </div>
              <div className="progress-orbit" aria-label={`Прогресс ${progress}%`}>
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="51" />
                  <circle
                    className="progress-orbit-value"
                    cx="60"
                    cy="60"
                    r="51"
                    pathLength="100"
                    strokeDasharray={`${progress} 100`}
                  />
                </svg>
                <strong>{progress}%</strong>
              </div>
            </div>
            <div className="continue-bottom">
              <div className="continue-meta">
                <span><Clock3 size={16} /> 22 минуты</span>
                <span><Target size={16} /> 7 задач</span>
              </div>
              <Link href="/lesson/quadratic-equations" className="round-link" aria-label="Продолжить урок">
                <ArrowRight size={23} />
              </Link>
            </div>
            <div className="continue-line">
              <span style={{ width: `${progress}%` }} />
            </div>
          </article>

          <article className="today-card" id="homework">
            <div className="today-heading">
              <div>
                <p className="eyebrow">План на сегодня</p>
                <h3>35 минут — и готово</h3>
              </div>
              <span className="day-chip">СБ</span>
            </div>
            <div className="today-list">
              <Link href="/lesson/quadratic-equations" className={lessonFinished ? "done" : ""}>
                <span className="task-icon"><BookOpen size={18} /></span>
                <span><strong>Закончить теорию</strong><small>12 мин · дискриминант</small></span>
                <span className="task-check">{lessonFinished && <Check size={15} />}</span>
              </Link>
              <Link href="/lesson/quadratic-equations#practice">
                <span className="task-icon coral"><Target size={18} /></span>
                <span><strong>Решить практику</strong><small>8 мин · 3 задачи</small></span>
                <span className="task-check" />
              </Link>
              <Link href="/lesson/quadratic-equations#homework" className={homeworkDone === 3 ? "done" : ""}>
                <span className="task-icon yellow"><Check size={18} /></span>
                <span><strong>Домашнее задание</strong><small>15 мин · выполнено {homeworkDone}/3</small></span>
                <span className="task-check">{homeworkDone === 3 && <Check size={15} />}</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
