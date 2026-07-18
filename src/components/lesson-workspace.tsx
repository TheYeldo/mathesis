"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Lightbulb,
  NotebookPen,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const practice = [
  {
    question: "Чему равен дискриминант уравнения x² − 7x + 10 = 0?",
    answers: ["9", "49", "−9", "10"],
    correct: 0,
    explanation: "D = (−7)² − 4 · 1 · 10 = 49 − 40 = 9.",
  },
  {
    question: "Что можно сказать о корнях уравнения 2x² + 3x + 5 = 0?",
    answers: ["Два различных корня", "Один корень", "Нет действительных корней", "Корни 2 и 5"],
    correct: 2,
    explanation: "D = 3² − 4 · 2 · 5 = 9 − 40 = −31. Отрицательный D означает, что график не пересекает ось x.",
  },
  {
    question: "Уравнение x² − 6x + 9 = 0 имеет один корень. Чему он равен?",
    answers: ["−3", "0", "3", "6"],
    correct: 2,
    explanation: "x² − 6x + 9 = (x − 3)², поэтому единственный корень x = 3.",
  },
];

const homeworkTasks = [
  {
    id: "h1",
    level: "Разминка",
    task: "Определите число корней уравнения 3x² − 5x + 2 = 0, не находя сами корни.",
    hint: "Вычислите только D и сравните его с нулём.",
    answer: "D = 25 − 24 = 1 > 0, поэтому есть два различных корня.",
  },
  {
    id: "h2",
    level: "Основная",
    task: "При каком значении p уравнение x² − 8x + p = 0 имеет ровно один корень?",
    hint: "Ровно один корень означает D = 0.",
    answer: "64 − 4p = 0, значит p = 16.",
  },
  {
    id: "h3",
    level: "Исследование",
    task: "Не вычисляя корни, объясните, почему x² + 4x + 8 = 0 не имеет действительных решений. Свяжите ответ с графиком.",
    hint: "Сравните высоту вершины параболы с осью x.",
    answer: "D = 16 − 32 = −16. Вершина параболы находится в точке (−2; 4), выше оси x; ветви направлены вверх, поэтому пересечений нет.",
  },
];

function ParabolaLab() {
  const [c, setC] = useState(3);
  const d = 16 - 4 * c;
  const roots = d >= 0 ? [(4 - Math.sqrt(d)) / 2, (4 + Math.sqrt(d)) / 2] : [];

  const path = useMemo(() => {
    const points: string[] = [];
    for (let x = -1; x <= 6.5; x += 0.08) {
      const y = x * x - 4 * x + c;
      const px = 78 + x * 66;
      const py = 191 - y * 24;
      points.push(`${points.length ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return points.join(" ");
  }, [c]);

  return (
    <div className="parabola-lab">
      <div className="lab-heading">
        <div>
          <p className="eyebrow"><Sparkles size={14} /> Интерактивная модель</p>
          <h3>Подвигайте свободный член c</h3>
        </div>
        <div className="lab-equation">y = x² − 4x + <strong>{c}</strong></div>
      </div>
      <div className="graph-wrap">
        <svg viewBox="0 0 560 320" role="img" aria-label="График параболы">
          <defs>
            <pattern id="grid" width="66" height="48" patternUnits="userSpaceOnUse">
              <path d="M 66 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeOpacity=".09" strokeWidth="1" />
            </pattern>
            <clipPath id="graph-clip"><rect width="560" height="320" rx="18" /></clipPath>
          </defs>
          <rect width="560" height="320" fill="url(#grid)" />
          <g className="graph-axis">
            <path d="M 12 191 H 548" />
            <path d="M 78 14 V 306" />
            <path d="M 542 185 L 550 191 L 542 197" />
            <path d="M 72 20 L 78 12 L 84 20" />
          </g>
          <g className="graph-labels">
            <text x="540" y="181">x</text>
            <text x="88" y="24">y</text>
            {[0, 1, 2, 3, 4, 5, 6].map((x) => <text key={x} x={74 + x * 66} y="211">{x}</text>)}
          </g>
          <g clipPath="url(#graph-clip)">
            <path className="parabola-path" d={path} />
          </g>
          {roots.map((root, index) => (
            <g key={`${root}-${index}`} className="root-point">
              <circle cx={78 + root * 66} cy="191" r="7" />
              <text x={78 + root * 66} y="175" textAnchor="middle">x{index + 1}</text>
            </g>
          ))}
          <g className="vertex-point">
            <circle cx={78 + 2 * 66} cy={191 - (c - 4) * 24} r="5" />
          </g>
        </svg>
      </div>
      <div className="lab-controls">
        <label>
          <span>c = <strong>{c}</strong></span>
          <input
            type="range"
            min="-1"
            max="6"
            step="0.5"
            value={c}
            onChange={(event) => setC(Number(event.target.value))}
          />
        </label>
        <div className="lab-result">
          <span><small>Дискриминант</small><strong className={d > 0 ? "positive" : d === 0 ? "zero" : "negative"}>D = {d}</strong></span>
          <span><small>Пересечения с осью x</small><strong>{d > 0 ? "2 точки" : d === 0 ? "1 точка" : "Нет"}</strong></span>
        </div>
      </div>
      <p className="lab-insight">
        <Lightbulb size={18} />
        {d > 0
          ? "Вершина ниже оси x: парабола пересекает её в двух точках — у уравнения два корня."
          : d === 0
            ? "Вершина касается оси x: две точки слились в одну — корень единственный."
            : "Вся парабола выше оси x: пересечений нет — действительных корней тоже нет."}
      </p>
    </div>
  );
}

export function LessonWorkspace() {
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceFinished, setPracticeFinished] = useState(false);
  const [homeworkDone, setHomeworkDone] = useState<string[]>([]);

  useEffect(() => {
    const syncHomework = () => {
      const saved = JSON.parse(
        window.localStorage.getItem("mathesis:quadratic:homework") || "[]",
      ) as string[];
      setHomeworkDone(saved);
    };
    const timer = window.setTimeout(syncHomework, 0);
    window.addEventListener("storage", syncHomework);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", syncHomework);
    };
  }, []);

  function answerPractice() {
    if (selected === null) return;
    setChecked(true);
    if (selected === practice[practiceIndex].correct) {
      setPracticeScore((value) => value + 1);
    }
  }

  function nextPractice() {
    if (practiceIndex === practice.length - 1) {
      setPracticeFinished(true);
      window.localStorage.setItem("mathesis:quadratic:finished", "true");
      return;
    }
    setPracticeIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  }

  function restartPractice() {
    setPracticeIndex(0);
    setSelected(null);
    setChecked(false);
    setPracticeScore(0);
    setPracticeFinished(false);
  }

  function toggleHomework(id: string) {
    const next = homeworkDone.includes(id)
      ? homeworkDone.filter((item) => item !== id)
      : [...homeworkDone, id];
    setHomeworkDone(next);
    window.localStorage.setItem("mathesis:quadratic:homework", JSON.stringify(next));
  }

  const item = practice[practiceIndex];

  return (
    <div className="lesson-shell">
      <aside className="lesson-sidebar">
        <Link href="/course/8/algebra/quadratic-equations" className="back-link">
          <ArrowLeft size={17} /> К модулю
        </Link>
        <div className="lesson-sidebar-title">
          <span>8 класс · Алгебра</span>
          <strong>Квадратные уравнения</strong>
        </div>
        <nav aria-label="Разделы урока">
          <a href="#idea" className="active"><span>01</span><BookOpen size={17} /> Идея</a>
          <a href="#model"><span>02</span><Play size={17} /> Модель</a>
          <a href="#practice"><span>03</span><Target size={17} /> Практика</a>
          <a href="#homework"><span>04</span><NotebookPen size={17} /> Домашнее задание</a>
        </nav>
        <div className="sidebar-progress">
          <div><span>Прогресс урока</span><strong>{practiceFinished ? 100 : 64}%</strong></div>
          <div className="mini-progress"><span style={{ width: `${practiceFinished ? 100 : 64}%` }} /></div>
          <small><Clock3 size={14} /> осталось ~{practiceFinished ? 0 : 14} минут</small>
        </div>
      </aside>

      <article className="lesson-content">
        <header className="lesson-title" id="idea">
          <div className="lesson-breadcrumbs">
            <span>Модуль 03</span><ChevronRight size={14} /><span>Урок 03</span>
          </div>
          <p className="eyebrow">Главная идея</p>
          <h1>Дискриминант — это не формула.<br /><em>Это карта пересечений.</em></h1>
          <p className="lesson-intro">
            Почему одно квадратное уравнение имеет два решения, другое — одно,
            а третье не имеет ни одного? Ответ можно увидеть ещё до вычисления корней.
          </p>
          <div className="lesson-meta-row">
            <span><Clock3 size={16} /> 22 минуты</span>
            <span><Target size={16} /> 3 вопроса</span>
            <span><NotebookPen size={16} /> 3 задания</span>
          </div>
        </header>

        <section className="lesson-block">
          <div className="concept-number">01</div>
          <div>
            <p className="eyebrow">Начнём с графика</p>
            <h2>Корень уравнения — это место встречи</h2>
            <p>
              Решить <span className="inline-math">ax² + bx + c = 0</span> — значит найти такие
              значения x, при которых функция <span className="inline-math">y = ax² + bx + c</span>
              принимает значение ноль. На графике это точки пересечения параболы с осью x.
            </p>
            <div className="concept-callout">
              <CircleHelp size={22} />
              <div><strong>Ключевой вопрос</strong><span>Сколько раз парабола встретится с осью x: два, один или ни одного?</span></div>
            </div>
          </div>
        </section>

        <section className="lesson-block" id="model">
          <div className="concept-number coral">02</div>
          <div>
            <p className="eyebrow">Эксперимент</p>
            <h2>Посмотрите, как меняется число корней</h2>
            <p>
              В уравнении ниже меняется только c. Этот коэффициент двигает параболу
              вверх и вниз, а выражение <span className="inline-math">D = b² − 4ac</span>
              фиксирует момент встречи с осью.
            </p>
            <ParabolaLab />
          </div>
        </section>

        <section className="lesson-block formula-block">
          <div className="concept-number yellow">03</div>
          <div>
            <p className="eyebrow">Собираем правило</p>
            <h2>Знак D предсказывает число корней</h2>
            <div className="discriminant-rule">
              <div className="formula-main">D = b² − 4ac</div>
              <div className="rule-cases">
                <span><strong>D &gt; 0</strong><small>два разных корня</small><i className="dots two"><b /><b /></i></span>
                <span><strong>D = 0</strong><small>один корень</small><i className="dots"><b /></i></span>
                <span><strong>D &lt; 0</strong><small>нет действительных корней</small><i className="dots empty" /></span>
              </div>
            </div>
            <div className="proof-note">
              <strong>Почему именно b² − 4ac?</strong>
              <p>
                При выделении полного квадрата получаем
                <span className="inline-math">(2ax + b)² = b² − 4ac</span>.
                Левая часть неотрицательна, поэтому знак правой части полностью
                определяет, возможно ли равенство и сколько у него решений.
              </p>
            </div>
          </div>
        </section>

        <section className="practice-section" id="practice">
          <div className="practice-heading">
            <div>
              <p className="eyebrow">Проверка понимания</p>
              <h2>Теперь попробуйте сами</h2>
            </div>
            <span>{practiceFinished ? practice.length : practiceIndex + 1} / {practice.length}</span>
          </div>

          {practiceFinished ? (
            <div className="practice-complete">
              <span className="complete-icon"><CheckCircle2 size={34} /></span>
              <p className="eyebrow">Практика завершена</p>
              <h3>{practiceScore === 3 ? "Отлично: идея действительно понята" : "Хорошая работа — разбор уже закрепил главное"}</h3>
              <p>Верных ответов: {practiceScore} из {practice.length}. Прогресс урока сохранён.</p>
              <button className="button button-ghost" onClick={restartPractice}><RotateCcw size={17} /> Повторить практику</button>
            </div>
          ) : (
            <div className="practice-card">
              <div className="practice-progress"><span style={{ width: `${((practiceIndex + (checked ? 1 : 0)) / practice.length) * 100}%` }} /></div>
              <h3>{item.question}</h3>
              <div className="practice-options">
                {item.answers.map((answer, index) => {
                  const correct = checked && index === item.correct;
                  const wrong = checked && index === selected && index !== item.correct;
                  return (
                    <button
                      key={answer}
                      disabled={checked}
                      onClick={() => setSelected(index)}
                      className={`${selected === index ? "selected" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>{answer}
                      {correct && <Check size={18} />}{wrong && <X size={18} />}
                    </button>
                  );
                })}
              </div>
              {checked && <p className="practice-explanation"><Lightbulb size={18} /><span><strong>{selected === item.correct ? "Верно." : "Разберём."}</strong> {item.explanation}</span></p>}
              <div className="practice-actions">
                {!checked ? (
                  <button className="button button-primary" onClick={answerPractice} disabled={selected === null}>Проверить <ArrowRight size={18} /></button>
                ) : (
                  <button className="button button-primary" onClick={nextPractice}>{practiceIndex === practice.length - 1 ? "Завершить" : "Дальше"} <ArrowRight size={18} /></button>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="homework-section" id="homework">
          <div className="homework-heading">
            <div>
              <p className="eyebrow">Закрепление · 15 минут</p>
              <h2>Домашнее задание</h2>
              <p>Сначала решите на бумаге. Затем откройте подсказку или ответ для самопроверки.</p>
            </div>
            <div className="homework-count"><strong>{homeworkDone.length}</strong><span>из 3<br />готово</span></div>
          </div>
          <div className="homework-list">
            {homeworkTasks.map((task, index) => (
              <article key={task.id} className={homeworkDone.includes(task.id) ? "done" : ""}>
                <button className="homework-check" onClick={() => toggleHomework(task.id)} aria-label={homeworkDone.includes(task.id) ? "Отметить невыполненным" : "Отметить выполненным"}>
                  {homeworkDone.includes(task.id) && <Check size={18} />}
                </button>
                <div className="homework-body">
                  <span className="homework-level">{String(index + 1).padStart(2, "0")} · {task.level}</span>
                  <p>{task.task}</p>
                  <div className="homework-help">
                    <details><summary>Подсказка</summary><p>{task.hint}</p></details>
                    <details><summary>Ответ</summary><p>{task.answer}</p></details>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="lesson-finish">
            <div><Sparkles size={21} /><span><strong>Урок завершён</strong>Возвращайтесь завтра — мы напомним ключевую идею новой задачей.</span></div>
            <Link href="/catalog?grade=8" className="button button-secondary">К программе <ArrowRight size={18} /></Link>
          </div>
        </section>
      </article>
    </div>
  );
}
