import React, { useState, useEffect } from 'react';
import { Instagram, MessageCircle, Mail } from 'lucide-react';
import '../My Portfolio/About.scss';

const About = ({ isActive = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Hello, My Name is Jogarao";

  useEffect(() => {
    if (isActive) {
      setDisplayedText('');
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    } else {
      // Show full text immediately when not active
      setDisplayedText(fullText);
    }
  }, [isActive]);

  const skills = [
    { name: 'HTML', percentage: 90 },
    { name: 'CSS', percentage: 85 },
    { name: 'JavaScript', percentage: 80 },
    { name: 'React JS', percentage: 75 },
    { name: 'SQL', percentage: 87 },
    { name: 'Python', percentage: 85 },
    { name: 'Django', percentage: 80 }
  ];

  const personalInfo = [
    { label: 'Email', value: 'mjogarao21@gmail.com' },
    { label: 'Age', value: '21' },
    { label: 'Phone', value: '+91 9100622933' },
    { label: 'City', value: 'Bengaluru' },
    { label: 'Linkedin', value: 'https://www.linkedin.com/in/shiva-jogarao'}
  ];

  return (
    <div className="about-container">
      <div className="about-inner">

        {/* Name Animation */}
        <div className="about-heading">
          <h1>
            <span className="typing-text">
              {displayedText}
              <span className="cursor">|</span>
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="about-description">
          <p>
            I'm a passionate Full Stack Developer with expertise in both frontend and backend technologies. 
            I love creating seamless user experiences and robust server-side applications. My journey in 
            web development spans across modern frameworks and databases, allowing me to build complete 
            end-to-end solutions that are both scalable and user-friendly.
          </p>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="#"><div className="icon-box instagram"><Instagram size={24} /></div></a>
          <a href="#"><div className="icon-box whatsapp"><MessageCircle size={24} /></div></a>
          <a href="#"><div className="icon-box email"><Mail size={24} /></div></a>
        </div>

        {/* Info & Skills */}
        <div className="info-skills">
          <div className="personal-info card">
            <h3>Personal Information</h3>
            <ul>
              {personalInfo.map((info, index) => (
                <li key={index}>
                  <span>{info.label}</span>
                  <span>{info.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="technical-skills card">
            <h3>Technical Skills</h3>
            {skills.map((skill, index) => (
              <div key={index} className="skill-bar">
                <div className="label">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="about-footer">
          <p>Ready to build something amazing together? Let's connect!</p>
        </div>
      </div>
    </div>
  );
};

export default About;