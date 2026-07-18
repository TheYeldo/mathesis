import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  LockKeyhole,
  NotebookPen,
  Play,
} from "lucide-react";
import {
  curriculum,
  subjectLabels,
  type SubjectKey,
} from "@/lib/curriculum";

type ModulePageParams = {
  grade: string;
  subject: string;
  slug: string;
};

function resolveModule(params: ModulePageParams) {
  const grade = curriculum.find((item) => item.grade === Number(params.grade));
  if (!grade || !(["algebra", "geometry"] as string[]).includes(params.subject)) {
    return null;
  }
  const subject = params.subject as SubjectKey;
  const courseModule = grade[subject].find((item) => item.slug === params.slug);
  return courseModule ? { grade, subject, courseModule } : null;
}

export async function generateStaticParams() {
  return curriculum.flatMap((grade) =>
    (["algebra", "geometry"] as SubjectKey[]).flatMap((subject) =>
      grade[subject].map((module) => ({
        grade: String(grade.grade),
        subject,
        slug: module.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ModulePageParams>;
}): Promise<Metadata> {
  const resolved = resolveModule(await params);
  if (!resolved) return {};
  return {
    title: `${resolved.courseModule.title} — ${resolved.grade.grade} класс`,
    description: resolved.courseModule.description,
  };
}

export default async function CourseModulePage({
  params,
}: {
  params: Promise<ModulePageParams>;
}) {
  const resolved = resolveModule(await params);
  if (!resolved) notFound();
  const { grade, subject, courseModule } = resolved;
  const isLiveModule = courseModule.slug === "quadratic-equations";

  return (
    <main className="module-page">
      <section className="module-hero">
        <div className="container">
          <Link href={`/catalog?grade=${grade.grade}`} className="back-link">
            <ArrowLeft size={17} /> Вернуться в программу
          </Link>
          <div className="module-hero-grid">
            <div>
              <p className="eyebrow">{grade.grade} класс · {subjectLabels[subject]}</p>
              <h1>{courseModule.title}</h1>
              <p className="module-lead">{courseModule.description}</p>
              <div className="module-hero-meta">
                <span><BookOpen size={18} /> {courseModule.lessons} уроков</span>
                <span><NotebookPen size={18} /> {courseModule.homework} практикумов</span>
                <span><Clock3 size={18} /> ~{Math.max(3, Math.round(courseModule.lessons * 0.4))} часов</span>
              </div>
            </div>
            <div className="module-start-card">
              <span className="module-orbit" aria-hidden="true"><span /></span>
              <p>Рекомендуемый темп</p>
              <strong>3 урока в неделю</strong>
              <small>Так материал успевает закрепиться в долговременной памяти.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section module-syllabus">
        <div className="container module-syllabus-grid">
          <div>
            <p className="eyebrow">Содержание модуля</p>
            <h2>От идеи к уверенному решению</h2>
          </div>
          <div className="lesson-list">
            {courseModule.topics.map((topic, index) => {
              const canOpen = isLiveModule && index === 1;
              return (
                <article key={topic} className={canOpen ? "featured" : ""}>
                  <span className="lesson-order">{String(index + 1).padStart(2, "0")}</span>
                  <span className="lesson-state">
                    {index === 0 ? <Check size={17} /> : canOpen ? <Play size={16} /> : <LockKeyhole size={15} />}
                  </span>
                  <div>
                    <small>{index === 0 ? "Вводный конспект" : canOpen ? "Интерактивный урок" : "Урок + практика"}</small>
                    <h3>{topic}</h3>
                    <p>{16 + index * 3} минут · {4 + index} задач · домашнее задание</p>
                  </div>
                  {canOpen ? (
                    <Link href="/lesson/quadratic-equations" aria-label={`Открыть урок ${topic}`}>
                      <ArrowRight size={20} />
                    </Link>
                  ) : (
                    <span className="lesson-placeholder" aria-hidden="true" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section module-homework">
        <div className="container module-homework-grid">
          <div className="module-homework-intro">
            <p className="eyebrow">Практикум 01 из {courseModule.homework}</p>
            <h2>Домашняя работа<br />к модулю</h2>
            <p>
              Задания проверяют не механическое повторение, а способность
              объяснять, связывать и исследовать математические идеи.
            </p>
            <span><Clock3 size={16} /> 30–40 минут</span>
          </div>
          <div className="module-homework-tasks">
            <article>
              <span>01</span>
              <div>
                <small>Понимание</small>
                <h3>Объясните и разграничьте</h3>
                <p>
                  Дайте собственное объяснение темы «{courseModule.topics[0]}».
                  Приведите один корректный пример и один контрпример, который
                  показывает границу применимости определения или правила.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <small>Связи</small>
                <h3>Соедините две идеи</h3>
                <p>
                  Составьте и решите задачу, в которой одновременно нужны
                  «{courseModule.topics[1]}» и «{courseModule.topics[2]}».
                  Объясните, почему решение нельзя считать полным без каждой из идей.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <small>Исследование</small>
                <h3>Измените условие</h3>
                <p>
                  Возьмите утверждение из темы «{courseModule.topics[3]}», измените
                  одно условие и сформулируйте гипотезу о результате. Проверьте её
                  минимум на трёх случаях и запишите вывод.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
