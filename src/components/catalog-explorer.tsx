"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock3,
  DraftingCompass,
  FunctionSquare,
  NotebookPen,
} from "lucide-react";
import { useState } from "react";
import {
  curriculum,
  subjectLabels,
  type SubjectKey,
} from "@/lib/curriculum";

export function CatalogExplorer({ initialGrade = 7 }: { initialGrade?: number }) {
  const [grade, setGrade] = useState(initialGrade);
  const [subject, setSubject] = useState<SubjectKey>("algebra");
  const gradeData = curriculum.find((item) => item.grade === grade) ?? curriculum[0];
  const modules = gradeData[subject];
  const lessonCount = modules.reduce((sum, module) => sum + module.lessons, 0);
  const homeworkCount = modules.reduce((sum, module) => sum + module.homework, 0);

  return (
    <div className="catalog-explorer">
      <div className="catalog-controls">
        <div className="grade-tabs" role="tablist" aria-label="Выберите класс">
          {curriculum.map((item) => (
            <button
              key={item.grade}
              className={grade === item.grade ? "active" : ""}
              onClick={() => setGrade(item.grade)}
              role="tab"
              aria-selected={grade === item.grade}
            >
              <strong>{item.grade}</strong>
              <span>класс</span>
            </button>
          ))}
        </div>

        <div className="subject-tabs" role="tablist" aria-label="Выберите предмет">
          {(["algebra", "geometry"] as SubjectKey[]).map((key) => (
            <button
              key={key}
              className={subject === key ? "active" : ""}
              onClick={() => setSubject(key)}
              role="tab"
              aria-selected={subject === key}
            >
              {key === "algebra" ? <FunctionSquare size={18} /> : <DraftingCompass size={18} />}
              {subjectLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-summary">
        <div>
          <span className="catalog-index">0{grade - 6}</span>
          <div>
            <p className="eyebrow">{grade} класс · {subjectLabels[subject]}</p>
            <h2>{gradeData.focus}</h2>
            <p>{gradeData.description}</p>
          </div>
        </div>
        <div className="catalog-stats">
          <span><BookOpen size={18} /><strong>{lessonCount}</strong> уроков</span>
          <span><NotebookPen size={18} /><strong>{homeworkCount}</strong> практикумов</span>
          <span><Clock3 size={18} /><strong>~{Math.round(lessonCount * 0.4)}</strong> часов</span>
        </div>
      </div>

      <div className="module-list">
        {modules.map((module, index) => (
          <details className="module-card" key={module.slug} open={index === 0}>
            <summary>
              <span className="module-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="module-title">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
              <div className="module-meta">
                <span>{module.lessons} уроков</span>
                <span>{module.homework} ДЗ</span>
              </div>
              <span className="module-chevron"><ChevronDown size={20} /></span>
            </summary>
            <div className="module-details">
              <div className="topic-list">
                {module.topics.map((topic, topicIndex) => (
                  <span key={topic}>
                    <small>{index + 1}.{topicIndex + 1}</small>
                    {topic}
                  </span>
                ))}
              </div>
              <Link
                href={`/course/${grade}/${subject}/${module.slug}`}
                className="button button-secondary"
              >
                Открыть модуль <ArrowRight size={17} />
              </Link>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
