import React, { useState, useEffect } from 'react';
import {
  Menu, X, Github, Linkedin, Mail, Phone, Code, Globe,
  User, Briefcase, MessageCircle, ChevronDown, ExternalLink,
  Terminal, Coffee, Zap, Star, ArrowUp, Moon, Sun,
  Instagram
} from 'lucide-react';
import { useTheme } from './ThemeContext.jsx';

// Reusable Button Component
const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-none border-2 font-mono font-bold transition-all duration-300 transform hover:scale-105';
  const variants = {
    primary: 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white',
    secondary: 'bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black',
    outline: 'bg-transparent text-black dark:text-white border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Reusable Card Component
const Card = ({ children, className = '', animated = true }) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-6
      ${animated ? 'transform hover:scale-105 hover:shadow-2xl dark:hover:shadow-gray-700 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Reusable Section Component
const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-mono font-black mb-12 text-center border-b-4 border-black dark:border-white pb-4">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

// Typewriter Effect Component
const TypeWriter = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

// Glitch Text Component
const GlitchText = ({ children, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 animate-pulse opacity-70 text-gray-400 dark:text-gray-500" style={{animationDuration: '2s'}}>
        {children}
      </span>
    </span>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-bounce" 
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );
};

const Portfolio = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      title: "ERP System - Biliva Nature",
      description: "Sistem ERP terintegrasi untuk manajemen stok, transaksi, dan layanan pelanggan menggunakan Laravel",
      tech: ["Laravel", "MySQL", "jQuery", "Bootstrap"],
      demo: "#",
      github: "#"
    },
    {
      title: "Muatmuat Web Application (Muattrans & Muatparts Plus)",
      description: "Aplikasi web modern dengan Next.js dan integrasi API backend untuk tampilan data dinamis",
      tech: ["Next.js", "Tailwind CSS", "API Integration", "React"],
      demo: "#",
      github: "#"
    },
    {
      title: "Ayo on Time",
      description: "Aplikasi Jurnal kehadiran siswa yang mencatat kehadiran siswa secara real-time",
      tech: ["Next.js","Tailwind CSS","API Integration","Laravel", "MySQL", "Zustand"],
      demo: "https://ayoontime.magentaa.space/",
      github: "https://github.com/Fawwazxdam/attendance-app-fe.git"
    }
  ];

  const skills = [
    { name: "Laravel", level: 85, icon: Terminal },
    { name: "Next.js", level: 80, icon: Code },
    { name: "React.js", level: 85, icon: Zap },
    { name: "Node.js", level: 75, icon: Terminal },
    { name: "JavaScript", level: 90, icon: Code },
    { name: "MySQL", level: 80, icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b-4 border-black dark:border-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black">
            <GlitchText>&lt;ADAMF/&gt;</GlitchText>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`font-bold uppercase tracking-wider hover:scale-110 transition-transform duration-300 text-black dark:text-white ${
                  activeSection === item ? 'border-b-2 border-black dark:border-white' : ''
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} className="text-black dark:text-white" /> : <Menu size={24} className="text-black dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-4 border-black dark:border-white bg-white dark:bg-gray-900">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full py-4 px-4 font-bold uppercase tracking-wider text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <FloatingElement delay={0}>
              <Terminal size={80} className="mx-auto mb-8" />
            </FloatingElement>
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black mb-6 leading-tight">
            <GlitchText>ADAM FAWWAZ HAQ</GlitchText>
          </h1>
          
          <div className="text-xl md:text-3xl mb-8 h-16">
            <TypeWriter text="WEB DEVELOPER" speed={150} />
          </div>
          
          <div className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Menciptakan pengalaman web yang luar biasa dengan teknologi Laravel, React, dan Next.js. 
            Berpengalaman dalam pengembangan sistem ERP dan aplikasi modern.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection('projects')}>
              LIHAT PORTFOLIO
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('contact')}>
              HUBUNGI SAYA
            </Button>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown size={40} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="TENTANG SAYA" className="bg-gray-100 dark:bg-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card>
              <div className="flex items-center mb-6">
                <User size={40} className="mr-4" />
                <h3 className="text-2xl font-bold">Profil Developer</h3>
              </div>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Saya adalah seorang Web Developer dengan pengalaman 3+ tahun 
                  dalam mengembangkan aplikasi web modern menggunakan teknologi seperti Laravel, React, dan Next.js.
                </p>
                <p>
                  Berpengalaman sebagai Fullstack Developer di CV. Biliva Nature Indonesia dan 
                  Frontend Programmer di Muatmuat, dengan fokus pada pengembangan aplikasi ERP dan sistem manajemen.
                </p>
                <p>
                  Alumni D2 Teknik Informatika UM dan lulusan bootcamp intensif Fullstack Web Developer 
                  dengan sertifikasi dari LSK TIK (Lembaga Sertifikasi Kompetensi Teknik Informatika).
                </p>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <div className="flex items-center mb-4">
                <Coffee size={30} className="mr-3" />
                <h4 className="text-xl font-bold">Fun Facts</h4>
              </div>
              <ul className="space-y-2">
                <li>💻 Mahir Laravel & React Ecosystem</li>
                <li>🎨 Web Developer & Graphic Designer</li>
                <li>🌍 Based in Surabaya, Indonesia</li>
                <li>📚 Continuous learner & problem solver</li>
              </ul>
            </Card>
            
            <Card>
              <div className="flex items-center mb-4">
                <Star size={30} className="mr-3" />
                <h4 className="text-xl font-bold">Pengalaman</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-bold">Frontend Programmer</div>
                  <div className="text-sm opacity-70">Muatmuat - Surabaya (Jul 2025 - Oct 2025)</div>
                </div>
                <div>
                  <div className="font-bold">IT & Fullstack Web Developer</div>
                  <div className="text-sm opacity-70">CV. Biliva Nature Indonesia - Surabaya (Jun 2023 - Jan 2025)</div>
                </div>
                <div>
                  <div className="font-bold">Freelance Web Developer</div>
                  <div className="text-sm opacity-70">Remote (Jul 2020 - Jan 2024)</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <Terminal size={30} className="mr-3" />
                <h4 className="text-xl font-bold">Pendidikan</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-bold">D2 Teknik Informatika</div>
                  <div className="text-sm opacity-70">Universitas Negeri Malang (2018 - 2022)</div>
                </div>
                <div>
                  <div className="font-bold">Intensive Bootcamp Fullstack Developer</div>
                  <div className="text-sm opacity-70">LKP Karisma Academy (2022)</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="KEAHLIAN">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <Card key={skill.name} animated={true}>
                <div className="flex items-center mb-4">
                  <IconComponent size={30} className="mr-3" />
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-white">
                  <div
                    className="h-4 bg-black dark:bg-white transition-all duration-1000 delay-300"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-right mt-2 font-bold">{skill.level}%</div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">TEKNOLOGI LAINNYA</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['PHP', 'Express.js', 'API Integration', 'Git', 'UI/UX', 'Graphic Design', 'Problem Solving'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300 font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Star size={30} className="mr-3" />
              <h4 className="text-xl font-bold">Sertifikasi</h4>
            </div>
            <p className="text-lg">
              <strong>Fullstack Web Developer</strong><br />
              Lembaga Sertifikasi Kompetensi (LSK TIK) - 2022
            </p>
          </Card>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="PORTFOLIO" className="bg-gray-100 dark:bg-gray-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.title} animated={true}>
              <div className="flex items-center mb-4">
                <Briefcase size={30} className="mr-3" />
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
              
              <p className="mb-6 leading-relaxed">{project.description}</p>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 text-sm py-2 px-4" onClick={() => window.open(project.demo, '_blank')}>
                  <ExternalLink size={16} className="mr-2" />
                  DEMO
                </Button>
                <Button variant="secondary" className="flex-1 text-sm py-2 px-4" onClick={() => window.open(project.github, '_blank')}>
                  <Github size={16} className="mr-2" />
                  CODE
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button onClick={() => window.open('https://github.com/Fawwazxdam', '_blank')}>
            LIHAT SEMUA PROJECT DI GITHUB
          </Button>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="KONTAK">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card>
              <h3 className="text-2xl font-bold mb-6">Mari Berkolaborasi!</h3>
              <p className="text-lg mb-8 leading-relaxed">
                Punya project menarik atau ingin berdiskusi tentang teknologi web? 
                Jangan ragu untuk menghubungi saya. Saya selalu terbuka untuk 
                opportunity dan kolaborasi baru dalam dunia web development!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={24} className="mr-4" />
                  <span className="text-lg">fawwazadam1005@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={24} className="mr-4" />
                  <span className="text-lg">+62 812 5235 5711</span>
                </div>
                <div className="flex items-center">
                  <Globe size={24} className="mr-4" />
                  <span className="text-lg">Surabaya, Indonesia</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Button onClick={() => window.open('https://github.com/Fawwazxdam', '_blank')}>
                  <Github size={20} className="mr-2" />
                  GITHUB
                </Button>
                <Button variant="secondary" onClick={() => window.open('https://linkedin.com/in/adam-fawwaz-a24118214', '_blank')}>
                  <Linkedin size={20} className="mr-2" />
                  LINKEDIN
                </Button>
                <Button variant="outline" onClick={() => window.open('https://instagram.com/youngdam_free', '_blank')}>
                  <Instagram size={20} className="mr-2" />
                  INSTAGRAM
                </Button>
              </div>
            </Card>
          </div>
          
          <div>
            <Card>
              <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
              <div className="space-y-6">
                <div>
                  <label className="block font-bold mb-2">NAMA</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border-2 border-black dark:border-white focus:outline-none focus:ring-0 bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">EMAIL</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border-2 border-black focus:outline-none focus:ring-0 bg-white"
                    placeholder="email@domain.com"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">PESAN</label>
                  <textarea 
                    rows="5" 
                    className="w-full p-3 border-2 border-black dark:border-white focus:outline-none focus:ring-0 resize-none bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>
                <Button className="w-full flex items-center justify-center">
                  <MessageCircle size={20} className="mr-2" />
                  <span>KIRIM PESAN</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-black mb-4">
            <GlitchText>&lt;ADAMF/&gt;</GlitchText>
          </div>
          <p className="text-lg">© 2024 Adam Fawwaz. Crafted with ❤️ and lots of ☕</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-black dark:bg-white text-white dark:text-black p-4 border-4 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors duration-300 z-50 transform hover:scale-110"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Portfolio;