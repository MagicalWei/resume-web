import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { AgentPractice } from './components/AgentPractice';
import { AIGCVideoAgentPreview } from './components/AIGCVideoAgentPreview';
import { AIProductImageAgentPreview } from './components/AIProductImageAgentPreview';
import { RAGPreview } from './components/RAGPreview';
import { Menu, X } from 'lucide-react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoPreviewOpen, setIsVideoPreviewOpen] = useState(false);
  const [isProductImagePreviewOpen, setIsProductImagePreviewOpen] = useState(false);
  const [isRAGPreviewOpen, setIsRAGPreviewOpen] = useState(false);

  // Smooth scroll tracking to highlight active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'agent-practice', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 160; // offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // adjust for floating nav height
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Background blobs for Glassmorphism depth */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating Glassmorphic Navbar */}
      <div className="navbar-container" style={{ display: (isVideoPreviewOpen || isProductImagePreviewOpen || isRAGPreviewOpen) ? 'none' : 'block' }}>
        <header className="glass-panel navbar">
          <div className="nav-logo cursor-pointer" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <span className="text-gradient">Jianwei Zhu.Resume</span>
          </div>

          <nav>
            <ul className="nav-links">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  首页
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  关于我
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('skills')}
                  className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  专业技能
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  精选项目
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('agent-practice')}
                  className={`nav-link ${activeSection === 'agent-practice' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  大模型实战
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('experience')}
                  className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  我的历程
                </button>
              </li>
            </ul>
          </nav>

          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary nav-btn"
          >
            联系我
          </button>

          {/* Mobile Menu Icon */}
          <button className="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div 
            className="glass-panel" 
            style={{ 
              marginTop: '10px', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '15px',
              borderRadius: '20px'
            }}
          >
            {['home', 'about', 'skills', 'projects', 'agent-practice', 'experience', 'contact'].map((sect) => {
              const names: Record<string, string> = {
                home: '首页',
                about: '关于我',
                skills: '专业技能',
                projects: '精选项目',
                'agent-practice': '大模型实战',
                experience: '我的历程',
                contact: '联系我',
              };
              return (
                <button
                  key={sect}
                  onClick={() => scrollToSection(sect)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: activeSection === sect ? 'var(--accent-purple)' : 'var(--text-muted)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {names[sect]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Layout Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero 
          onScrollToContact={() => scrollToSection('contact')} 
          onScrollToProjects={() => scrollToSection('projects')} 
        />
        <About />
        <Skills />
        <Projects 
          onOpenVideoPreview={() => setIsVideoPreviewOpen(true)} 
          onOpenProductImagePreview={() => setIsProductImagePreviewOpen(true)} 
          onOpenRAGPreview={() => setIsRAGPreviewOpen(true)}
        />
        <AgentPractice />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} 朱剑威. 基于 React + TypeScript + Glassmorphism 制作。</p>
        </div>
      </footer>

      {/* Modal rendered at root level to prevent stacking context clipping */}
      <AIGCVideoAgentPreview isOpen={isVideoPreviewOpen} onClose={() => setIsVideoPreviewOpen(false)} />
      <AIProductImageAgentPreview isOpen={isProductImagePreviewOpen} onClose={() => setIsProductImagePreviewOpen(false)} />
      <RAGPreview isOpen={isRAGPreviewOpen} onClose={() => setIsRAGPreviewOpen(false)} />
    </>
  );
}

export default App;
