import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  DraftingCompass,
  FunctionSquare,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { HomeProgress } from "@/components/home-progress";
import { curriculum, getCurriculumStats } from "@/lib/curriculum";

export default function Home() {
  const stats = getCurriculumStats();

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span><Sparkles size={15} /> Новая учебная платформа</span>
              <span>7–11 класс</span>
            </div>
            <h1>
              Математика,
              <br />
              которая наконец
              <br />
              <em>складывается.</em>
            </h1>
            <p className="hero-lead">
              Не набор формул, а связная система идей. Короткие объяснения,
              визуальные модели и задачи, после которых действительно понятно.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/diagnostic">
                Начать с диагностики <ArrowRight size={19} />
              </Link>
              <Link className="text-link" href="/catalog">
                Смотреть программу <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="hero-trust">
              <div className="trust-faces" aria-hidden="true">
                <span>Σ</span><span>π</span><span>∞</span>
              </div>
              <p><strong>{stats.lessons}+ уроков</strong><br />по алгебре и геометрии</p>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/mathesis-hero.png"
              alt="Абстрактная композиция из параболы и геометрических тел"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div className="hero-note">
              <span className="note-icon"><Lightbulb size={20} /></span>
              <span><strong>Идея урока</strong>Сначала понять — потом запомнить</span>
            </div>
            <div className="hero-formula" aria-hidden="true">
              <span>x</span><sup>2</sup><span> − 5x + 6 = 0</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="container proof-grid">
          <p>Полная школьная программа</p>
          <div><strong>5</strong><span>лет обучения<br />в одной системе</span></div>
          <div><strong>{stats.modules}</strong><span>тематических<br />модулей</span></div>
          <div><strong>{stats.homework}+</strong><span>домашних<br />практикумов</span></div>
          <div><strong>15–25</strong><span>минут длится<br />один урок</span></div>
        </div>
      </section>

      <HomeProgress />

      <section className="section program-preview">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Вся программа</p>
              <h2>От первой переменной до интеграла</h2>
            </div>
            <Link className="text-link" href="/catalog">
              Открыть каталог <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grade-row">
            {curriculum.map((item, index) => (
              <Link
                key={item.grade}
                href={`/catalog?grade=${item.grade}`}
                className={`grade-card grade-${item.grade}`}
              >
                <div className="grade-number">
                  <span>{item.grade}</span><small>класс</small>
                </div>
                <div className="grade-shape" aria-hidden="true">
                  {index % 2 === 0 ? <FunctionSquare /> : <DraftingCompass />}
                </div>
                <div>
                  <span className="grade-focus">{item.focus}</span>
                  <p>{item.algebra.length + item.geometry.length} модулей</p>
                </div>
                <ArrowUpRight className="grade-arrow" size={21} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="container method-grid">
          <div className="method-intro">
            <p className="eyebrow">Метод Mathesis</p>
            <h2>Глубоко —<br />не значит сложно</h2>
            <p>
              Каждый модуль устроен как маленькое исследование: наблюдаем,
              формулируем идею, проверяем её и только затем закрепляем формулой.
            </p>
            <Link href="/lesson/quadratic-equations" className="button button-light">
              Посмотреть живой урок <ArrowRight size={18} />
            </Link>
          </div>
          <div className="method-steps">
            <article>
              <span>01</span>
              <div className="method-icon blue"><Compass size={24} /></div>
              <h3>Увидеть идею</h3>
              <p>Визуальная модель связывает абстрактную формулу с понятным образом.</p>
            </article>
            <article>
              <span>02</span>
              <div className="method-icon coral"><Lightbulb size={24} /></div>
              <h3>Доказать себе</h3>
              <p>Пошаговый разбор показывает не только «как», но и «почему».</p>
            </article>
            <article>
              <span>03</span>
              <div className="method-icon yellow"><BookOpenCheck size={24} /></div>
              <h3>Закрепить</h3>
              <p>Практика адаптируется от базового понимания до сложной задачи.</p>
            </article>
            <article>
              <span>04</span>
              <div className="method-icon green"><CheckCircle2 size={24} /></div>
              <h3>Вернуться вовремя</h3>
              <p>Домашние задания повторяют ключевые идеи через интервалы.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section closing-section">
        <div className="container closing-card">
          <div className="closing-copy">
            <p className="eyebrow">Можно начать без регистрации</p>
            <h2>Найдите пробелы за 7 минут</h2>
            <p>
              Короткая диагностика определит уверенность в базовых идеях и
              предложит первую тему для изучения.
            </p>
            <Link href="/diagnostic" className="button button-primary">
              Пройти диагностику <ArrowRight size={19} />
            </Link>
          </div>
          <div className="closing-visual" aria-hidden="true">
            <div className="coordinate-grid" />
            <div className="closing-parabola" />
            <span className="point p1" />
            <span className="point p2" />
            <span className="point p3" />
            <span className="closing-label">y = x²</span>
          </div>
        </div>
      </section>
    </main>
  );
}
