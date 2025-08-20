import React, { useState, useEffect } from 'react';
import './projects.scss';
import ScrumImage from '../assets/Scrum-AgileImage.png'

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Placeholder projects - replace with your actual projects later
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '/api/placeholder/400/250',
      githubLink: '#',
      liveLink: '#',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Scrum-Agile',
      description: 'Agile is a flexible software development approach that delivers work in small, continuous improvements based on customer feedback. Scrum is a framework within Agile that organizes work into short cycles called sprints with defined roles and meetings. It promotes collaboration, quick delivery, and regular reflection for improvement.',
      category: 'frontend',
      technologies: ['HTML', 'CSS', 'Java Script'],
      image: {ScrumImage},
      githubLink: 'https://github.com/Jogarao21',
      liveLink: 'https://github.com/Jogarao21/Scrum-Agile',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather application with location-based forecasts, interactive maps, and weather alerts using OpenWeather API.',
      category: 'frontend',
      technologies: ['JavaScript', 'CSS3', 'API Integration'],
      image: '/api/placeholder/400/250',
      githubLink: '#',
      liveLink: '#',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Blog CMS',
      description: 'A content management system for bloggers with rich text editor, image uploads, and SEO optimization features.',
      category: 'fullstack',
      technologies: ['Django', 'Python', 'PostgreSQL', 'AWS'],
      image: '/api/placeholder/400/250',
      githubLink: '#',
      liveLink: '#',
      status: 'in-progress'
    },
    {
      id: 5,
      title: 'Data Visualization Tool',
      description: 'Interactive data visualization dashboard with charts, graphs, and analytics for business intelligence.',
      category: 'data',
      technologies: ['Python', 'D3.js', 'Flask', 'Chart.js'],
      image: '/api/placeholder/400/250',
      githubLink: '#',
      liveLink: '#',
      status: 'completed'
    },
    {
      id: 6,
      title: 'Mobile App UI',
      description: 'Modern mobile application interface design with smooth animations and intuitive user experience.',
      category: 'design',
      technologies: ['React Native', 'Figma', 'Animation'],
      image: '/api/placeholder/400/250',
      githubLink: '#',
      liveLink: '#',
      status: 'completed'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'design', name: 'UI/UX' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleProjects(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectElements = document.querySelectorAll('.project-item');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects]);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
    setVisibleProjects([]);
  };

  return (
    <section className="projects">
      <div className="projects__background">
        <div className="projects__bg-element projects__bg-element--1"></div>
        <div className="projects__bg-element projects__bg-element--2"></div>
        <div className="projects__bg-element projects__bg-element--3"></div>
      </div>

      <div className="projects__container">
        {/* Section Header */}
        <div className="projects__header">
          <h2 className="projects__title">
            <span className="projects__title-gradient">My Projects</span>
          </h2>
          <p className="projects__subtitle">
            A showcase of my work and creative solutions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="projects__filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`projects__filter-btn ${
                activeFilter === category.id ? 'projects__filter-btn--active' : ''
              }`}
              onClick={() => handleFilterChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-index={index}
              className={`project-item projects__card ${
                visibleProjects.includes(index) ? 'projects__card--visible' : ''
              }`}
            >
              <div className="projects__card-inner">
                {/* Project Image */}
                <div className="projects__image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="projects__image"
                  />
                  <div className="projects__overlay">
                    <div className="projects__overlay-content">
                      <a
                        href={project.githubLink}
                        className="projects__overlay-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-github"></i>
                        Code
                      </a>
                      <a
                        href={project.liveLink}
                        className="projects__overlay-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        Live
                      </a>
                    </div>
                  </div>
                  <div className={`projects__status projects__status--${project.status}`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                </div>

                {/* Project Content */}
                <div className="projects__content">
                  <h3 className="projects__card-title">{project.title}</h3>
                  <p className="projects__description">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="projects__technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="projects__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Glow Effect */}
                <div className="projects__card-glow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="projects__coming-soon">
          <div className="projects__coming-soon-content">
            <h3>More Projects Coming Soon!</h3>
            <p>I'm constantly working on new and exciting projects. Stay tuned for updates!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;