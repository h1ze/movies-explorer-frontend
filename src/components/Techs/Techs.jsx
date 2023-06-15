import React from 'react';
import('./Techs.css');

const Techs = () => {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__content">
        <h3 className="techs__content-title">7 технологий</h3>
        <p className="techs__content-subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="techs__blocks">
          {techs.map((tech, index) => {
            return (
              <div className="techs__block" key={index}>
                {tech}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Techs;
