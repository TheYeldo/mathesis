import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/catalog-explorer";
import { curriculum, getCurriculumStats } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Программа 7–11 классов",
  description:
    "Полная программа Mathesis по алгебре и геометрии: темы, уроки и домашние задания для 7–11 классов.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string }>;
}) {
  const params = await searchParams;
  const requestedGrade = Number(params.grade);
  const initialGrade = curriculum.some((item) => item.grade === requestedGrade)
    ? requestedGrade
    : 7;
  const stats = getCurriculumStats();

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div className="container catalog-hero-grid">
          <div>
            <p className="eyebrow">Программа 7–11 классов</p>
            <h1>Одна карта.<br /><em>Вся математика.</em></h1>
          </div>
          <div className="catalog-hero-copy">
            <p>
              Каждая тема опирается на предыдущую: без случайных скачков и
              заучивания формул вне контекста.
            </p>
            <div>
              <span><strong>{stats.modules}</strong> модулей</span>
              <span><strong>{stats.lessons}+</strong> уроков</span>
              <span><strong>{stats.homework}+</strong> ДЗ</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section catalog-content">
        <div className="container">
          <CatalogExplorer initialGrade={initialGrade} />
        </div>
      </section>
    </main>
  );
}
