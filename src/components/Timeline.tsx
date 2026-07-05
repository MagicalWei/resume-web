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
      role: 'AI 产品实习生 / AI 训练师',
      company: '美图科技',
      date: '2026.01 - 2026.05',
      desc: [
        'Prompt 研发与调试：负责智能客服核心 Agent 的 Prompt 架构设计。引入结构化提示词与 CoT(思维链)，规范推理逻辑，使回答业务逻辑准确率从 78% 提升至 93.2%。',
        '工作流编排与调优：在 Dify 中进行多分支工作流调试，合理划定大模型边界，引入前置意图分类及 API 失败兜底容错机制，保障全链路完结率达 95%。',
        '高精度 RAG 知识库：清洗企业原始 PDF 手册与 FAQ，优化 Chunking 分块策略与元数据标记，配置两阶段检索与 Rerank 重排，首轮召回率提升 22% 并消除事实性幻觉。',
        '产品微创新与增长：主导拆解 5 款头部竞品，两周内敏捷微调上线“AI口播视频”功能，前端流失率降低 22%。主导设计 30+ 差异化功能落地页进行 A/B 测试，整体注册转化率提升 35.5%。'
      ]
    },
    {
      role: 'AI 产品实习生 / AI 训练师',
      company: '优居科技',
      date: '2025.04 - 2025.12',
      desc: [
        '模型部署与 LoRa 微调：负责部署主流大语言模型，并基于业务清洗后的数据进行 LoRa 模型微调与定向训练。',
        '评测体系与 Badcase 治理：建设涵盖 500+ 典型业务场景的 Agent 用例库与评测指标。构建 5 级 Badcase 归纳归口机制，追溯链路，使综合任务完成率由 76% 提升至 91.2%。',
        '投放自动化重构：独立拆解 100+ 账户手动上架监控痛点。通过 Spec coding，仅用 3 天开发“多开自动巡检与报警脚本”，使投放账户监控人效提升 300%。',
        'AI 多模态素材工具开发：数字化抽象并重构“文案拆解 ➜ 角色图生成 ➜ 批量去水印 ➜ 自动混剪”短视频素材全链路生成工作流。'
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
