import React from 'react';

interface TimelineItem {
  role: string;
  company: string;
  date: string;
  desc: string[];
}

export const Timeline: React.FC = () => {
  const items: TimelineItem[] = [
    {
      role: 'AI 产品实习生',
      company: '美图科技',
      date: '2026.01 - 2026.05',
      desc: [
        'AI 电商背景图 Agent 搭建：主导设计并落地电商商品背景图生成智能体，对接算法团队完成文生图模型集成与 prompt 工程优化，支持商家自定义风格、尺寸及合规校验。上线后商家调用量突破 2000 次，覆盖床上用品、电器、家具等核心类目，商品主图制作效率提升 60%。',
        '电商调研场景智能体构建：梳理商家调研全流程，搭建”竞品分析 + 用户洞察”智能体，支持自动分析竞品数据、生成调研报告。通过 RAG 提取平台交易数据，使商家调研周期从 7 天缩短至 2 天。',
        'PRD 撰写、功能落地与效果复盘：独立负责”AIGC 商品标题优化”功能的全流程落地，使用 Axure 完成产品原型设计，撰写详细的 PRD 文档，明确了标题生成的字数限制及合规校验逻辑。'
      ]
    },
    {
      role: 'AI 产品实习生',
      company: '优居科技',
      date: '2025.06 - 2025.11',
      desc: [
        'AI 智能客服系统落地：使用 Dify 搭建电商智能客服系统，梳理售后高频问题（本地生活入驻、商品上架），构建标准化问答知识库，优化意图识别与多轮对话逻辑。日均回复量超 500 次，人工客服转接率降低 35%。',
        '模型选型与 ROI 优化：负责业务场景 AI 模型需求拆解、供应商及自研模型调研选型，结合业务目标、预算成本、落地难度筛选高投产比模型方案，ROI 提升超 150%。',
        '指标评选与项目复盘：搭建机器人运营指标复盘体系，核心监控机器人曝光量、会话点击率、有效咨询转化率、人工转接率、问题解决率、留存率全链路指标。'
      ]
    }
  ];

  return (
    <section id="experience" className="section container">
      <h2 className="section-title">我的历程</h2>
      
      <div className="timeline-container">
        <div className="timeline-line" />
        
        {items.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot" />
            <div className="glass-panel timeline-card glass-card-glow animate-fade-in">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-company">{item.company}</span>
                </div>
                <span className="timeline-date">{item.date}</span>
              </div>
              <ul style={{ 
                listStyleType: 'none', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px', 
                marginTop: '15px' 
              }}>
                {item.desc.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} style={{ 
                    position: 'relative', 
                    paddingLeft: '18px', 
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: '0', 
                      top: '8px', 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      background: 'var(--accent-cyan)',
                      boxShadow: 'var(--glow-cyan)'
                    }} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
