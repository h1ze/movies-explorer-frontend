import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import('./AboutProject.css');

const AboutProject = () => {
  return (
    <section className="about-project">
      <SectionHeading>О проекте</SectionHeading>
      <div className="about-project__content">
        <div className="about-project__chapter">
          <h3 className="about-project__chapter-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__chapter-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__chapter">
          <h3 className="about-project__chapter-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__chapter-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scale-container">
        <div className="about-project__scale-column about-project__scale-column_size_s">
          <div className="about-project__scale-part">1 неделя</div>
          <span className="about-project__scale-caption">Backend</span>
        </div>
        <div className="about-project__scale-column about-project__scale-column_size_b">
          <div className="about-project__scale-part about-project__scale-part_type_frontend">
            4 недели
          </div>
          <span className="about-project__scale-caption">Frontend</span>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
