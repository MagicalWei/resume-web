import React, { useState } from 'react';
import { ExternalLink, Globe, Database, Compass } from 'lucide-react';
import { GithubIcon } from './icons';

interface Project {
  title: string;
  description: string;
  category: 'frontend' | 'fullstack' | 'design';
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  icon: React.ReactNode;
}

interface ProjectsProps {
  onOpenPreview: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenPreview }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'fullstack'>('all');

  const projects: Project[] = [
    {
      title: 'AI口播视频功能微创新',
      description: '紧密追踪爆火 AI 视觉效果主导竞品拆解，优化用户从“上传”到“生成”的前端交互路径，有效提升转化人效并降低流失率。',
      category: 'design',
      tags: ['竞品拆解', '路径优化', 'A/B 测试', '流失率优化'],
      githubUrl: 'https://github.com/MagicalWei',
      liveUrl: 'https://example.com',
      icon: <Compass className="project-icon-placeholder" />,
    },
    {
      title: '广告账户多开自动巡检与报警脚本',
      description: '重构投放团队痛点，基于 Spec coding 独立编写的自动化广告监控报警脚本，实现投放巡检人效 300% 提升。',
      category: 'fullstack',
      tags: ['Spec coding', '自动化脚本', '多开巡检', '报警推送'],
      githubUrl: 'https://github.com/MagicalWei',
      liveUrl: 'https://example.com',
      icon: <Database className="project-icon-placeholder" />,
    },
    {
      title: 'AI 多模态素材批量生产工具',
      description: '深度对接视频团队，抽象设计并落地了“文案拆解 ➜ 角色图生成 ➜ 批量去水印 ➜ 自动混剪”的全链路数字化生成工具。',
      category: 'fullstack',
      tags: ['多模态生成', '工作流抽象', '短视频生产', '自动混剪'],
      githubUrl: 'https://github.com/MagicalWei',
      liveUrl: 'https://example.com',
      icon: <Globe className="project-icon-placeholder" />,
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section container">
      <h2 className="section-title">精选项目</h2>
      
      {/* Category Filter Tabs */}
      <div className="projects-filter">
        {(['all', 'design', 'fullstack'] as const).map(filter => {
          const labels: Record<string, string> = {
            all: '全部项目',
            design: '产品设计',
            fullstack: '技术研发',
          };
          return (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {labels[filter]}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="glass-panel project-card glass-card-glow animate-fade-in">
            <div className="project-image-container">
              {project.icon}
            </div>
            
            <div className="project-info">
              <h3 className="project-title" style={{ fontFamily: 'var(--font-header)', fontWeight: 700 }}>
                {project.title}
              </h3>
              <p className="project-desc">
                {project.description}
              </p>
              
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="project-links">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <GithubIcon width={16} height={16} />
                  <span>查看源码</span>
                </a>
                {project.title === 'AI口播视频功能微创新' ? (
                  <button 
                    onClick={onOpenPreview} 
                    className="project-link"
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <ExternalLink size={16} />
                    <span>在线预览</span>
                  </button>
                ) : (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    <ExternalLink />
                    <span>在线预览</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
