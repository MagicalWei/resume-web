import React from 'react';
import { Award, Briefcase, Users, Download } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="section container">
      <h2 className="section-title">关于我</h2>
      
      <div className="about-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-header)', fontWeight: 600 }}>
            数据驱动与工具效率的 AI 产品探索者
          </h3>
          <p>
            我是一名聚焦于 AI 落地实践的产品经理，致力于将先进的多模态生成技术与自动化工具转化为实际业务效率的提升。我坚信优秀的产品应当是技术、商业与用户体验的完美结合。
          </p>
          <p>
            在美图与优居科技的实习期间，我主导了竞品拆解、交互路径优化以及全链路流失漏斗分析，取得了显著的转化率提升。同时，我也热衷于通过自动化重构为团队提效，实现系统化的人效释放。
          </p>
          <div style={{ marginTop: '10px' }}>
            <a href="#" className="btn-primary" download>
              下载我的简历
              <Download size={18} />
            </a>
          </div>
        </div>

        <div className="about-cards">
          <div className="glass-panel about-card glass-card-glow">
            <Award className="about-card-icon" />
            <span className="about-card-num text-gradient">300%</span>
            <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>监控人效提升</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '4px' }}>基于广告多开巡检脚本</p>
          </div>

          <div className="glass-panel about-card glass-card-glow">
            <Briefcase className="about-card-icon" style={{ color: 'var(--accent-purple)' }} />
            <span className="about-card-num text-gradient-pink">35.5%</span>
            <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>注册转化提升</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '4px' }}>落地页 A/B 测试成绩</p>
          </div>

          <div className="glass-panel about-card glass-card-glow">
            <Users className="about-card-icon" style={{ color: 'var(--accent-blue)' }} />
            <span className="about-card-num text-gradient-cyan">-22%</span>
            <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>用户流失降低</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '4px' }}>口播视频交互路径优化</p>
          </div>

          <div className="glass-panel about-card glass-card-glow">
            <Briefcase className="about-card-icon" style={{ color: 'var(--accent-pink)' }} />
            <span className="about-card-num text-gradient">30+</span>
            <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>功能落地页</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '4px' }}>适配不同高频搜索场景</p>
          </div>
        </div>
      </div>
    </section>
  );
};
