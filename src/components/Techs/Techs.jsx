import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import('./Techs.css');

const Techs = () => {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
  return (
    <section className="techs" id="techs">
      <div className="techs__wrapper">
        <SectionHeading>Технологии</SectionHeading>
        <div className="techs__content">
          <h3 className="techs__content-title">7 технологий</h3>
          <p className="techs__content-subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__blocks">
            {techs.map((tech, index) => {
              return (
                <li className="techs__block" key={index}>
                  {tech}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Techs;
