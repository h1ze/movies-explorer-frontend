import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import('./AboutProject.css');

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__wrapper">
        <SectionHeading>О проекте</SectionHeading>
        <div className="about-project__content">
          <div className="about-project__chapter">
            <h3 className="about-project__chapter-title">
              Дипломный проект включал 5&nbsp;этапов
            </h3>
            <p className="about-project__chapter-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и&nbsp;финальные доработки.
            </p>
          </div>
          <div className="about-project__chapter">
            <h3 className="about-project__chapter-title">
              На&nbsp;выполнение диплома ушло 5&nbsp;недель
            </h3>
            <p className="about-project__chapter-text">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
              нужно было соблюдать, чтобы успешно защититься.
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
      </div>
    </section>
  );
};

export default AboutProject;
