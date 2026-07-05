import React from 'react';
import { Mail, FileText, ChevronDown } from 'lucide-react';
import { GithubIcon } from './icons';

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToContact, onScrollToProjects }) => {
  return (
    <section id="home" className="section container">
      <div className="hero-content animate-fade-in">
        <div className="hero-text">
          <div className="hero-subtitle">
            <span>👋 欢迎来到我的个人主页</span>
          </div>
          <h1 className="hero-title">
            你好，我是 <span className="text-gradient">朱剑威</span>
          </h1>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 600, color: 'var(--accent-purple)', textShadow: 'var(--glow-purple)' }}>
            AI 产品经理
          </h2>
          <p className="hero-desc" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            聚焦于 AI 视觉效果与多模态内容生成领域。擅长通过竞品拆解、全链路数据驱动迭代与 A/B 测试，优化前端交互与落地页转化率；具备敏捷开发与自动化脚本重构能力，致力于用技术与产品创新实现业务增长与人效倍增。
          </p>
          
          <div className="hero-cta">
            <button onClick={onScrollToProjects} className="btn-primary">
              查看精选项目
              <FileText size={18} />
            </button>
            <button onClick={onScrollToContact} className="btn-secondary">
              开始沟通
              <Mail size={18} />
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <a href="https://github.com/MagicalWei" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '10px' }} aria-label="GitHub">
              <GithubIcon width={20} height={20} />
            </a>
            <a href="mailto:zhuzhujianwei@163.com" className="btn-secondary" style={{ padding: '10px' }} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glass-avatar">
            <span className="hero-avatar-text">{">_<"}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', animation: 'floatIcon 2s infinite ease-in-out' }}>
        <a href="#about" aria-label="Scroll down">
          <ChevronDown size={24} style={{ color: 'var(--text-dark)' }} />
        </a>
      </div>
    </section>
  );
};
