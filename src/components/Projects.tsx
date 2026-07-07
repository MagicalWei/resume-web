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
  onOpenVideoPreview: () => void;
  onOpenProductImagePreview: () => void;
  onOpenRAGPreview: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenVideoPreview, onOpenProductImagePreview, onOpenRAGPreview }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'fullstack'>('all');

  const projects: Project[] = [
    {
      title: 'AI口播视频功能微创新（演示模式，本地可正常运行）',
      description: '紧密追踪爆火 AI 视觉效果主导竞品拆解，优化用户从“上传”到“生成”的前端交互路径，有效提升转化人效并降低流失率。',
      category: 'design',
      tags: ['竞品拆解', '路径优化', 'A/B 测试', '流失率优化'],
      githubUrl: 'https://github.com/MagicalWei',
      liveUrl: 'https://example.com',
      icon: <Compass className="project-icon-placeholder" />,
    },
    {
      title: 'AI商品图与营销文案生成Agent',
      description: '针对电商卖家设计的一体化 AI Agent 工作台，融合对话式生图、Konva画布编辑与ReAct文案生成，实现一键生成图文并茂的可上架电商素材。',
      category: 'fullstack',
      tags: ['AI Agent', 'Konva画布', '多模态生成', '文案套件'],
      githubUrl: 'https://github.com/MagicalWei',
      liveUrl: 'https://example.com',
      icon: <Database className="project-icon-placeholder" />,
    },
    {
      title: '美食 RAG 智能问答与检索系统',
      description: '基于 366 篇本地菜谱与 2025 个结构化分块，自主设计并实现了包含查询重写、意图自动路由、FAISS 向量检索、流式回答输出与调试器的闭环 RAG 问答平台。',
      category: 'fullstack',
      tags: ['RAG 检索', 'FAISS 向量库', '意图路由', '查询重写'],
      githubUrl: 'https://github.com/MagicalWei/RAG',
      liveUrl: '#',
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
                {project.title.includes('（') ? (
                  <>
                    {project.title.split('（')[0]}
                    <span style={{ fontSize: '0.75em', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>
                      （{project.title.split('（')[1]}
                    </span>
                  </>
                ) : (
                  project.title
                )}
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
                {project.title === 'AI口播视频功能微创新（演示模式，本地可正常运行）' ? (
                  <button 
                    onClick={onOpenVideoPreview} 
                    className="project-link"
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <ExternalLink size={16} />
                    <span>在线预览</span>
                  </button>
                ) : project.title === 'AI商品图与营销文案生成Agent' ? (
                  <button 
                    onClick={onOpenProductImagePreview} 
                    className="project-link"
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <ExternalLink size={16} />
                    <span>在线预览</span>
                  </button>
                ) : (
                  <button 
                    onClick={onOpenRAGPreview} 
                    className="project-link"
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <ExternalLink size={16} />
                    <span>在线预览</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
