import React, { useState, useEffect, useRef } from "react";
import "./RAGPreview.css";

interface RAGPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "bot";
  content: string;
}

interface MockResponse {
  queryRewrite: string;
  route: string;
  answer: string;
  chunks: Array<{
    title: string;
    category: string;
    difficulty: string;
    source: string;
    content: string;
  }>;
}

const MOCK_ANSWERS: Record<string, MockResponse> = {
  "推荐几道清淡的素菜": {
    queryRewrite: "推荐 清淡 素菜 做法",
    route: "列表推荐类 (list) - 提取并返回简炼菜品列表",
    answer: "为您推荐以下几道清淡爽口、营养健康的美味素菜：\n\n1. **清炒山药** 🥕：山药切片，搭配少许木耳和胡萝卜片，清爽香脆，滋补养胃。\n2. **蒜蓉西兰花** 🥦：西兰花焯水后，用蒜蓉清炒，保留了蔬菜天然的鲜甜与翠绿。\n3. **清炒空心菜** 🥬：大火爆炒空心菜，加入蒜泥和微量盐，爽脆清火，简单可口。\n4. **白灼菜心** 🌱：嫩滑的菜心焯水烫熟，淋上特调蒸鱼豉油与香油，清淡爽口。\n\n*提示：点击上方侧边栏参数可调整检索的块数量哦！*",
    chunks: [
      {
        title: "清炒山药",
        category: "素菜",
        difficulty: "非常简单",
        source: "qingchao_shanyao.md",
        content: "山药去皮切斜片，放入加了白醋的清水中浸泡防氧化变黑。热锅冷油，下入蒜片爆香，加入浸泡好的山药片、黑木耳和胡萝卜片，转大火快速翻炒2分钟，加入少许盐和鸡精，淋入几滴香油，翻炒均匀即可出锅。"
      },
      {
        title: "蒜蓉西兰花",
        category: "素菜",
        difficulty: "简单",
        source: "suanrong_xilanhua.md",
        content: "西兰花剪小朵洗净，锅中水烧开加少许盐和油，下西兰花焯水1分钟捞出过凉水。炒锅中放适量食用油，下大量蒜末煸炒出香味，倒入西兰花快速大火翻炒，加入适量盐、生抽、水淀粉勾芡，炒匀使汤汁裹住西兰花即可。"
      }
    ]
  },
  "红烧肉具体怎么做？": {
    queryRewrite: "红烧肉 详细制作步骤 配料 做法",
    route: "步骤指南类 (detail) - 生成结构清晰的食材清单及详细步骤",
    answer: "经典的**家常红烧肉**制作步骤如下，色泽红亮、肥而不腻：\n\n### 🛒 食材清单\n- **主料**：五花肉 500克（肥瘦相间最佳）\n- **辅料**：生姜 1块、大葱 1根、八角 2个、桂皮 1小块、冰糖 30克\n- **调料**：料酒 2汤匙、生抽 2汤匙、老抽 1汤匙、热水 适量\n\n### 🍳 制作步骤\n1. **食材准备**：五花肉切成 2cm 见方的块。生姜切片，大葱切段。\n2. **焯水去腥**：肉块冷水下锅，加入1汤匙料酒和几片姜，大火烧开撇去浮沫，煮3分钟后捞出，用温水洗净滤干。\n3. **煸炒出油**：锅内不放油，下入肉块用中小火煸炒，至表面微黄、油脂渗出，捞出肉块留底油。\n4. **炒糖色**：在底油中加入冰糖，小火不停搅拌至冰糖融化，呈现红褐色且微起泡。\n5. **上色调味**：倒入肉块快速翻炒上糖色。加入葱段、姜片、八角、桂皮炒出香味，烹入料酒、生抽和老抽。\n6. **慢火慢炖**：倒入没过肉块的热水，大火烧开后转小火，盖上锅盖焖煮 45 分钟。\n7. **大火收汁**：捞出葱姜八角等料，转大火将汤汁收至浓稠红亮，裹匀肉块即可出锅。",
    chunks: [
      {
        title: "红烧肉",
        category: "荤菜",
        difficulty: "中等",
        source: "hongshaorou.md",
        content: "红烧肉制作要点：1. 选用肥瘦相间的五花肉。 2. 焯水要冷水下锅，去除血水更彻底。 3. 炒糖色用小火慢慢熬，避免温度过高发苦。 4. 炖煮期间必须加热水而非冷水，否则肉质遇冷收缩不易炖烂。"
      }
    ]
  },
  "西红柿炒鸡蛋要放糖吗？": {
    queryRewrite: "西红柿炒鸡蛋 放糖 调味 做法",
    route: "一般性问答 (general) - 简要回答用户烹饪相关的问题",
    answer: "西红柿炒鸡蛋**放不放糖主要取决于个人的口味习惯以及西红柿本身的酸度**：\n\n1. **提鲜与中和酸味（推荐）**：一般建议放**少许白糖（约3-5克）**。现在的很多大棚西红柿偏酸，放适量白糖可以中和酸度，使口感更加温润饱满，同时还能起到提鲜的作用，让西红柿炒蛋呈现出完美的酸甜风味。\n2. **南北口味差异**：北方部分地区偏爱咸鲜原味，主张不放糖；而南方及江浙一带口味偏甜，放糖相对较多，甚至会当做甜口菜来吃。\n\n**💡 烹饪小贴士**：\n如果您买到了自然熟透、沙软多汁的草莓西红柿，其自身甜度就已经很足够，可以不额外放糖，直接翻炒即可出沙，味道极其纯正。",
    chunks: [
      {
        title: "西红柿炒鸡蛋",
        category: "素菜",
        difficulty: "非常简单",
        source: "xihongshichaogidan.md",
        content: "西红柿洗净切块，鸡蛋打入碗中加入少许盐和水打散。热锅放油，油热后倒入蛋液，炒至略微凝固后划散盛出。锅底留底油，下入西红柿块翻炒出沙，加入少许糖和盐调味（糖可中和西红柿酸度并提鲜），最后倒入炒好的鸡蛋翻炒均匀，撒上葱花即可出锅。"
      }
    ]
  }
};

export const RAGPreview: React.FC<RAGPreviewProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "你好！我是您的 RAG 烹饪智能助手。已成功加载本地知识库，您可以向我提问关于食材配方、步骤、饮食禁忌等问题。欢迎点击下方的快捷提问体验！"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // RAG Debugger States
  const [topK, setTopK] = useState(4);
  const [temperature, setTemperature] = useState(0.1);
  const [routeOverride, setRouteOverride] = useState("自动判断");
  const [debugInfo, setDebugInfo] = useState("**查询重写：** *等待提问...*\n**决策路由：** *等待判断...*");
  const [retrievedDocs, setRetrievedDocs] = useState<MockResponse["chunks"]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (text: string) => {
    if (!text.trim() || isGenerating) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInputValue("");
    setIsGenerating(true);
    
    // Set status to retrieving
    setDebugInfo("**查询重写：** `正在重写问题中...`\n**决策路由：** `正在路由意图...`\n**知识库：** `正在检索向量索引...`");
    setRetrievedDocs([]);

    // Find mock response
    let responseKey = Object.keys(MOCK_ANSWERS).find(k => text.includes(k) || k.includes(text)) || "推荐几道清淡的素菜";
    const response = MOCK_ANSWERS[responseKey];

    setTimeout(() => {
      // Step 1: Update RAG debugger
      setDebugInfo(`**查询重写：** \`${response.queryRewrite}\`\n**决策路由：** \`${response.route}\``);
      setRetrievedDocs(response.chunks.slice(0, topK));

      // Step 2: Stream response typing effect
      let currentContent = "";
      const fullAnswer = response.answer;
      let charIndex = 0;
      
      setMessages(prev => [...prev, { role: "bot", content: "" }]);

      const interval = setInterval(() => {
        if (charIndex < fullAnswer.length) {
          currentContent += fullAnswer[charIndex];
          setMessages(prev => {
            const next = [...prev];
            next[next.length - 1] = { role: "bot", content: currentContent };
            return next;
          });
          charIndex += 3; // Type 3 chars at a time to keep it lively
        } else {
          // Final complete match
          setMessages(prev => {
            const next = [...prev];
            next[next.length - 1] = { role: "bot", content: fullAnswer };
            return next;
          });
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 15);
    }, 1000);
  };

  return (
    <div className="rag-modal-overlay" onClick={onClose}>
      <div className="rag-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="rag-header">
          <div className="rag-logo-wrap">
            <div className="rag-logo-icon">🍳</div>
            <div>
              <h1 className="rag-logo-title">
                美食 RAG 智能问答系统 <span className="rag-version-badge">在线演示版</span>
              </h1>
              <p className="rag-header-desc">基于本地知识库（FAISS + BGE 向量嵌入）与大语言模型的闭环智能问答系统</p>
            </div>
          </div>
          <button className="rag-close-btn" onClick={onClose}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Outer Layout container */}
        <div className="rag-main">
          {/* Top banner warning */}
          <div className="rag-tip-banner">
            <div className="rag-tip-icon">💡</div>
            <div className="rag-tip-text">
              <strong>提示：</strong>本预览在前端完全模拟了 RAG 系统的核心运行逻辑，包括<strong>查询重写</strong>、<strong>意图路由分发</strong>、<strong>FAISS 向量检索</strong>以及<strong>流式生成输出</strong>，无需搭建后端环境即可快速预览交互。
            </div>
          </div>

          <div className="rag-workspace">
            {/* Left Sidebar (Stats + Control) */}
            <div className="rag-sidebar">
              <div className="rag-sidebar-section">
                <h3 className="rag-section-title">📊 菜谱数据看板</h3>
                <div className="rag-stats-grid">
                  <div className="rag-stat-card">
                    <div className="rag-stat-label">菜谱总数</div>
                    <div className="rag-stat-val">366 <span className="rag-stat-unit">篇</span></div>
                  </div>
                  <div className="rag-stat-card">
                    <div className="rag-stat-label">文档分块</div>
                    <div className="rag-stat-val font-orange">2025 <span className="rag-stat-unit">块</span></div>
                  </div>
                </div>
              </div>

              <div className="rag-sidebar-section">
                <h4 className="rag-sidebar-subtitle">📁 分类统计</h4>
                <div className="rag-chips-wrap">
                  <div className="rag-stat-chip"><span>🍖</span> <strong>荤菜</strong> <span className="rag-chip-num">142</span></div>
                  <div className="rag-stat-chip"><span>🥬</span> <strong>素菜</strong> <span className="rag-chip-num">98</span></div>
                  <div className="rag-stat-chip"><span>🥣</span> <strong>汤品</strong> <span className="rag-chip-num">45</span></div>
                  <div className="rag-stat-chip"><span>🍰</span> <strong>甜品</strong> <span className="rag-chip-num">31</span></div>
                  <div className="rag-stat-chip"><span>🍚</span> <strong>主食</strong> <span className="rag-chip-num">28</span></div>
                  <div className="rag-stat-chip"><span>🍹</span> <strong>饮品</strong> <span className="rag-chip-num">22</span></div>
                </div>
              </div>

              <div className="rag-sidebar-section">
                <h4 className="rag-sidebar-subtitle">⚡ 难度分布</h4>
                <div className="rag-chips-wrap">
                  <div className="rag-stat-chip"><span>🟢</span> <strong>非常简单</strong> <span className="rag-chip-num">120</span></div>
                  <div className="rag-stat-chip"><span>🔵</span> <strong>简单</strong> <span className="rag-chip-num">152</span></div>
                  <div className="rag-stat-chip"><span>🟡</span> <strong>中等</strong> <span className="rag-chip-num">75</span></div>
                  <div className="rag-stat-chip"><span>🟠</span> <strong>困难</strong> <span className="rag-chip-num">19</span></div>
                  <div className="rag-stat-chip"><span>🔴</span> <strong>非常困难</strong> <span className="rag-chip-num">2</span></div>
                </div>
              </div>

              <hr className="rag-divider" />

              <div className="rag-sidebar-section">
                <h3 className="rag-section-title">⚙️ 检索与生成配置</h3>
                <div className="rag-control-item">
                  <label className="rag-control-label">
                    <span>🔍 检索召回块数量 (Top-K)</span>
                    <span className="rag-control-val">{topK}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={topK} 
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                    className="rag-slider"
                  />
                </div>

                <div className="rag-control-item">
                  <label className="rag-control-label">
                    <span>🌡️ LLM 生成温度 (Temp)</span>
                    <span className="rag-control-val">{temperature}</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={temperature} 
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="rag-slider"
                  />
                </div>

                <div className="rag-control-item">
                  <label className="rag-control-label">🔄 强制路由模式 (Debug)</label>
                  <select 
                    value={routeOverride} 
                    onChange={(e) => setRouteOverride(e.target.value)}
                    className="rag-select"
                  >
                    <option value="自动判断">自动判断</option>
                    <option value="列表推荐类 (list)">列表推荐类 (list)</option>
                    <option value="步骤指南类 (detail)">步骤指南类 (detail)</option>
                    <option value="一般性问答 (general)">一般性问答 (general)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Panel (Chat interface & RAG Debugger) */}
            <div className="rag-main-panel">
              <div className="rag-chat-card">
                <div className="rag-chat-header">💬 智能助手机器人</div>
                
                {/* Messages View */}
                <div className="rag-chat-history">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`rag-chat-row ${msg.role === 'user' ? 'user-row' : 'bot-row'}`}>
                      <div className={`rag-chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                        {msg.content ? (
                          <div className="markdown-body" style={{ whiteSpace: 'pre-wrap' }}>
                            {msg.content}
                          </div>
                        ) : (
                          <div className="rag-loading-dots">
                            <span></span><span></span><span></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input row */}
                <div className="rag-chat-input-row">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                    placeholder="请输入烹饪问题，或点击下方的快捷提问..."
                    disabled={isGenerating}
                    className="rag-input"
                  />
                  <button 
                    onClick={() => handleSend(inputValue)} 
                    disabled={isGenerating || !inputValue.trim()}
                    className="rag-btn-send"
                  >
                    发送
                  </button>
                </div>

                {/* Quick suggestions */}
                <div className="rag-suggestions-row">
                  <span className="rag-suggestions-label">💡 快捷提问:</span>
                  <button onClick={() => handleSend("推荐几道清淡的素菜")} disabled={isGenerating} className="rag-suggestion-btn">
                    推荐几道清淡的素菜
                  </button>
                  <button onClick={() => handleSend("红烧肉具体怎么做？")} disabled={isGenerating} className="rag-suggestion-btn">
                    红烧肉具体怎么做？
                  </button>
                  <button onClick={() => handleSend("西红柿炒鸡蛋要放糖吗？")} disabled={isGenerating} className="rag-suggestion-btn">
                    西红柿炒鸡蛋要放糖吗？
                  </button>
                </div>
              </div>

              {/* RAG Debugger Accordion */}
              <div className="rag-accordion">
                <button 
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)} 
                  className="rag-accordion-toggle"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🔍</span>
                    <strong>RAG 检索召回与路由追踪 (RAG Debugger)</strong>
                  </div>
                  <span>{isAccordionOpen ? '▼' : '►'}</span>
                </button>
                
                {isAccordionOpen && (
                  <div className="rag-accordion-body">
                    {/* Debug metadata */}
                    <div className="rag-debug-metadata" style={{ whiteSpace: 'pre-wrap' }}>
                      {debugInfo.split('\n').map((line, lIdx) => {
                        const parts = line.split('：');
                        if (parts.length === 2) {
                          return (
                            <p key={lIdx} style={{ margin: '4px 0' }}>
                              <strong>{parts[0]}：</strong>
                              <code className="rag-code-span">{parts[1].replace(/`/g, '')}</code>
                            </p>
                          );
                        }
                        return <p key={lIdx} style={{ margin: '4px 0' }}>{line}</p>;
                      })}
                    </div>
                    
                    <h4 className="rag-docs-header">召回的本地菜谱文本分块 (Chunks)</h4>
                    
                    {/* Retrieved documents list */}
                    <div className="rag-docs-list">
                      {retrievedDocs.length === 0 ? (
                        <p className="rag-empty-docs">暂无召回分块</p>
                      ) : (
                        retrievedDocs.map((doc, dIdx) => (
                          <div key={dIdx} className="rag-doc-card">
                            <div className="rag-doc-header">
                              <span className="rag-doc-title">🔍 召回块 {dIdx + 1} : 《{doc.title}》</span>
                              <span className="rag-doc-badge">分类: {doc.category} | 难度: {doc.difficulty}</span>
                            </div>
                            <pre className="rag-doc-content">{doc.content}</pre>
                            <div className="rag-doc-footer">数据源: {doc.source}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Close Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
            <button
              type="button"
              onClick={onClose}
              className="aigc-btn-primary"
              style={{ minWidth: '160px' }}
            >
              关闭预览
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
