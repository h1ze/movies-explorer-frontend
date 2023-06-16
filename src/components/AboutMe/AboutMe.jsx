import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Link } from 'react-router-dom';
import student from '../../images/student.png';
import Portfolio from '../Portfolio/Portfolio';
import('./AboutMe.css');

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__wrapper">
        <SectionHeading>Студент</SectionHeading>
        <div className="about-me__columns">
          <div className="about-me__text-column">
            <h3 className="about-me__title">Виталий</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__info">
              Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
              экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
              слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке, начал
              заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
            </p>
            <Link
              className="about-me__link"
              to="https://github.com/"
              target="_blank"
            >
              Github
            </Link>
          </div>
          <div className="about-me__photo-column">
            <img
              className="about-me__photo"
              src={student}
              alt="Фотография студента"
            />
          </div>
        </div>
        <Portfolio />
      </div>
    </section>
  );
};

export default AboutMe;
