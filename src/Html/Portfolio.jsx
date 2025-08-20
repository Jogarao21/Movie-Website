import React from 'react';
import '../HtmlScss/Portfolio.scss';
import Image from '../assets/Profile-Picture1.JPG';

const Portfolio = () => {
  const skills = [
    {
      icon: '🐍',
      title: 'Python Backend',
      description: 'Django, Flask, FastAPI, SQLAlchemy, REST APIs',
    },
    {
      icon: '💾',
      title: 'Databases',
      description: 'PostgreSQL, MySQL, MongoDB, Redis',
    },
    {
      icon: '🌐',
      title: 'Frontend',
      description: 'HTML5, CSS3, JavaScript, React, Vue.js',
    },
    {
      icon: '☁️',
      title: 'DevOps & Cloud',
      description: 'Docker, AWS, Heroku, CI/CD, Git',
    },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-featured online store with user authentication, payment processing, and admin dashboard.',
      tech: ['Django', 'PostgreSQL', 'React', 'Stripe'],
      link: '#',
    },
    {
      title: 'Task Management API',
      description:
        'RESTful API for task management with user authentication and real-time updates.',
      tech: ['Flask', 'SQLAlchemy', 'JWT', 'WebSocket'],
      link: '#',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Interactive dashboard for data visualization and business intelligence.',
      tech: ['FastAPI', 'Pandas', 'Chart.js', 'Redis'],
      link: '#',
    },
  ];

  const contactInfo = [
    {
      icon: '📧',
      text: 'mjogarao21@example.com',
      link: 'mjogarao21@example.com',
    },
    {
      icon: '💼',
      text: 'https://www.linkedin.com/in/shiva-jogarao',
      link: 'https://www.linkedin.com/in/shiva-jogarao',
    },
    {
      icon: '🐙',
      text: 'https://github.com/Jogarao21',
      link: 'https://github.com/Jogarao21',
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio">
      {/* Header Section */}
<header className="header">
  <div className="header__container">
    <div className="header__content">
      <h1>Kappa Jogarao</h1>
      <p className="wave-animation">
        {"Python Full-Stack Web Developer".split("").map((char, index) => (
          <span
            key={index}
            className="wave-char"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
      <p className="header__content__description">
        Crafting robust web applications with Python, Django, Flask, and modern frontend technologies.
        Passionate about creating scalable solutions and clean, maintainable code.
      </p>
      <button
        className="cta-button"
        onClick={() => scrollToSection('about')}
      >
        View My Work
      </button>
    </div>

    {/* Image on top right corner only in header */}
    <div className="header__image">
      <img src={Image} alt="Profile" />
    </div>
  </div>
</header>


      {/* About Section */}
      <section className="about" id="about">
        <h2 className="section-title">About Me</h2>
        <div className="about__content">
          <p>
            As a Python Full-Stack Web Developer, I bring ideas to life through code. I have extensive experience
            in building web applications from conception to deployment, handling everything from database design
            to user interface implementation.
          </p>
          <p>
            My expertise spans across backend development with Python frameworks, RESTful API design, database
            management, and modern frontend technologies. I'm committed to writing maintainable code and
            following best practices in software development.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills__grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-card__icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      
      {/* Projects Section */}
      <section className="projects">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-card__image">{project.title}</div>
              <div className="project-card__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-card__tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="project-card__link">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Contact Section */}
      <section className="contact">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact__content">
          <p>
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can work together!
          </p>
          <div className="contact__info">
            {contactInfo.map((contact, index) => (
              <div key={index} className="contact__item">
                <i>{contact.icon}</i>
                    <a 
      href={contact.link} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: "#fff", textDecoration: "underline" }}
    >
                <p>{contact.text}</p></a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
