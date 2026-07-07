import React, { useState, useRef, useEffect } from "react";
import "./AIProductImageAgentPreview.css";

interface AIProductImageAgentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'ai' | 'system';
  agent?: 'planner' | 'designer';
  text: string;
  imageUrls?: string[];
}

// ─── Mock 图片素材（使用生成好的占位图） ───
const MOCK_GENERATED_IMAGES: Record<string, string[]> = {
  "护肤品精华瓶": [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1570194065650-d99fb4ee8e39?w=400&h=500&fit=crop",
  ],
  "咖啡豆袋": [
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
  ],
  "运动跑鞋": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
  ],
  "香薰蜡烛": [
    "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1602928298849-325cec8771c0?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=400&h=400&fit=crop",
  ],
};

function getImagesForProduct(product: string): string[] {
  for (const [key, imgs] of Object.entries(MOCK_GENERATED_IMAGES)) {
    if (product.includes(key.charAt(0)) || product.includes(key)) return imgs;
  }
  return MOCK_GENERATED_IMAGES["护肤品精华瓶"];
}

export const AIProductImageAgentPreview: React.FC<AIProductImageAgentPreviewProps> = ({ isOpen, onClose }) => {
  const [productInput, setProductInput] = useState("");
  const [sellingPoints, setSellingPoints] = useState("");
  const [scene, setScene] = useState("电商主图");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', agent: 'planner', text: '👋 你好！我是 AI 商品图设计助手。请告诉我你想上架什么产品，我会帮你自动生成电商场景图和营销文案。' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStep, setGeneratingStep] = useState(0);
  const [canvasImages, setCanvasImages] = useState<{ url: string; label: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, typingText]);

  // Simulate typing effect for AI responses
  const simulateTyping = (fullText: string, speed = 30): Promise<void> => {
    return new Promise((resolve) => {
      setTypingDone(false);
      setTypingText("");
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTypingText(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          setTypingDone(true);
          resolve();
        }
      }, speed);
    });
  };

  const addMessage = (msg: Omit<ChatMessage, 'imageUrls'>) => {
    setChatMessages(prev => [...prev, msg as ChatMessage]);
  };

  const handleStartGenerate = async () => {
    if (!productInput.trim()) return;
    const product = productInput.trim();
    const points = sellingPoints.trim() || "高质感、专业级";

    setIsGenerating(true);
    setGeneratingStep(0);

    // Step 1: 用户消息
    addMessage({ sender: 'user', text: `我要上架「${product}」，卖点：${points}。场景：${scene}` });

    // Step 2: Planner 分析
    await simulateTyping(
      `收到！让我分析一下...\n\n📦 **产品**：${product}\n🎯 **卖点**：${points}\n🖼️ **场景**：${scene}\n\n根据产品特征，我推荐以下风格方案：\n• 主色调：柔和自然光\n• 构图：中心构图 + 环境虚化\n• 推荐 3 个方位：正面平视、45°俯拍、场景特写\n\n正在为你生成商品图，请稍候...`,
      25
    );

    // Commit typing as message
    setChatMessages(prev => [...prev, {
      sender: 'ai', agent: 'planner',
      text: `收到！让我分析一下...\n\n📦 **产品**：${product}\n🎯 **卖点**：${points}\n🖼️ **场景**：${scene}\n\n根据产品特征，我推荐以下风格方案：\n• 主色调：柔和自然光\n• 构图：中心构图 + 环境虚化\n• 推荐 3 个方位：正面平视、45°俯拍、场景特写\n\n正在为你生成商品图，请稍候...`,
    }]);
    setTypingText("");

    // Step 3: 模拟生成 3 张图片，逐一显示
    const imgs = getImagesForProduct(product);
    const labels = ['正面主图', '45°俯拍', '场景展示'];
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    for (let i = 0; i < 3; i++) {
      setGeneratingStep(i + 1);
      await delay(800);

      const newImg = { url: imgs[i], label: `#${i + 1} ${labels[i]}` };
      setCanvasImages(prev => [...prev, newImg]);

      setChatMessages(prev => [...prev, {
        sender: 'ai', agent: 'designer',
        text: `🎨 **${labels[i]}** 生成完成并已添加到画布`,
        imageUrls: [imgs[i]],
      }]);
    }

    // Step 4: 完成
    setChatMessages(prev => [...prev, {
      sender: 'ai', agent: 'planner',
      text: `✅ **全部图片生成完毕！** 共 3 张商品图已加载到右侧画布。\n\n你可以在画布上进行抠图、加文字、调整图层顺序等操作。还需要我帮你生成营销文案吗？`,
    }]);
    setIsGenerating(false);
    setGeneratingStep(0);
  };

  const handleReset = () => {
    setProductInput("");
    setSellingPoints("");
    setScene("电商主图");
    setChatMessages([
      { sender: 'ai', agent: 'planner', text: '👋 你好！我是 AI 商品图设计助手。请告诉我你想上架什么产品，我会帮你自动生成电商场景图和营销文案。' },
    ]);
    setCanvasImages([]);
    setSelectedImage(null);
    setIsGenerating(false);
    setGeneratingStep(0);
    setTypingText("");
    setTypingDone(false);
  };

  if (!isOpen) return null;

  return (
    <div className="pimg-modal-overlay" onClick={onClose}>
      <div className="pimg-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="pimg-header">
          <div className="pimg-logo-wrap">
            <div className="pimg-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="pimg-logo-title">
                AI 电商商品图 & 文案生成 Agent <span className="pimg-version-badge">在线预览</span>
              </h1>
              <p className="pimg-header-desc">Agent 对话式生图 · 火山引擎 API · Konva 画布编辑 · ReAct 文案生成</p>
            </div>
          </div>
          <button className="pimg-close-btn" onClick={onClose}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Workspace: Left Chat + Right Canvas */}
        <div className="pimg-workspace">
          {/* ─── Left: Agent Chat Panel ─── */}
          <div className="pimg-chat-panel">
            <div className="pimg-chat-header">
              <span className="pimg-chat-header-dot" />
              <span>Agent 对话面板</span>
            </div>
            <div className="pimg-chat-body" ref={chatContainerRef}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`pimg-chat-msg ${msg.sender}`}>
                  {msg.sender === 'ai' && (
                    <div className={`pimg-chat-avatar ${msg.agent === 'designer' ? 'designer' : 'planner'}`}>
                      {msg.agent === 'designer' ? '🎨' : '🤖'}
                    </div>
                  )}
                  <div className={`pimg-chat-bubble ${msg.sender}`}>
                    <div className="pimg-chat-text">{msg.text}</div>
                    {msg.imageUrls && msg.imageUrls.length > 0 && (
                      <div className="pimg-chat-inline-images">
                        {msg.imageUrls.map((url, i) => (
                          <div key={i} className="pimg-chat-inline-img-wrap">
                            <img src={url} alt="" className="pimg-chat-inline-img" />
                            <span className="pimg-chat-inline-img-label">已入画布</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="pimg-chat-avatar user">👤</div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isGenerating && typingText && (
                <div className="pimg-chat-msg ai">
                  <div className="pimg-chat-avatar planner">🤖</div>
                  <div className="pimg-chat-bubble ai typing">
                    <div className="pimg-chat-text">{typingText}<span className="pimg-cursor-blink">|</span></div>
                  </div>
                </div>
              )}

              {/* Generating progress */}
              {isGenerating && generatingStep > 0 && (
                <div className="pimg-chat-msg ai">
                  <div className="pimg-chat-avatar designer">🎨</div>
                  <div className="pimg-chat-bubble ai">
                    <div className="pimg-generate-progress">
                      <div className="pimg-progress-bar-bg">
                        <div className="pimg-progress-bar-fill" style={{ width: `${(generatingStep / 3) * 100}%` }} />
                      </div>
                      <span className="pimg-progress-label">
                        火山引擎 Seedream 生图中... ({generatingStep}/3)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="pimg-chat-input-area">
              <div className="pimg-input-form">
                <div className="pimg-input-row">
                  <input
                    type="text"
                    className="pimg-input"
                    placeholder="输入产品名称，如：护肤品精华瓶、运动跑鞋..."
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !isGenerating) handleStartGenerate(); }}
                    disabled={isGenerating}
                  />
                  <input
                    type="text"
                    className="pimg-input pimg-input-short"
                    placeholder="卖点（可选）"
                    value={sellingPoints}
                    onChange={(e) => setSellingPoints(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>
                <div className="pimg-input-row pimg-input-row-bottom">
                  <div className="pimg-scene-chips">
                    {['电商主图', '社交媒体', '详情页横幅', '白底图'].map(s => (
                      <button
                        key={s}
                        className={`pimg-scene-chip ${scene === s ? 'active' : ''}`}
                        onClick={() => setScene(s)}
                        disabled={isGenerating}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    className="pimg-btn-generate"
                    onClick={handleStartGenerate}
                    disabled={isGenerating || !productInput.trim()}
                  >
                    {isGenerating ? (
                      <><span className="pimg-btn-spinner" />生成中...</>
                    ) : (
                      <>🚀 一键生图</>
                    )}
                  </button>
                  <button className="pimg-btn-reset" onClick={handleReset} disabled={isGenerating}>
                    重置
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right: Konva Canvas (simulated) ─── */}
          <div className="pimg-canvas-panel">
            <div className="pimg-canvas-header">
              <div className="pimg-canvas-header-left">
                <span className="pimg-canvas-dot" />
                <span>Konva 画布</span>
              </div>
              {canvasImages.length > 0 && (
                <div className="pimg-canvas-tools">
                  <button className="pimg-tool-btn active" title="选择">⊡</button>
                  <button className="pimg-tool-btn" title="抠图">✂</button>
                  <button className="pimg-tool-btn" title="文字">T</button>
                  <button className="pimg-tool-btn" title="缩放">🔍</button>
                </div>
              )}
            </div>
            <div className="pimg-canvas-body">
              {canvasImages.length === 0 ? (
                <div className="pimg-canvas-empty">
                  <div className="pimg-canvas-empty-icon">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="pimg-canvas-empty-title">画布暂为空</p>
                  <p className="pimg-canvas-empty-desc">左侧输入产品信息，生成图片后自动加载到此处</p>
                  <div className="pimg-canvas-grid-dots" />
                </div>
              ) : (
                <div className="pimg-canvas-grid">
                  {canvasImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`pimg-canvas-item ${selectedImage === idx ? 'selected' : ''}`}
                      onClick={() => setSelectedImage(selectedImage === idx ? null : idx)}
                    >
                      <div className="pimg-canvas-item-img-wrap">
                        <img src={img.url} alt={img.label} className="pimg-canvas-item-img" />
                        {selectedImage === idx && (
                          <div className="pimg-canvas-item-overlay">
                            <span className="pimg-canvas-item-selected-badge">已选中</span>
                          </div>
                        )}
                      </div>
                      <span className="pimg-canvas-item-label">{img.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Layer panel */}
            {canvasImages.length > 0 && (
              <div className="pimg-layers-panel">
                <span className="pimg-layers-title">图层 ({canvasImages.length})</span>
                {canvasImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`pimg-layer-item ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(selectedImage === idx ? null : idx)}
                  >
                    <span className="pimg-layer-icon">🖼</span>
                    <span className="pimg-layer-name">{img.label}</span>
                    <span className="pimg-layer-idx">{idx + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feature highlight bar */}
        <div className="pimg-feature-bar">
          <div className="pimg-feature-bar-item">
            <span className="pimg-feature-bar-icon">🤖</span>
            <span>Agent 对话式引导</span>
          </div>
          <div className="pimg-feature-bar-item">
            <span className="pimg-feature-bar-icon">🎨</span>
            <span>Konva 画布编辑</span>
          </div>
          <div className="pimg-feature-bar-item">
            <span className="pimg-feature-bar-icon">📝</span>
            <span>ReAct 文案生成</span>
          </div>
          <div className="pimg-feature-bar-item">
            <span className="pimg-feature-bar-icon">🛡️</span>
            <span>RAG 安全护栏</span>
          </div>
          <div className="pimg-feature-bar-item">
            <span className="pimg-feature-bar-icon">⚡</span>
            <span>火山引擎 API</span>
          </div>
        </div>
      </div>
    </div>
  );
};
