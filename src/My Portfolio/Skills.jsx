import React, { useState, useEffect } from 'react';
import '../My Portfolio/Skills.scss';
import HtmlIcon from '../assets/HtmlIcon.png';
import CssIcon from '../assets/CssIcon.png';
import SassIcon from '../assets/SassIcon.png';
import JavaScriptIcon from '../assets/JavaScriptIcon.png';
import ReactJsIcon from '../assets/ReactJsIcon.png';
import PythonIcon from '../assets/PythonIcon.png';
import MySqlIcon from '../assets/MySqlIcon.png';
import DjangoIcon from '../assets/DjangoIcon.png';
import TailwindIcon from '../assets/TailwindIcon.png';
import BootstrapIcon from '../assets/BootstrapIcon.png'
import JavaIcon from '../assets/JavaIcon.png';
import GitHubIcon from '../assets/GitHubIcon.png';

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState([]);

  const skills = [
    { name: 'HTML', icon: <img src={HtmlIcon} alt="Html" className="html-icon"/>},
    { name: 'CSS', icon: <img src={CssIcon} alt="Css" className="css-icon"/>},
    { name: 'Sass', icon: <img src={SassIcon} alt="Saas" className="sass-icon"/>},
    { name: 'JavaScript', icon: <img src={JavaScriptIcon} alt="Javascript" className="javascript-icon"/>},
    { name: 'React', icon: <img src={ReactJsIcon} alt="Reactjs" className="reactjs-icon"/>},
    { name: 'Python', icon: <img src={PythonIcon} alt="Python" className="python-icon"/>},
    { name: 'Java', icon: <img src={JavaIcon} alt="Java" className="java-icon"/>},
    { name: 'MySQL', icon: <img src={MySqlIcon} alt="Mysql" className="mysql-icon"/>},
    { name: 'Django', icon: <img src={DjangoIcon} alt="Django" className="django-icon"/>},
    { name: 'Tailwind', icon: <img src={TailwindIcon} alt="Tailwind" className="tailwind-icon"/>},
    { name: 'Bootstrap', icon: <img src={BootstrapIcon} alt="Bootstrap" className="bootstrap-icon"/>},
    { name: 'GitHub', icon: <img src={GitHubIcon} alt="Github" className="github-icon"/>},
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleSkills((prev) => [...new Set([...prev, index])]);
        }
      });
    }, { threshold: 0.1 });

    const skillElements = document.querySelectorAll('.skill-item');
    skillElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section">
      <div className="skills-header">
        <h2>Skills & Technologies</h2>
        <p>Here are the technologies and tools I work with to bring ideas to life</p>

      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            data-index={index}
            className={`skill-item ${visibleSkills.includes(index) ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="skill-content">
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="skills-footer">
        <p>
          Always learning and exploring new technologies to stay ahead in the ever-evolving world of development
        </p>
      </div>
    </section>
  );
};

export default Skills;