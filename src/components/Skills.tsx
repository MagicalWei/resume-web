import React from 'react';
import { Code2, Server, Settings, Brain } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'AI 产品设计与规划',
      icon: <Code2 size={22} style={{ color: 'var(--accent-purple)' }} />,
      skills: [
        '竞品分析与功能拆解',
        '交互设计与路径优化',
        'PRD 撰写与原型设计',
        '多模态 AI 工作流设计',
      ],
    },
    {
      title: '数据分析与增长实验',
      icon: <Server size={22} style={{ color: 'var(--accent-pink)' }} />,
      skills: [
        'A/B 测试设计与评估',
        '全链路漏斗与留存分析',
        '数据看板与指标体系设计',
        'SEO 与落地页承接优化',
      ],
    },
    {
      title: '大模型与 Agent 调优',
      icon: <Brain size={22} style={{ color: 'var(--accent-cyan)' }} />,
      skills: [
        'Prompt 架构与 CoT 提示词设计',
        'RAG 知识库配置与重排优化',
        'LoRa 预训练模型微调与部署',
        'Agent 评测体系与 Badcase 治理',
      ],
    },
    {
      title: '技术与自动化能力',
      icon: <Settings size={22} style={{ color: 'var(--accent-blue)' }} />,
      skills: [
        'Spec coding / 自动化脚本',
        'Web / Android / iOS 原生开发',
        '多模态素材生成与 FFmpeg',
        'Python / JS / SQL / Tableau / PowerBI',
      ],
    },
  ];

  return (
    <section id="skills" className="section container">
      <h2 className="section-title">专业技能</h2>
      
      <div className="skills-grid">
        {categories.map((cat, idx) => (
          <div key={idx} className="glass-panel skills-category glass-card-glow" style={{ padding: '24px' }}>
            <h3 className="skills-category-title" style={{ fontSize: '1.2rem', marginBottom: '20px', gap: '8px' }}>
              {cat.icon}
              <span style={{ fontWeight: 700 }}>{cat.title}</span>
            </h3>
            
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cat.skills.map((skill, sIdx) => (
                <li key={sIdx} style={{ 
                  position: 'relative', 
                  paddingLeft: '16px', 
                  fontSize: '0.9rem', 
                  color: 'var(--text-muted)',
                  lineHeight: '1.5'
                }}>
                  <span style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '8px', 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    background: idx === 0 
                      ? 'var(--accent-purple)' 
                      : idx === 1 
                        ? 'var(--accent-pink)' 
                        : idx === 2 
                          ? 'var(--accent-cyan)' 
                          : 'var(--accent-blue)',
                    boxShadow: idx === 0 
                      ? 'var(--glow-purple)' 
                      : idx === 1 
                        ? 'var(--glow-pink)' 
                        : idx === 2 
                          ? 'var(--glow-cyan)' 
                          : 'var(--glow-blue)'
                  }} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
