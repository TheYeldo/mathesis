import type { Metadata } from "next";
import { LessonWorkspace } from "@/components/lesson-workspace";

export const metadata: Metadata = {
  title: "Дискриминант: интерактивный урок",
  description:
    "Интерактивный урок Mathesis о смысле дискриминанта: графическая модель, практика и домашнее задание.",
};

export default function QuadraticLessonPage() {
  return (
    <main className="lesson-page">
      <LessonWorkspace />
    </main>
  );
}
