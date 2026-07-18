"use client";

import Link from "next/link";
import { ArrowRight, Check, RotateCcw, Sparkles, X } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    topic: "Линейные уравнения",
    prompt: "Решите уравнение 3(2x − 1) = 15",
    answers: ["x = 2", "x = 3", "x = 4", "x = 6"],
    correct: 1,
    explanation: "Делим обе части на 3: 2x − 1 = 5. Прибавляем 1 и делим на 2: x = 3.",
  },
  {
    topic: "Функции",
    prompt: "Найдите значение y = −2x + 5 при x = 4",
    answers: ["−8", "−3", "3", "13"],
    correct: 1,
    explanation: "Подставляем x = 4: y = −2 · 4 + 5 = −8 + 5 = −3.",
  },
  {
    topic: "Преобразования",
    prompt: "Как разложить на множители выражение x² − 9?",
    answers: ["(x − 9)(x + 1)", "(x − 3)²", "(x − 3)(x + 3)", "x(x − 9)"],
    correct: 2,
    explanation: "Это разность квадратов: a² − b² = (a − b)(a + b), где b = 3.",
  },
  {
    topic: "Геометрия",
    prompt: "Катеты прямоугольного треугольника равны 6 и 8. Чему равна гипотенуза?",
    answers: ["10", "12", "14", "√28"],
    correct: 0,
    explanation: "По теореме Пифагора: c² = 6² + 8² = 36 + 64 = 100, значит c = 10.",
  },
  {
    topic: "Квадратные уравнения",
    prompt: "Сколько различных корней у уравнения x² − 6x + 9 = 0?",
    answers: ["Ни одного", "Один", "Два", "Бесконечно много"],
    correct: 1,
    explanation: "D = (−6)² − 4 · 1 · 9 = 0. При D = 0 у квадратного уравнения один корень.",
  },
];

export function DiagnosticQuiz() {
  const [grade, setGrade] = useState(8);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[current];

  function confirmAnswer() {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === question.correct) setScore((value) => value + 1);
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      const finalScore = score + (selected === question.correct && !confirmed ? 1 : 0);
      window.localStorage.setItem(
        "mathesis:diagnostic",
        JSON.stringify({ grade, score: finalScore, completedAt: new Date().toISOString() }),
      );
      setFinished(true);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
    setConfirmed(false);
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const level = score >= 4 ? "Уверенная база" : score >= 2 ? "Хорошая точка старта" : "Нужен короткий фундамент";
    const recommendation = score >= 4
      ? "Можно двигаться к квадратным функциям и задачам с несколькими условиями."
      : score >= 2
        ? "Рекомендуем закрепить преобразования и связь уравнения с графиком."
        : "Начните с линейных уравнений: это быстро восстановит ключевые связи.";

    return (
      <div className="diagnostic-result">
        <div className="result-orbit" style={{ "--score": `${percent}%` } as React.CSSProperties}>
          <span><strong>{score}</strong> / {questions.length}</span>
        </div>
        <p className="eyebrow"><Sparkles size={15} /> Диагностика завершена</p>
        <h2>{level}</h2>
        <p>{recommendation}</p>
        <div className="result-map">
          <span><Check size={17} /> Арифметика и вычисления</span>
          <span className={score >= 2 ? "good" : "review"}><Check size={17} /> Алгебраические преобразования</span>
          <span className={score >= 4 ? "good" : "review"}><Check size={17} /> Функции и модели</span>
        </div>
        <div className="diagnostic-actions">
          <Link href="/lesson/quadratic-equations" className="button button-primary">
            Перейти к уроку <ArrowRight size={18} />
          </Link>
          <button onClick={restart} className="button button-ghost">
            <RotateCcw size={17} /> Пройти ещё раз
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-shell">
      <div className="quiz-topbar">
        <div className="quiz-grades" aria-label="Класс ученика">
          <span>Я в</span>
          {[7, 8, 9, 10, 11].map((item) => (
            <button key={item} onClick={() => setGrade(item)} className={grade === item ? "active" : ""}>
              {item}
            </button>
          ))}
          <span>классе</span>
        </div>
        <span className="quiz-counter">{current + 1} / {questions.length}</span>
      </div>
      <div className="quiz-progress"><span style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>

      <div className="question-card">
        <p className="eyebrow">{question.topic}</p>
        <h2>{question.prompt}</h2>
        <div className="answer-grid">
          {question.answers.map((answer, index) => {
            const isCorrect = confirmed && index === question.correct;
            const isWrong = confirmed && index === selected && index !== question.correct;
            return (
              <button
                key={answer}
                onClick={() => !confirmed && setSelected(index)}
                className={`${selected === index ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                disabled={confirmed}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {answer}
                {isCorrect && <Check size={18} />}
                {isWrong && <X size={18} />}
              </button>
            );
          })}
        </div>

        {confirmed && (
          <div className={`answer-explanation ${selected === question.correct ? "correct" : "wrong"}`}>
            <strong>{selected === question.correct ? "Верно." : "Почти."}</strong>
            {question.explanation}
          </div>
        )}

        <div className="quiz-actions">
          <span />
          {!confirmed ? (
            <button className="button button-primary" onClick={confirmAnswer} disabled={selected === null}>
              Проверить <ArrowRight size={18} />
            </button>
          ) : (
            <button className="button button-primary" onClick={nextQuestion}>
              {current === questions.length - 1 ? "Показать результат" : "Следующий вопрос"}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
