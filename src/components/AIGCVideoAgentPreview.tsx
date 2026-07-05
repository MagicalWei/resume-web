import React, { useState } from "react";
import "./AIGCVideoAgentPreview.css";

interface AIGCVideoAgentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Reasoning {
  industry_analysis: string;
  content_strategy: string;
  script_structure: string;
  voice_recommendation: string;
}

interface VisualDirection {
  time: string;
  direction: string;
}

interface ScriptDraft {
  spoken_text: string;
  visual_directions: VisualDirection[];
  full_script: string;
  title: string;
  tags: string[];
  duration_estimate: string;
  structure: {
    hook: string;
    body: string;
    cta: string;
  };
}

type Step = "input" | "review" | "generating" | "done";

const INDUSTRIES = [
  { value: "", label: "自动识别" },
  { value: "美业", label: "美业" },
  { value: "建材", label: "建材" },
  { value: "教育", label: "教育" },
  { value: "餐饮", label: "餐饮" },
  { value: "法律", label: "法律" },
  { value: "房产", label: "房产" },
  { value: "其他", label: "其他" },
];

const SERVICE_TYPES_BY_INDUSTRY: Record<string, { value: string; label: string }[]> = {
  "": [
    { value: "", label: "自动识别" }
  ],
  "美业": [
    { value: "", label: "自动识别" },
    { value: "脱毛", label: "脱毛项目" },
    { value: "皮肤管理", label: "皮肤管理" },
    { value: "纹眉", label: "纹眉项目" },
  ],
  "建材": [
    { value: "", label: "自动识别" },
    { value: "瓷砖地板", label: "瓷砖地板" },
    { value: "卫浴洁具", label: "卫浴洁具" },
    { value: "门窗定制", label: "门窗定制" },
    { value: "全屋定制", label: "全屋定制" },
  ],
  "教育": [
    { value: "", label: "自动识别" },
    { value: "少儿英语", label: "少儿英语" },
    { value: "考研培训", label: "考研培训" },
    { value: "兴趣特长", label: "兴趣特长" },
    { value: "升学规划", label: "升学规划" },
  ],
  "餐饮": [
    { value: "", label: "自动识别" },
    { value: "火锅烧烤", label: "火锅烧烤" },
    { value: "快餐简餐", label: "快餐简餐" },
    { value: "烘焙下午茶", label: "烘焙下午茶" },
    { value: "地方特色菜", label: "地方特色菜" },
  ],
  "法律": [
    { value: "", label: "自动识别" },
    { value: "婚姻家事", label: "婚姻家事" },
    { value: "合同纠纷", label: "合同纠纷" },
    { value: "刑事辩护", label: "刑事辩护" },
    { value: "企业法律顾问", label: "企业法律顾问" },
  ],
  "房产": [
    { value: "", label: "自动识别" },
    { value: "二手房买卖", label: "二手房买卖" },
    { value: "新房渠道", label: "新房渠道" },
    { value: "商铺租赁", label: "商铺租赁" },
  ],
  "其他": [
    { value: "", label: "自动识别" }
  ]
};

const VOICES = [
  { value: "冰糖", label: "冰糖", desc: "温柔女声" },
  { value: "茉莉", label: "茉莉", desc: "清甜女声" },
  { value: "苏打", label: "苏打", desc: "活力男声" },
  { value: "白桦", label: "白桦", desc: "沉稳男声" },
];

const MOCK_DATA: Record<string, {
  reasoning: {
    industry_analysis: string;
    content_strategy: string;
    script_structure: string;
    voice_recommendation: string;
  };
  script: {
    title: string;
    tags: string[];
    spoken_text: string;
    visual_directions: { time: string; direction: string }[];
  }
}> = {
  "美业": {
    reasoning: {
      industry_analysis: "针对美业行业进行分析，受众主要是关注个人形象与性价比的青年女性。脱毛/护肤的决策痛点在于：怕痛、怕烫伤、怕隐形消费。",
      content_strategy: "采用利益型钩子与反差钩子吸引注意，文案突出‘冰爽无痛’以及‘限时特价特惠’，结合真实的美容房场景，建立信任感与冲动型团购欲。",
      script_structure: "结构采用经典的【抛出痛点 ➔ 痛点痛击 ➔ 拿出底牌（冰点仪器）➔ 团购特价引诱 ➔ 点击下方卡片】。",
      voice_recommendation: "冰糖（温柔女声）音质清脆、亲切，极易拉近与爱美女性群体之间的距离，建立美容顾问般的信任感。"
    },
    script: {
      title: "脱毛不踩雷！299享受夏日冰爽顺滑✨ #脱毛 #夏日美肤 #美容院团购",
      tags: ["脱毛", "夏日美肤", "美容院团购"],
      spoken_text: "姐妹们！别再自己用刮毛刀瞎折腾了！不仅越刮越粗，还容易划伤皮肤！今天我给你们争取到了脱毛超级福利，原价两千多的冰点脱毛，现在团购只要九百九十九！对，你没听错，两位数都不用！我们采用最新的冰爽无痛技术，冰冰凉凉的，特别舒服。名额有限，赶紧点击下方链接抢购吧！",
      visual_directions: [
        { time: "0-3s", direction: "画面展示主播手拿刮毛刀，做出苦恼的表情，画面切到手部毛孔特写。" },
        { time: "3-8s", direction: "画面展示主播把刮毛刀扔掉，微笑展示光滑的肌肤，背景露出温馨的美容室。" },
        { time: "8-15s", direction: "镜头拉近，特写专业冰点仪的操作过程，突出冰块贴肤般的凉爽质感。" },
        { time: "15-20s", direction: "主播指着屏幕下方的团购图标，做出惊喜和推荐的手势，引导点击。" }
      ]
    }
  },
  "建材": {
    reasoning: {
      industry_analysis: "建材行业（尤其是瓷砖）受众为刚需家装散客 and 包工头。核心痛点是‘价格高、水分大、易破损、退换难’。",
      content_strategy: "采用利益型直觉钩子（‘商场便宜40%’），主打直发直销与全包售后服务。通过动作指示和镜头，展示产品坚固和光洁度，增加说服力。",
      script_structure: "结构采用【揭秘商场套路 ➔ 亮出厂家源头直发 ➔ 承诺开箱验货退换 ➔ 引导私信发送厂价单】。",
      voice_recommendation: "白桦（沉稳男声），声线厚实专业，有利于建材、大宗家装项目等决策高客单价商品的信任树立。"
    },
    script: {
      title: "佛山瓷砖源头直销，比商场省一半！🧱 #瓷砖 #家装设计 #佛山源头工厂",
      tags: ["瓷砖", "家装设计", "佛山源头工厂"],
      spoken_text: "装修想省钱的看过来！别再去普通建材市场当冤大头了。我们是佛山源头瓷砖直发，直接从窑炉产线拉到你家工地，没有中间商赚差价，比在本地商场买直接便宜百分之四十！而且我们承诺全部支持送货上门、开箱验货，有破损直接当场退换！不管是散客自装还是工长拿货，点击下方，直接发你厂价表！",
      visual_directions: [
        { time: "0-3s", direction: "画面展示喧闹的实体建材市场，主播摆手做出拒绝的动作。" },
        { time: "3-8s", direction: "画面切换到庞大的佛山瓷砖工厂仓库，堆满了各式大板砖，工人正在叉车装货。" },
        { time: "8-15s", direction: "展示瓷砖倒水防污实验、重物踩踏无损测试，证明硬度极高。" },
        { time: "15-20s", direction: "主播拿着手写厂价单向镜头展示，引导观众点击屏幕下方私信获取。" }
      ]
    }
  },
  "教育": {
    reasoning: {
      industry_analysis: "少儿英语/升学规划受众是重视教育但预算或精力受限的家长。核心痛点是‘孩子张不开嘴、课程贵、效果不明显’。",
      content_strategy: "使用‘免费英语礼包’作为利益型饵料。强调免费领取与外教互动，降低体验门槛。展现欢快氛围，降低家长抵触心理。",
      script_structure: "结构采用【发出提问（张不开嘴） ➔ 痛点痛击 ➔ 免费送体验大礼包 ➔ 承诺包邮到家 ➔ 点击下方卡片直接免邮申领】。",
      voice_recommendation: "茉莉（清甜女声），语气欢快亲和力强，契合教育、母婴行业的温馨陪伴基调。"
    },
    script: {
      title: "少儿英语兴趣课，限时免费领！📚 #少儿英语 #英语启蒙 #教育培训",
      tags: ["少儿英语", "英语启蒙", "教育培训"],
      spoken_text: "家长们注意啦！孩子英语口语总是张不开嘴？那是你没找对方法！今天我们给全市五到十岁的小朋友送出一批免费体验名额。外教互动直播课，还附赠全套精美实体绘本礼包！不用花一分钱，直接点击下方链接即可领取，名额有限，手慢无！",
      visual_directions: [
        { time: "0-3s", direction: "画面展示小孩子抓耳挠腮做英语卷子的焦躁特写。" },
        { time: "3-8s", direction: "镜头切换，小孩对着平板电脑和外教老师开心地挥手、大声跟读。" },
        { time: "8-15s", direction: "主播手拿精美的实体英文图画绘本和附赠的小礼盒，向镜头逐一翻阅展示。" },
        { time: "15-20s", direction: "主播点击平板上的‘0元抢领’绿色按钮，做出指引的动作。" }
      ]
    }
  },
  "餐饮": {
    reasoning: {
      industry_analysis: "餐饮吃喝团购受众为追求高性价比和社交聚会的年轻消费群。核心痛点是‘菜量少、锅底不纯正、价格贵’。",
      content_strategy: "采用超值套餐钩子（‘双人99吃饱’）。镜头聚焦食物沸腾的红油、拉丝牛肉等特写，产生直接的生理渴望刺激（ASMR视觉感）。",
      script_structure: "结构采用【滚烫红油开场 ➔ 特价套餐大揭秘 ➔ 菜品摆满桌全景 ➔ 催促囤券 ➔ 戳下方直接购买】。",
      voice_recommendation: "苏打（活力男声）声音阳光、快节奏，非常具有探店博主的感染力，极适合激发食欲与消费冲动。"
    },
    script: {
      title: "这家老火锅，99元吃撑双人餐！🍲 #火锅 #双人套餐 #美食团购",
      tags: ["火锅", "双人套餐", "美食团购"],
      spoken_text: "爱吃火锅的姐妹们赶紧集合！这家老火锅又整大动作了！原价两百六十八的双人套餐，今天限时抢购只要九十九！纯手工熬制牛油锅底、招牌鲜切牛肉、大片毛肚通通都有，菜品多到摆不下！赶紧点击视频下方链接，今天抢到今天就能用，吃垮老板就靠你们了！",
      visual_directions: [
        { time: "0-3s", direction: "滚烫 of 火锅红油锅底特写，毛肚在汤里‘七上八下’夹出时冒热气。" },
        { time: "3-8s", direction: "镜头拉远展示摆满大半张桌子的肥牛、毛肚、黄喉等菜品全景。" },
        { time: "8-15s", direction: "主播夹起一大片毛肚送入嘴中，做出夸张的满足和赞叹表情。" },
        { time: "15-20s", direction: "画面展示抖音团购优惠券99元的截图，主播手指指向右下方卡片。" }
      ]
    }
  },
  "法律": {
    reasoning: {
      industry_analysis: "法律咨询（如离婚）受众是遇到个人纠纷急需专业人士答疑的普通百姓。核心痛点是‘信息不对称、怕被欺负、找律师贵’。",
      content_strategy: "知识科普型钩子（‘这三样钱分不走’）以专业性吸引目标用户，随后通过提供低门槛一对一解答作为抓手，获取线索。",
      script_structure: "结构采用【干货断言 ➔ 逐条拆解要点 ➔ 反转痛点并保障 ➔ 抛出微信号/链接 ➔ 引导咨询】。",
      voice_recommendation: "白桦（沉稳男声）理智成熟、语速沉稳，特别能够传递法律人所必须的靠谱度与安全感。"
    },
    script: {
      title: "离婚财产怎么分？律师教你三招！⚖️ #法律咨询 #离婚律师 #财产纠纷",
      tags: ["法律咨询", "离婚律师", "财产纠纷"],
      spoken_text: "离婚时，这三类财产对方一分钱也分不走！第一，婚前全款买的房子；第二，个人身体受到伤害获得的保险赔偿金；第三，遗嘱中指定只归你一方的财产。如果你也遇到了婚姻纠纷，不知道怎么维护自己的权益，点击下方链接，我来为你提供专业的一对一法律解答！",
      visual_directions: [
        { time: "0-3s", direction: "主播身穿西装系领带，坐在明亮的律师事务所办公室中，面部神情严肃专业。" },
        { time: "3-8s", direction: "画面上弹出文字小动画：‘1. 婚前全款房’、‘2. 个人伤残赔偿金’。" },
        { time: "8-15s", direction: "主播手拿厚厚的案卷翻看，并直视镜头，用坚定自信的语气进行条理陈述。" },
        { time: "15-20s", direction: "镜头切到近景，桌上放着‘一对一咨询’字样立牌，主播手指指向立牌下方。" }
      ]
    }
  },
  "房产": {
    reasoning: {
      industry_analysis: "学区房/特惠新房受众是有置业焦虑但资金局限的年轻家庭。核心痛点是‘首付贵、买房怕踩雷、地段不熟’。",
      content_strategy: "用核心利益点（‘首付15万’、‘下楼重点小学’）精准锁定家庭痛点，并通过限时开发商特惠促成看房转化率。",
      script_structure: "结构采用【解决核心冲突（名校与低首付） ➔ 罗列楼盘极品配置 ➔ 推出限时折上折 ➔ 引导预约免费看房】。",
      voice_recommendation: "冰糖（温柔女声）极具邻家大姐般的亲切感，适合以真诚实在的算账方式推荐房产项目。"
    },
    script: {
      title: "低首付入读名校房，错过不再有！🏢 #新房推荐 #学区房 #买房攻略",
      tags: ["新房推荐", "学区房", "买房攻略"],
      spoken_text: "想要孩子读名校，首付预算又不够？看这套新出的稀缺学位房！首付只要十五万起，下楼就是省一级重点小学！周边交通便利，双地铁环绕，配套商业非常成熟。开发商限时特惠，名额极度紧张，点击下方链接预约看房，还能享受折上折优惠！",
      visual_directions: [
        { time: "0-3s", direction: "画面先展示金光闪闪的小学学校大门，接着展示一张算账表格（写着首付15万）" },
        { time: "3-8s", direction: "镜头推向精美装潢 of 沙盘区域与样板间内客厅的采光特写，温馨通透。" },
        { time: "8-15s", direction: "展示楼盘与周边地铁口、繁华大商场的无人机航拍示意镜头。" },
        { time: "15-20s", direction: "主播在接待大厅展示特价房源钥匙扣，指引点击下方‘免费预约看房巴士’。" }
      ]
    }
  }
};

export const AIGCVideoAgentPreview: React.FC<AIGCVideoAgentPreviewProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // 输入状态
  const [userInput, setUserInput] = useState("");
  const [industry, setIndustry] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [voice, setVoice] = useState("冰糖");

  // 流程状态
  const [step, setStep] = useState<Step>("input");
  const [loading, setLoading] = useState(false);

  // 数据
  const [reasoning, setReasoning] = useState<Reasoning | null>(null);
  const [scriptDraft, setScriptDraft] = useState<ScriptDraft | null>(null);
  const [editedScript, setEditedScript] = useState("");
  const [videoStatus, setVideoStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [audioPath, setAudioPath] = useState("");

  const [cotExpanded, setCotExpanded] = useState(true);

  // 联动逻辑
  const currentServiceTypes = SERVICE_TYPES_BY_INDUSTRY[industry] || [{ value: "", label: "自动识别" }];

  const handleIndustryChange = (val: string) => {
    setIndustry(val);
    setServiceType("");
  };

  // 步骤1：模拟生成文案
  const handleGenerateScript = () => {
    if (!userInput.trim()) return;
    setLoading(true);

    setTimeout(() => {
      // 提取匹配的 Mock 数据
      const matchedKey = industry && MOCK_DATA[industry] ? industry : "美业";
      const data = MOCK_DATA[matchedKey];

      setReasoning(data.reasoning);
      setScriptDraft({
        spoken_text: data.script.spoken_text,
        visual_directions: data.script.visual_directions,
        full_script: `标题：${data.script.title}\n口播：${data.script.spoken_text}`,
        title: data.script.title,
        tags: data.script.tags,
        duration_estimate: `${Math.ceil(data.script.spoken_text.length / 7)}s`,
        structure: {
          hook: "开局吸引",
          body: "痛点解决方案",
          cta: "引导卡片"
        }
      });
      setEditedScript(data.script.spoken_text);
      setStep("review");
      setLoading(false);
    }, 1500);
  };

  // 步骤2：模拟生成语音和视频
  const handleConfirm = () => {
    setStep("generating");
    setLoading(true);
    setVideoStatus("AI 神经网络渲染中...");

    setTimeout(() => {
      setAudioPath("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      // 模拟加载视频 URL，使用一个高质量的 Mixkit 视频做为口播数字人的演示
      setVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-woman-in-front-of-a-ring-light-41604-large.mp4");
      setVideoStatus("视频生成完成！");
      setStep("done");
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setStep("input");
    setUserInput("");
    setIndustry("");
    setServiceType("");
    setExtraContext("");
    setVoice("冰糖");
    setReasoning(null);
    setScriptDraft(null);
    setEditedScript("");
    setVideoUrl("");
    setAudioPath("");
    setVideoStatus("");
  };

  return (
    <div className="aigc-modal-overlay" onClick={onClose}>
      <div className="aigc-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="aigc-header">
          <div className="aigc-logo-wrap">
            <div className="aigc-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="aigc-logo-title">
                AI口播视频生成 Agent <span className="aigc-version-badge">在线预览</span>
              </h1>
              <p className="aigc-header-desc">多行业通用 · CoT 智能推理 · 输入大纲智能生成视频</p>
            </div>
          </div>
          <button className="aigc-close-btn" onClick={onClose}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Inner Content Area */}
        <div className="aigc-main">
          {/* Stepper */}
          <div className="aigc-stepper">
            {["输入信息", "审核文案", "生成视频"].map((label: string, i: number) => {
              const stepIdx = step === "input" ? 0 : step === "review" ? 1 : 2;
              const active = i === stepIdx;
              const done = i < stepIdx;
              return (
                <React.Fragment key={label}>
                  <div className="aigc-step-item">
                    <div
                      className={`aigc-step-num ${
                        done ? "done" : active ? "active" : "pending"
                      }`}
                    >
                      {done ? (
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`aigc-step-label ${active ? "active" : "inactive"}`}>
                      {label}
                    </span>
                  </div>
                  {i < 2 && <div className="aigc-step-line" />}
                </React.Fragment>
              );
            })}
          </div>

          {/* Step 1: Input Form */}
          {step === "input" && (
            <div className="aigc-card animate-fade-in">
              <h2 className="aigc-card-title">产品活动配置</h2>
              <p className="aigc-card-desc">输入大纲或活动点子，AI 自动化开展逻辑推理与结构重组</p>

              {/* Textarea */}
              <div className="aigc-field-group">
                <label className="aigc-label">活动大纲信息 *</label>
                <textarea
                  className="aigc-textarea"
                  rows={4}
                  placeholder="例如：XX建材店，广东佛山瓷砖直发，比商场便宜40%，支持验货退换"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>

              {/* Industry Grid Selection */}
              <div className="aigc-grid-2">
                <div className="aigc-field-group">
                  <label className="aigc-label">目标行业</label>
                  <div className="aigc-chips-wrap">
                    {INDUSTRIES.map((t: { value: string; label: string }) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => handleIndustryChange(t.value)}
                        className={`aigc-chip ${industry === t.value ? "selected" : ""}`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="aigc-field-group">
                  <label className="aigc-label">
                    {industry ? `${industry}专属项目` : "专属项目"}
                  </label>
                  <div className="aigc-chips-wrap">
                    {currentServiceTypes.map((t: { value: string; label: string }) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setServiceType(t.value)}
                        className={`aigc-chip ${serviceType === t.value ? "selected" : ""}`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extra Knowledge */}
              <div className="aigc-field-group">
                <label className="aigc-label">补充背景知识（可选）</label>
                <textarea
                  className="aigc-textarea"
                  rows={2}
                  placeholder="例如：我们主要针对自装散客，这次活动限前20个报名名额"
                  value={extraContext}
                  onChange={(e) => setExtraContext(e.target.value)}
                />
              </div>

              {/* Voices Grid */}
              <div className="aigc-field-group">
                <label className="aigc-label">配音音色</label>
                <div className="aigc-voices-grid">
                  {VOICES.map((v: { value: string; label: string; desc: string }) => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => setVoice(v.value)}
                      className={`aigc-voice-btn ${voice === v.value ? "selected" : ""}`}
                    >
                      <span className="aigc-voice-name">{v.label}</span>
                      <span className="aigc-voice-desc">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateScript}
                disabled={loading || !userInput.trim()}
                className="aigc-btn-primary"
              >
                {loading ? (
                  <>
                    <svg className="aigc-spinner" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>智能思维链（CoT）推理生成中...</span>
                  </>
                ) : (
                  <>
                    <span>一键生成口播文案</span>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: Review Form */}
          {step === "review" && reasoning && scriptDraft && (
            <div className="space-y-8 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* CoT Drawer */}
              <div className="aigc-cot-drawer">
                <button
                  type="button"
                  onClick={() => setCotExpanded(!cotExpanded)}
                  className="aigc-cot-header"
                >
                  <div className="aigc-cot-title-wrap">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="aigc-cot-title">AI 思维链推理路径</h3>
                  </div>
                  <div style={{ color: "#a3a3a3" }}>
                    {cotExpanded ? (
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </button>

                {cotExpanded && (
                  <div className="aigc-cot-body">
                    <div className="aigc-cot-section">
                      <span className="aigc-cot-section-title">行业透视</span>
                      <p className="aigc-cot-section-text">{reasoning.industry_analysis}</p>
                    </div>
                    <div className="aigc-cot-section">
                      <span className="aigc-cot-section-title">定位策略</span>
                      <p className="aigc-cot-section-text">{reasoning.content_strategy}</p>
                    </div>
                    <div className="aigc-cot-section">
                      <span className="aigc-cot-section-title">大纲框架</span>
                      <p className="aigc-cot-section-text">{reasoning.script_structure}</p>
                    </div>
                    <div className="aigc-cot-section">
                      <span className="aigc-cot-section-title">音色推荐</span>
                      <p className="aigc-cot-section-text">{reasoning.voice_recommendation}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Editable Textarea */}
              <div className="aigc-card">
                <div className="aigc-script-meta-row">
                  <div>
                    <h2 className="aigc-card-title">文案审核调整</h2>
                    <p className="aigc-card-desc" style={{ marginBottom: 0 }}>支持在此处二次修改，修改后直接转成语音配音</p>
                  </div>
                  <div className="aigc-script-stats">
                    <span>字数: <strong>{editedScript.length}</strong></span>
                    <span>预计时长: <strong>{scriptDraft.duration_estimate}</strong></span>
                  </div>
                </div>

                <div className="aigc-script-suggested-title">
                  <span className="aigc-script-dot" />
                  <span>建议标题：<strong>{scriptDraft.title}</strong></span>
                </div>

                <textarea
                  className="aigc-textarea"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.02)", fontFamily: "monospace" }}
                  rows={6}
                  value={editedScript}
                  onChange={(e) => setEditedScript(e.target.value)}
                />

                <div className="aigc-script-tags">
                  {scriptDraft.tags.map((t: string, idx: number) => (
                    <span key={idx} className="aigc-script-tag">#{t}</span>
                  ))}
                </div>
              </div>

              {/* Timeline split-screen instructions */}
              <div className="aigc-card">
                <h2 className="aigc-card-title">镜头动作脚本（只读）</h2>
                <p className="aigc-card-desc">为真人录制或剪辑师提供的画面配合动作建议，非配音内容</p>

                <div className="aigc-timeline-container">
                  {scriptDraft.visual_directions.map((vd: { time: string; direction: string }, idx: number) => (
                    <div key={idx} className="aigc-timeline-item">
                      <span className="aigc-timeline-bullet" />
                      <span className="aigc-timeline-time">{vd.time}</span>
                      <p className="aigc-timeline-desc">{vd.direction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm voice Selection */}
              <div className="aigc-card">
                <h2 className="aigc-card-title">确认配音音色</h2>
                <div className="aigc-voices-grid">
                  {VOICES.map((v: { value: string; label: string; desc: string }) => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => setVoice(v.value)}
                      className={`aigc-voice-btn ${voice === v.value ? "selected" : ""}`}
                    >
                      <span className="aigc-voice-name">{v.label}</span>
                      <span className="aigc-voice-desc">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading || !editedScript.trim()}
                className="aigc-btn-primary"
              >
                <span>确认文案，渲染生成音视频</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}

          {/* Step 3: Generating/Done */}
          {(step === "generating" || step === "done") && (
            <div className="space-y-8 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="aigc-card">
                <h2 className="aigc-card-title">口播文案备份</h2>
                <div className="aigc-preview-box">
                  <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#404040", margin: 0 }}>
                    {editedScript}
                  </p>
                </div>
              </div>

              {step === "generating" && (
                <div className="aigc-card" style={{ textAlign: "center", padding: "48px" }}>
                  <svg className="aigc-spinner" style={{ width: "32px", height: "32px", margin: "0 auto 16px auto", color: "#0A0A0A" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0" }}>音视频高速生成中</h3>
                  <p style={{ fontSize: "11px", color: "#a3a3a3", margin: 0 }}>正在协调 HeyGen / 硅基流动 进行云端高拟真渲染... ({videoStatus})</p>
                </div>
              )}

              {step === "done" && (
                <>
                  {audioPath && (
                    <div className="aigc-card">
                      <h2 className="aigc-card-title">配音音频预览</h2>
                      <div className="aigc-audio-row">
                        <audio controls className="aigc-audio-player" src={audioPath} />
                        <span className="aigc-voice-desc" style={{ fontSize: "11px", color: "#525252", fontWeight: "600" }}>
                          音色: {voice}
                        </span>
                      </div>
                    </div>
                  )}

                  {videoUrl && (
                    <div className="aigc-card">
                      <h2 className="aigc-card-title">AI口播视频渲染结果</h2>
                      <div className="aigc-video-container">
                        <div className="aigc-video-frame">
                          <video src={videoUrl} controls className="aigc-video-element" />
                        </div>
                        <a
                          href={videoUrl}
                          download="aigc_talking_avatar.mp4"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aigc-download-link"
                        >
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>下载高清视频文件</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="aigc-btn-primary"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #d4d4d4", color: "#404040" }}
                  >
                    <span>重新设计一个口播视频</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
