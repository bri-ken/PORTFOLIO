import React, { useState, useEffect, useRef } from "react";
import Silk from './components/Silk';
import DecryptedText from './components/DecryptedText';
import TiltedCard from './components/TiltedCard';
import Card from './components/Card';
import Button from './components/Button';
import Loader from './components/Loader';
import Aurora from './components/Aurora';
import Dock from './components/Dock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGamepad, 
  faMusic, 
  faCamera, 
  faBook,
  faCode,
  faBasketballBall,
  faFilm,
  faUtensils,
  faQuestionCircle // Add this import
} from '@fortawesome/free-solid-svg-icons';
// Import SVGs as direct image sources
import GitHubIcon from '/skills/github.svg';
import FacebookIcon from '/skills/facebook.svg';
import XIcon from '/skills/x.svg';
import InstagramIcon from '/skills/instagram.svg';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import QuizModal from './components/QuizModal';
import SkillsVisualizer from './components/SkillsVisualizer';
import EasterEgg from './components/EasterEgg';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = [
    { name: "About", id: "about" },
    { name: "Education", id: "education" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Hobbies", id: "hobbies" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center h-full">
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center flex-1 gap-4 sm:gap-8">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {section.name}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="py-2 space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-300"
              >
                {section.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Random loading time between 3-5 seconds
    const loadingTime = Math.random() * (5000 - 3000) + 3000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const socialLinks = [
    { icon: '/skills/facebook.svg', label: 'Facebook', url: 'https://facebook.com/kennethbrian.biag.1?mibextid=kFxxJD' },
    { icon: '/skills/x.svg', label: 'X', url: 'https://x.com/k6nbri?t=6KU6F3OSaBkK_q-HAFoRZA&s=09' },
    { icon: '/skills/instagram.svg', label: 'Instagram', url: 'https://instagram.com/k6nbri?igsh=c3l4cWszNmZva3R0' },
    { icon: '/skills/github.svg', label: 'GitHub', url: 'https://github.com/bri-ken' },
  ];

  return (
    <div className="relative min-h-screen bg-black text-gray-100 flex flex-col items-center px-4 py-8 sm:py-12 sm:px-6 md:px-8 overflow-hidden">
      {/* Quiz Floating Button - Responsive */}
      <div className="fixed bottom-20 right-6 z-50 animate-bounce">
        {/* Show icon on mobile, text on desktop */}
        <Button onClick={() => setQuizOpen(true)} className="!p-2 sm:!px-4 sm:!py-2">
          <span className="block sm:hidden">
            <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-400 shadow-lg bg-gray-900">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-blue-400 text-2xl" />
            </span>
          </span>
          <span className="hidden sm:inline">Get to know me better</span>
        </Button>
      </div>
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <EasterEgg />
      {/* Navbar */}
      <Navbar />

      {/* Aurora Background with Parallax */}
      <div 
        className="absolute top-0 left-0 right-0 h-screen z-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <Aurora
          colorStops={["#00d8ff", "#7cff67", "#00d8ff"]}
          amplitude={1.0}
          blend={0.5}
        />
      </div>

      {/* Silk Background with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      >
        <Silk speed={3} scale={1.2} color="#000000" noiseIntensity={2.0} rotation={0.1} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-6xl flex flex-col items-center mt-12 sm:mt-16">
        {/* Top Section: Image Frame (Left) and Header/Intro (Right) */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16 md:mb-24 px-4 sm:px-8 md:px-16">
          {/* Left Column: Image Frame */}
          <div className="flex-shrink-0 mt-0 sm:mt-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-700 flex items-center justify-center animate-fade-in">
              <img src="/assets/KEN.jpg" alt="Bri" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Column: Header and Intro */}
          <div className="flex-1 text-center animate-fade-in">
            <header className="text-center animate-fade-in flex flex-col justify-center items-center h-full">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-sans bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white tracking-tight leading-tight drop-shadow-md mb-2">
                I'm Kenneth
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white tracking-tight leading-tight drop-shadow-md mb-2">
                <DecryptedText
                  texts={["An As6piring Web Developer", "A Student", "I love to code"]}
                  speed={50}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="center"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white"
                  encryptedClassName="text-gray-500"
                  animateOn="view"
                  freezeDuration={3000}
                />
              </h3>
              <p className="pt-2 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed animate-slide-up delay-150 drop-shadow-sm">
                Passionate about crafting elegant solutions and turning ideas into reality through code.
              </p>
              <div className="mt-4 animate-slide-up delay-300">
                <Button onClick={() => window.location.href = '#about'}>
                  Learn More
                </Button>
              </div>
            </header>
          </div>
        </div>

        {/* Lower Sections Container (stacked vertically) */}
        <div className="w-full space-y-12 sm:space-y-16 md:space-y-24 px-4 sm:px-6 md:px-8">
          <div id="about">
            <About />
          </div>
          <div id="education">
            <Education />
          </div>
          <div id="skills">
            <Skills />
            <div className="mt-8">
              <SkillsVisualizer />
            </div>
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="hobbies">
            <Hobbies />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 w-full text-center text-gray-400 text-sm sm:text-base animate-fade-in delay-500 drop-shadow-sm py-6 sm:py-8 border-t border-gray-800 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Description */}
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto">
              Passionate about creating beautiful and functional web experiences. Always learning, always building.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About</a>
              <a href="#education" className="text-gray-400 hover:text-white transition-colors duration-300">Education</a>
              <a href="#skills" className="text-gray-400 hover:text-white transition-colors duration-300">Skills</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-300">Projects</a>
              <a href="#hobbies" className="text-gray-400 hover:text-white transition-colors duration-300">Hobbies</a>
            </div>

            {/* Contact and Location */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <p className="text-gray-300 text-sm sm:text-base">
                Get in touch: <a href="mailto:kennethbri172002@gmail.com" className="text-white hover:text-blue-400 transition-colors duration-300">kennethbri172002@gmail.com</a>
              </p>
              <span className="hidden md:inline text-gray-600">•</span>
              <p className="text-gray-300 text-sm sm:text-base">
                Location: <span className="text-white">San Pedro, Laguna</span>
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <span className="text-gray-300 text-sm sm:text-base">Built with:</span>
              <div className="flex gap-2 sm:gap-3">
                <img src="/assets/skills/react.svg" alt="React" className="w-4 h-4 sm:w-5 sm:h-5" />
                <img src="/assets/skills/tailwind.svg" alt="Tailwind" className="w-4 h-4 sm:w-5 sm:h-5" />
                <img src="/assets/skills/javascript.svg" alt="JavaScript" className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Copyright Info */}
            <div className="text-xs sm:text-sm">
              © {new Date().getFullYear()} — Built with React & Tailwind
            </div>
          </div>
        </footer>
      </div>

      {/* Sticky Contact Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center mb-2 sm:mb-4">
        <Dock items={socialLinks} />
      </div>
    </div>
  );
}

function About() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`rounded-lg p-4 sm:p-6 md:p-8 shadow-lg text-center transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 border-b-2 border-gray-700 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white text-center">
        About Me
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-4xl leading-relaxed mx-auto">
        A dedicated web developer with a keen eye for design and a passion for creating seamless user experiences. 
        Currently interning and expanding my expertise in modern web technologies. 
        When I'm not coding, you'll find me exploring new tech trends or enjoying some gaming sessions.
      </p>
    </div>
  );
}

function Education() {
  const [ref, isVisible] = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState(null);

  const education = [
    {
      school: "SharePro, Inc.",
      location: "Northgate Alabang, Muntinlupa",
      degree: "Project Management Office Intern",
      year: "2025 (Present)",
      icon: "/assets/SPI.png", // Use local asset for SharePro logo
      description: "Currently doing my internship at SharePro, Inc as an intern, gaining real-world experience IT solutions."
    },
    {
      school: "Polytechnic University of the Philippines",
      location: "Sta. Mesa, Manila",
      degree: "Bachelor of Science in Information Technology",
      year: "2021 - Present",
      icon: "/assets/PUP.jpg",
      description: "Currently pursuing my degree with focus on web development."
    },
    {
      school: "Lyceum of Alabang",
      location: "Alabang, Muntinlupa",
      degree: "Senior High School",
      year: "2019 - 2021",
      icon: "/assets/LOA.jpg",
      description: "STEM Track - Science, Technology, Engineering, and Mathematics"
    },
    {
      school: "Southville 3-A National High School",
      location: "San Pedro, Laguna",
      degree: "Junior High School",
      year: "2015 - 2019",
      icon: "/assets/SV.jpg",
      description: "Graduated with honors"
    }
  ];

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div 
      ref={ref}
      className={`text-center transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 border-b-2 border-gray-700 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white text-center">
        Education
      </h2>
      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        {/* Education Items */}
        <div className="space-y-8 sm:space-y-12">
          {education.map((edu, index) => (
            <div 
              key={index}
              className={`relative flex flex-col sm:flex-row items-center ${
                index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <button
                className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-white dark:border-gray-800 focus:outline-none transition-all duration-300 z-10 ${
                  openIndex === index ? 'bg-purple-500 scale-125 shadow-lg' : 'bg-blue-500'
                }`}
                aria-label={`Expand details for ${edu.school}`}
                onClick={() => handleToggle(index)}
                tabIndex={0}
              ></button>
              {/* Content Card */}
              <div 
                className={`w-full sm:w-5/12 group relative cursor-pointer ${
                  index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'
                }`}
                onClick={() => handleToggle(index)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleToggle(index); }}
              >
                <div className={`bg-gray-900 rounded-lg p-4 sm:p-6 transition-all duration-300 shadow-md border-2 ${
                  openIndex === index ? 'border-purple-500 bg-gray-800' : 'border-transparent hover:bg-gray-800'
                }`}>
                  {/* School Logo */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                    <img 
                      src={edu.icon} 
                      alt={edu.school} 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  {/* School Info */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{edu.school}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">{edu.location}</p>
                  <p className="text-sm sm:text-base text-white font-medium mb-2">{edu.degree}</p>
                  <p className="text-xs sm:text-sm text-blue-400 mb-4">{edu.year}</p>
                  {/* Expandable Description */}
                  <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs sm:text-sm text-gray-300">{edu.description}</p>
                  </div>
                  <div className="flex justify-center mt-2">
                    <span className={`inline-block w-6 h-1 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-purple-400 scale-x-125' : 'bg-gray-700'}`}></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const [ref, isVisible] = useScrollAnimation();

  const skills = [
    { name: "React", icon: "/assets/skills/react.svg", level: 45, description: "Building modern UIs with React hooks and components" },
    { name: "Tailwind CSS", icon: "/assets/skills/tailwind.svg", level: 50, description: "Creating responsive designs with utility-first CSS" },
    { name: "JavaScript", icon: "/assets/skills/javascript.svg", level: 48, description: "ES6+, async programming, and modern JS features" },
    { name: "HTML", icon: "/assets/skills/html.svg", level: 50, description: "Semantic markup and accessibility best practices" },
    { name: "CSS", icon: "/assets/skills/css.svg", level: 45, description: "Advanced styling, animations, and responsive design" },
    { name: "Node.js", icon: "/assets/skills/nodejs.svg", level: 40, description: "Server-side JavaScript and API development" },
    { name: "Git", icon: "/assets/skills/git.svg", level: 45, description: "Version control and collaborative development" },
    { name: "GitHub", icon: "/assets/skills/github.svg", level: 48, description: "Project management and code collaboration" },
  ];

  return (
    <div 
      ref={ref}
      className={`rounded-lg p-4 sm:p-6 md:p-8 shadow-lg text-center transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 border-b-2 border-gray-700 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white text-center">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className={`group relative flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 0.2}s`
            }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-base sm:text-xl font-semibold text-white">{skill.name}</h3>
            
            {/* Progress Bar */}
            <div className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: isVisible ? `${skill.level}%` : '0%',
                  transitionDelay: `${index * 0.2}s`
                }}
              />
            </div>

            {/* Hover Description */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-300 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [ref, isVisible] = useScrollAnimation();

  const projects = [
    {
      name: "Church Website",
      desc: "A modern and responsive website for BBJM Church, built with HTML, CSS, and JavaScript.",
      url: "https://bri-ken.github.io/BBJM/",
      image: "/assets/CHURCH.png",
      techStack: ["html", "css", "javascript"],
      features: ["Responsive Design", "Modern UI", "Interactive Elements"]
    },
    {
      name: "100 Reasons",
      desc: "A heartfelt interactive web experience showcasing 100 reasons, created with love using modern web technologies.",
      url: "https://bri-ken.github.io/HEART/",
      image: "/assets/100REASONS.png",
      techStack: ["html", "css", "javascript"],
      features: ["Interactive UI", "Animations", "Responsive Design"]
    },
    {
      name: "Personal Journal",
      desc: "A full-stack journal application with user authentication, mood tracking, and daily writing goals.",
      url: "https://journal-eight-zeta.vercel.app/",
      image: "/assets/JOURNAL.png",
      techStack: ["html", "css", "javascript"],
      features: ["Journal Entry", "Mood Tracking", "Data Export"]
    },
  ];

  return (
    <div 
      ref={ref}
      className={`rounded-lg p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 border-b-2 border-gray-700 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white text-center">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 0.2}s`
            }}
          >
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block group"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 shadow-md">
                {/* Project Image */}
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mb-4">{project.desc}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-1 sm:space-y-2">
                    {project.features.map((feature, i) => (
                      <div 
                        key={i}
                        className="flex items-center text-xs sm:text-sm text-gray-300"
                      >
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                    <span className="text-white text-xs sm:text-sm font-medium">View Project →</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hobbies() {
  const [ref, isVisible] = useScrollAnimation();

  const hobbies = [
    {
      name: "Gaming",
      description: "Passionate about competitive gaming and strategy games",
      icon: faGamepad
    },
    {
      name: "Music",
      description: "Playing guitar and listening to various genres",
      icon: faMusic
    },
    {
      name: "Photography",
      description: "Capturing moments and landscapes",
      icon: faCamera
    },
    {
      name: "Reading",
      description: "Tech blogs and science fiction novels",
      icon: faBook
    },
    {
      name: "Coding",
      description: "Exploring new technologies and building projects",
      icon: faCode
    },
    {
      name: "Basketball",
      description: "Playing and watching NBA games",
      icon: faBasketballBall
    },
    {
      name: "Movies",
      description: "Watching films and TV series",
      icon: faFilm
    },
    {
      name: "Cooking",
      description: "Experimenting with new recipes",
      icon: faUtensils
    }
  ];

  return (
    <div 
      ref={ref}
      className={`rounded-lg p-4 sm:p-6 md:p-8 shadow-lg text-center transition-all duration-1000 ${
        isVisible ? 'animate-scroll-reveal' : 'opacity-0'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 border-b-2 border-gray-700 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white text-center">
        Hobbies & Interests
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {hobbies.map((hobby, index) => (
          <div 
            key={index}
            className={`group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md ${
              isVisible ? 'animate-scroll-reveal' : 'opacity-0'
            }`}
            style={{ 
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl text-white group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={hobby.icon} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">{hobby.name}</h3>
            <p className="text-xs sm:text-sm text-gray-300">{hobby.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [ref, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div 
      ref={ref}
      className={`rounded-lg p-4 sm:p-6 md:p-8 shadow-lg text-center transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 border-b-2 border-gray-700 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white text-center">
        Get in Touch
      </h2>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name Input */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base text-white"
              placeholder="Your Name"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>

          {/* Email Input */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base text-white"
              placeholder="Your Email"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>

          {/* Message Input */}
          <div className="relative group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none text-sm sm:text-base text-white"
              placeholder="Your Message"
            ></textarea>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-3 sm:p-4 bg-green-500/20 border border-green-500 rounded-lg text-xs sm:text-sm text-green-400 animate-fade-in">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}