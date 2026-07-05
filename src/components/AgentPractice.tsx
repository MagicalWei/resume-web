import React from 'react';
import { ArrowUpRight, Compass, Database, Globe } from 'lucide-react';

interface PracticeItem {
  title: string;
  desc: string;
  metricBefore: string;
  metricAfter: string;
  metricLabel: string;
  tags: string[];
  icon: React.ReactNode;
}

export const AgentPractice: React.FC = () => {
  const items: PracticeItem[] = [
    {
      title: 'Prompt 研发与思维链 (CoT)',
      desc: '负责客服智能 Agent 的提示词工程架构设计，引入结构化 Prompt 与思维链逻辑，规范大模型推理路径，显著改善回答质量与稳定性。',
      metricBefore: '78%',
      metricAfter: '93.2%',
      metricLabel: '业务逻辑准确率',
      tags: ['结构化提示词', '思维链 CoT', '推理规范'],
      icon: <Compass size={24} style={{ color: 'var(--accent-purple)' }} />
    },
    {
      title: 'Dify 多分支工作流编排',
      desc: '基于 Dify 进行多分支流调优与模型边界划分，引入前置意图分类。设计大模型外部 API 调用失败的容错与兜底分支逻辑。',
      metricBefore: '基础完结',
      metricAfter: '95%',
      metricLabel: '全链路任务完结率',
      tags: ['Dify 工作流', '意图分类', '容错兜底'],
      icon: <Compass size={24} style={{ color: 'var(--accent-cyan)' }} />
    },
    {
      title: '高精度 RAG 知识库配置',
      desc: '清洗企业 PDF 手册与业务 FAQ，优化 Chunking 分块策略与元数据标记。配置两阶段检索（向量+全文）与 Rerank 重排，消除幻觉。',
      metricBefore: '常规检索',
      metricAfter: '+22%',
      metricLabel: '首轮知识召回率',
      tags: ['RAG 知识库', 'Chunking 优化', '重排检索'],
      icon: <Database size={24} style={{ color: 'var(--accent-blue)' }} />
    },
    {
      title: 'LoRa 微调与评测闭环',
      desc: '部署预训练模型并进行 LoRa 微调；建设涵盖 500+ 业务用例的评测体系；建立 5 级 Badcase 归纳闭环，实现 Agent 定向迭代。',
      metricBefore: '76%',
      metricAfter: '91.2%',
      metricLabel: 'Agent 综合完成率',
      tags: ['LoRa 微调', '指标体系', 'Badcase 闭环'],
      icon: <Globe size={24} style={{ color: 'var(--accent-pink)' }} />
    }
  ];

  return (
    <section id="agent-practice" className="section container">
      <h2 className="section-title">Agent 与大模型实战</h2>
      
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }} className="animate-fade-in">
        <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-header)', fontWeight: 700, marginBottom: '16px' }}>
          大模型优化与 Agent 调优实践
        </h3>
        <p>
          在大模型与 Agent 落地落地中，聚焦于提示词重构、知识召回及评测闭环，以严谨的数据驱动产品深度调优，确保大模型服务稳定上线。
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '30px'
      }}>
        {items.map((item, idx) => (
          <div key={idx} className="glass-panel glass-card-glow animate-fade-in" style={{ padding: '30px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-glass)',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h4>
              </div>
              <ArrowUpRight size={18} style={{ color: 'var(--text-dark)' }} />
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>

            {/* Metric Comparison Panel */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.2)', 
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.metricLabel}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {item.metricBefore}
                  </span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>➔</span>
                  <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800, textShadow: 'var(--glow-purple)' }}>
                    {item.metricAfter}
                  </span>
                </div>
              </div>
              
              <div style={{ 
                background: idx === 1 
                  ? 'var(--grad-cyan-blue)' 
                  : idx === 2 
                    ? 'linear-gradient(135deg, var(--accent-pink), var(--accent-cyan))' 
                    : idx === 3 
                      ? 'var(--grad-pink-purple)' 
                      : 'var(--grad-primary)',
                padding: '4px 12px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                boxShadow: '0 2px 10px rgba(139, 92, 246, 0.2)'
              }}>
                指标突破
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {item.tags.map((tag, tIdx) => (
                <span key={tIdx} className="project-tag" style={{ fontSize: '0.75rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
