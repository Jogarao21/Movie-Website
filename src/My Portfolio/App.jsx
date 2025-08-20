
import React from 'react';
import Portfolio1 from './My Portfolio/Portfolio1.jsx';
import About from './My Portfolio/About.jsx'
import Skills from './My Portfolio/Skills.jsx';
import Projects from './My Portfolio/Projects.jsx';
import Contact from './My Portfolio/Contact.jsx';
import './App.css';
function App(){

  return(
   <div className="App">
<Portfolio1/>
<main>
  <section id='about'>
  <About />
</section>
<section id='skills'>
  <Skills/>
</section>
<section id='projects'>
  <Projects />
</section>
<section id='contact'>
  <Contact />
</section>
</main>
 </div>
  )
}
export default App
