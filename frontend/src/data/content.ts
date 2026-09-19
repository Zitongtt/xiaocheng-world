// ============================================================================
// 站点内容数据 —— 所有文字集中在此，方便以后直接修改
// 图片统一放在 public/images/ 下（见 public/images/README.md）
// ============================================================================

export type SectionKey =
  | "origin"
  | "drive"
  | "experience"
  | "projects"
  | "skills"
  | "thinking"
  | "life"
  | "multicolor";

export interface WheelSegment {
  key: SectionKey;
  label: string; // 色环上显示的名称（英文）
  nav: string; // 顶部导航里显示的中文名
  title: string; // 板块标题
  color: string; // 主题色
  connect: string; // 连接语
  /** 色环扇区里画的小图标（对应 SectionIcon 里的插图编号） */
  icon: string;
}

// ---------------------------------------------------------------------------
// 资源路径：GitHub Pages 项目页部署在 /<仓库名>/ 下，
// 所以所有 public 资源都不能写成根路径（/images/x.jpg 会 404），
// 统一用 asset() 拼上 Vite 的 BASE_URL。
// ---------------------------------------------------------------------------
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export function asset(p: string): string {
  return `${BASE}${p.startsWith("/") ? p : `/${p}`}`;
}

// 个人基础信息
export const PROFILE = {
  name: "程子桐",
  /** 英文名：手写体显示在中文名旁边 */
  enName: "Zitong Cheng",
  /** 学校 / 专业：首页那一行 */
  school: "湖南大学",
  major: "金融科技",
  // 首页第二行：比大标题小一号的自我介绍
  tagline: "在路上学习，在行动中成长，在探索中成为自己。",
  bio: "我是程子桐，来自重庆万州，现就读于湖南大学。喜欢走路、听歌、吹旷野的风，也喜欢用代码和设计把脑子里的想法一点点做成现实。这里收着我走过的路、做过的事，和一些还没想清楚的念头。",
  /** 首页右上角的英文小句子（两行） */
  dreamLine1: "Little Pig",
  dreamLine2: "Big Dream",
  /** 首页色环中心圆里的英文 */
  centerEn: "Open the world",
  centerCn: "of 小程",
  // 首页照片旁的「NOW」小卡片
  now: {
    label: "NOW",
    title: "湖南大学 · 在读",
    sub: "AI × 用户决策",
  },
  // 电话：留空则网站不显示电话入口（当前不公开电话）
  phone: "",
  email: "ztcheng@hnu.edu.cn",
  // 简历文件（把你的 PDF 放到 public/resume.pdf）
  resumeUrl: asset("/resume.pdf"),
};

// 色环分段（含中心 MULTICOLOR）
export const WHEEL: WheelSegment[] = [
  {
    key: "origin",
    label: "Origin",
    nav: "起点",
    title: "Origin · 起点",
    color: "#F5C518",
    icon: "home",
    connect: "所有远行，都始于一个被叫作“家乡”的地方",
  },
  {
    key: "drive",
    label: "Drive",
    nav: "行动",
    title: "Drive · 行动",
    color: "#E5484D",
    icon: "rocket",
    connect: "真正的答案，藏在一次次做过、试过、鏖战过、坚持过的行动里",
  },
  {
    key: "experience",
    label: "Moments",
    nav: "经历",
    title: "Moments · 经历",
    color: "#EC5C8D",
    icon: "star",
    connect: "比赛的价值或许就在于那些被压缩的成长、被推开的极限和高压之下更清晰的自己",
  },
  {
    key: "projects",
    label: "Making",
    nav: "创造",
    title: "Making · 创造",
    color: "#8E5BEF",
    icon: "box",
    connect:
      "项目是想法落地后留下的痕迹，也是一次次确认：再模糊的念头，也能被一点点做成现实",
  },
  {
    key: "skills",
    label: "Skills",
    nav: "能力",
    title: "Skills · 能力",
    color: "#3B82F6",
    icon: "code",
    connect:
      "技能不是一张被列出的清单，而是让想法有机会发生的方式，是用工具把现实慢慢改写的能力",
  },
  {
    key: "thinking",
    label: "Thoughts",
    nav: "思考",
    title: "Thoughts · 思考",
    color: "#8B95A1",
    icon: "cloud",
    connect: "有些话不必急着归类，有些思考值得被单独留下",
  },
  {
    key: "life",
    label: "Life",
    nav: "世界",
    title: "Life · 足迹",
    color: "#2FBF71",
    icon: "compass",
    connect:
      "旅行不是逃离，而是换一个坐标重新看自己；走远一点，也只是为了记得自己从哪里出发",
  },
];

export const MULTICOLOR = {
  key: "multicolor" as SectionKey,
  label: "About",
  nav: "关于",
  title: "About · 关于小程",
  color: "#111111",
  icon: "pig",
  /** 卡片上方（面板标题下）的旁白 */
  connect: "或许 小程就是一只会飞的小小猪 喜欢走走路 听听歌 吹吹旷野的风 看看山川湖海",
  /** 卡片下方的结语 */
  outro:
    "走到这里，也许你看到的并不是一个已经完成的答案\n只是一个正在慢慢长成自己的小小程\nThis is my world.\nStill under construction.",
};

// ---- Origin 时间轴 ----
export interface TimelineItem {
  period: string;
  school: string;
  role: string;
  img: string;
  caption: string;
}
export const ORIGIN_TIMELINE: TimelineItem[] = [
  {
    period: "2013.09 – 2019.07",
    school: "重庆市万州区电报路小学",
    role: "班长 · 少先队大队长",
    img: asset("/images/origin-elementary.jpg"),
    caption: "最早被信任、被托付的时光",
  },
  {
    period: "2019.09 – 2022.07",
    school: "重庆市万州第二高级中学",
    role: "班长 · 团支书 · 校宣传部长",
    img: asset("/images/origin-junior.jpg"),
    caption: "在集体里学着把一件事做好",
  },
  {
    period: "2022.09 – 2025.07",
    school: "重庆市万州第二高级中学",
    role: "班长 · 校纪检部长",
    img: asset("/images/origin-senior.jpg"),
    caption: "责任变得更具体，也更安静",
  },
  {
    period: "2026.09 – 至今",
    school: "湖南大学",
    role: "年级组学习部长 · 校合唱团女高声部部长",
    img: asset("/images/origin-university.jpg"),
    caption: "在更广阔的地方继续生长",
  },
];

/** 通用列表项（Projects 板块还在用） */
export interface ListItem {
  title: string;
  meta?: string;
  desc: string;
}

// ===========================================================================
// EXPERIENCE 历练 —— 时间轴
// 每一段经历分三级标注：
//   level  ：赛事/荣誉/活动的级别（国际级 / 国家级 / 省市级 / 校级 / 院级）
//   kind   ：经历的类型（学科竞赛 / 科研项目 / 文体活动 / 荣誉表彰 / 等级证书）
// 有照片的放照片（photo / photos），有文档的放可点击链接（doc / docs）。
// ===========================================================================
export type ExpLevel = "国际级" | "国家级" | "省市级" | "校级" | "院级";

/** 级别从高到低：两个板块都按这个顺序排列 */
export const LEVEL_ORDER: ExpLevel[] = ["国际级", "国家级", "省市级", "校级", "院级"];

/** 级别配色（EXPERIENCE 与 Drive 共用同一套色） */
export const EXP_LEVEL_STYLE: Record<ExpLevel, { color: string; bg: string }> = {
  国际级: { color: "#B4530A", bg: "#FEF0E0" },
  国家级: { color: "#B02A5B", bg: "#FDE9F1" },
  省市级: { color: "#1D4ED8", bg: "#E5EDFF" },
  校级: { color: "#0F766E", bg: "#DEF7F1" },
  院级: { color: "#6D28D9", bg: "#F0E9FE" },
};

export type ExpKind =
  | "学科竞赛"
  | "科研项目"
  | "文体活动"
  | "荣誉表彰"
  | "等级证书";

/** 类别配色（用于类别小标签） */
export const EXP_KIND_COLOR: Record<ExpKind, string> = {
  学科竞赛: "#EC5C8D",
  科研项目: "#8E5BEF",
  文体活动: "#F59E0B",
  荣誉表彰: "#2FBF71",
  等级证书: "#0EA5E9",
};

export interface ExpMedia {
  /** 文件名：EXPERIENCE 在 public/images/experience/，Drive 在 public/images/drive/ */
  file: string;
  /** 鼠标悬停 / 灯箱里显示的照片说明 */
  caption: string;
}

export interface ExpDoc {
  /** public/documents/ 下的文件名 */
  file: string;
  /** 链接文字 */
  label: string;
}

export interface ExperienceItem {
  id: string;
  /** 时间点，例如 "2026.08" */
  date: string;
  level: ExpLevel;
  kind: ExpKind;
  /** 赛事 / 项目 / 荣誉名称 */
  title: string;
  /** 一行补充说明（可选） */
  note?: string;
  photos?: ExpMedia[];
  /** 单张照片的快捷写法 */
  photo?: ExpMedia;
  doc?: ExpDoc;
  /** 需要多个文档链接时使用 */
  docs?: ExpDoc[];
}

const photo = (file: string, caption: string): ExpMedia => ({ file, caption });
const doc = (file: string, label: string): ExpDoc => ({ file, label });

/** 获奖照片（放 public/images/experience/） */
export const expPhotoUrl = (file: string) => asset(`/images/experience/${file}`);
/** 证明文档（放 public/documents/） */
export const expDocUrl = (file: string) => asset(`/documents/${file}`);

const SRTP_DOC = doc("hnu-2026-srtp-list.pdf", "湖南大学 2026 年大学生创新训练计划拟立项名单");

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  // ---------------- 2026 ----------------
  {
    id: "2026-huashubei",
    date: "2026.08",
    level: "国家级",
    kind: "学科竞赛",
    title: "“华数杯”全国大学生数学建模竞赛 · 国家级三等奖",
    note: "团队三人：从选题、建模到论文撰写与通宵改稿，完整走完一次竞赛流程。",
    photo: photo("huashubei.jpg", "“华数杯”全国大学生数学建模竞赛国家级三等奖证书"),
  },
  {
    id: "2026-srtp-lead",
    date: "2026.06",
    level: "国家级",
    kind: "科研项目",
    title: "主持国家级大学生创新训练计划项目：“基于 AI 智能体的高校专业成长导航系统研究——以湖南大学为例”",
    note: "项目主持人：负责选题论证、申报书撰写、任务分工与整体推进。",
    photo: photo("srtp-lead.jpg", "国家级大学生创新训练计划项目立项相关材料"),
    doc: SRTP_DOC,
  },
  {
    id: "2026-srtp-pcr",
    date: "2026.06",
    level: "国家级",
    kind: "科研项目",
    title: "参与国家级大学生创新训练计划项目：“多源乳腺癌队列中新辅助治疗 pCR 获益异质性与统计证据审计研究”",
    note: "项目成员：参与数据整理与统计分析部分的工作。",
    doc: SRTP_DOC,
  },
  {
    id: "2026-hnu-math",
    date: "2026.06",
    level: "校级",
    kind: "学科竞赛",
    title: "湖南大学数学竞赛（非数学专业类）· 二等奖",
    photo: photo("hnu-math.jpg", "湖南大学数学竞赛（非数学专业类）二等奖证书"),
  },
  {
    id: "2026-mcm",
    date: "2026.05",
    level: "国际级",
    kind: "学科竞赛",
    title: "美国大学生数学建模竞赛（MCM/ICM）· Honorable Mention（H 奖）",
    note: "全英文赛题、全英文论文，四天三夜完成建模、求解与写作。",
    photo: photo("mcm-icm.jpg", "美国大学生数学建模竞赛（MCM/ICM）Honorable Mention 证书"),
  },
  {
    id: "2026-innovation-gold",
    date: "2026.05",
    level: "校级",
    kind: "学科竞赛",
    title: "中国国际大学生创新大赛 · 湖南大学校赛金奖",
    photo: photo("innovation-gold.jpg", "中国国际大学生创新大赛湖南大学校赛金奖证书"),
  },
  {
    id: "2026-stat-modeling",
    date: "2026.05",
    level: "校级",
    kind: "学科竞赛",
    title: "第十二届全国大学生统计建模大赛 · 校赛三等奖",
    doc: doc("2026-statistics-modeling.pdf", "第十二届全国大学生统计建模大赛校赛结果"),
  },
  {
    id: "2026-zhengdabei",
    date: "2026.03",
    level: "校级",
    kind: "学科竞赛",
    title: "“正大杯”第十六届全国大学生市场调研与分析大赛 · 校赛二等奖",
    doc: doc("2026-zhengdabei.pdf", "“正大杯”第十六届全国大学生市场调研与分析大赛校赛结果"),
  },
  {
    id: "2026-youth-league",
    date: "2026",
    level: "院级",
    kind: "荣誉表彰",
    title: "湖南大学金融与统计学院 · 优秀共青团干部",
    doc: doc("2026-youth-league-commendation.pdf", "关于表彰 2026 年度五四先进集体和个人的决定"),
  },

  // ---------------- 2025 ----------------
  {
    id: "2025-sports-relay",
    date: "2025.11",
    level: "校级",
    kind: "文体活动",
    title: "湖南大学 2025 年运动会 · 甲组女子 4×100 米接力第三名",
    photo: photo("sports-relay.jpg", "湖南大学运动会甲组女子 4×100 米接力第三名"),
  },
  {
    id: "2025-athlete",
    date: "2025",
    level: "校级",
    kind: "荣誉表彰",
    title: "湖南大学运动会 · “优秀运动员”荣誉称号",
    photo: photo("sports-athlete.jpg", "湖南大学运动会“优秀运动员”荣誉证书"),
  },
  {
    id: "2025-finance",
    date: "2025.08",
    level: "国家级",
    kind: "学科竞赛",
    title: "第六届大学生财经素养大赛 · 国家级一等奖",
    photo: photo("finance-literacy.jpg", "第六届大学生财经素养大赛国家级一等奖证书"),
  },
  {
    id: "2025-kechuangbei",
    date: "2025.08",
    level: "国家级",
    kind: "学科竞赛",
    title: "“科创杯”全国大学生数学建模竞赛 · 国家级一等奖",
    photo: photo("kechuangbei.jpg", "“科创杯”全国大学生数学建模竞赛国家级一等奖证书"),
  },
  {
    id: "2025-ciyunbei",
    date: "2025.08",
    level: "国家级",
    kind: "学科竞赛",
    title: "“瓷韵杯”全国大学生文物知识挑战赛 · 一等奖",
  },

  // ---------------- 2024 ----------------
  {
    id: "2024-chemistry",
    date: "2024.07",
    level: "省市级",
    kind: "学科竞赛",
    title: "重庆市高中化学竞赛（高二组）· 市级二等奖",
    photos: [
      photo("chem-1.jpg", "重庆市高中化学竞赛（高二组）市级二等奖证书"),
      photo("chem-2.jpg", "重庆市高中化学竞赛获奖材料"),
    ],
  },
  {
    id: "2024-physics-paper",
    date: "2024.04",
    level: "省市级",
    kind: "学科竞赛",
    title: "万州区第五届物理科技小论文大赛 · 高中组二等奖、三等奖",
    note: "两篇论文分别获高中组二等奖、三等奖。",
    photos: [photo("physics-paper-2024.jpg", "万州区第五届物理科技小论文大赛获奖证书")],
  },

  // ---------------- 2023 ----------------
  {
    id: "2023-piano",
    date: "2023.12",
    level: "省市级",
    kind: "文体活动",
    title: "第 18 届重庆市中小学才艺大赛 · 键盘类市级一等奖",
    photo: photo("piano-2023.jpg", "第 18 届重庆市中小学才艺大赛键盘类市级一等奖证书"),
  },
  {
    id: "2023-physics-cq",
    date: "2023.05",
    level: "省市级",
    kind: "学科竞赛",
    title: "第十二届中学生物理科技小论文比赛 · 高中组重庆市二等奖",
    photo: photo("physics-paper-2023.jpg", "第十二届中学生物理科技小论文比赛高中组重庆市二等奖证书"),
  },
  {
    id: "2023-physics-wz",
    date: "2023.04",
    level: "省市级",
    kind: "学科竞赛",
    title: "万州区第四届物理科技小论文大赛 · 高中组一等奖",
    photo: photo("physics-paper-2023-wz.jpg", "万州区第四届物理科技小论文大赛高中组一等奖证书"),
  },
  {
    id: "2023-labor",
    date: "2023.01",
    level: "省市级",
    kind: "荣誉表彰",
    title: "“关爱未成年人‘五微行动’”· “劳育微照”重庆市三等奖",
    photo: photo("labor-award.jpg", "“关爱未成年人‘五微行动’”劳育微照重庆市三等奖"),
  },

  // ---------------- 2022 ----------------
  {
    id: "2022-cctv",
    date: "2022.04",
    level: "国家级",
    kind: "文体活动",
    title: "《强我少年志》· 央视新闻央视影音活动专区展示",
    photo: photo("cctv.jpg", "《强我少年志》在央视新闻央视影音活动专区展示"),
  },
  {
    id: "2022-zhonghuahun",
    date: "2022.05",
    level: "省市级",
    kind: "学科竞赛",
    title: "“中华魂”（强国有我）主题教育读书活动征文比赛（中学组）· 重庆市二等奖",
    photo: photo("zhonghuahun.jpg", "“中华魂”（强国有我）主题教育读书活动征文比赛重庆市二等奖证书"),
  },

  // ---------------- 2021 ----------------
  {
    id: "2021-science",
    date: "2021.07",
    level: "省市级",
    kind: "学科竞赛",
    title: "第五届重庆市青少年科学素养大赛（中学组）· 市级二等奖",
    photo: photo("science-literacy.jpg", "第五届重庆市青少年科学素养大赛（中学组）市级二等奖证书"),
  },
  {
    id: "2021-xuexiqiangguo-self",
    date: "2021.09",
    level: "省市级",
    kind: "文体活动",
    title: "学习强国“我心中的英雄”全国主题征文 · 《以爱国之心 立报国之志》选登重庆地方学习强国平台",
    photo: photo("xuexiqiangguo-1.jpg", "《以爱国之心 立报国之志》选登重庆地方学习强国平台"),
  },
  {
    id: "2021-xuexiqiangguo",
    date: "2021.03",
    level: "国家级",
    kind: "文体活动",
    title: "学习强国“爱国情·强国志·报国行”全国主题征文活动 · 国家级三等奖",
    note: "全重庆市仅两位学生获奖。",
    photo: photo("xuexiqiangguo.jpg", "学习强国“爱国情·强国志·报国行”全国主题征文活动国家级三等奖证书"),
  },

  // ---------------- 等级证书 ----------------
  {
    id: "2020-art",
    date: "2020.10",
    level: "国家级",
    kind: "等级证书",
    title: "中国美术学院社会美术水平考级 · 九级证书（最高级）",
    photo: photo("art-level9.jpg", "中国美术学院社会美术水平考级九级证书（最高级）"),
  },
  {
    id: "2019-piano",
    date: "2019.07",
    level: "国家级",
    kind: "等级证书",
    title: "中国音乐家协会钢琴考级 · 十级证书（最高级）",
    photo: photo("piano-level10.jpg", "中国音乐家协会钢琴十级证书（最高级）"),
  },
];

// ===========================================================================
// Drive 行动 —— 社会实践
// ===========================================================================
export type DriveLevel = ExpLevel;

export type DriveKind =
  | "社会实践"
  | "志愿服务"
  | "研学参访"
  | "文体活动"
  | "荣誉表彰";

export interface DriveItem {
  id: string;
  /** 参与时间（有些活动没留具体日期，就只写年份） */
  date?: string;
  level: DriveLevel;
  kind: DriveKind;
  /** 活动名称 / 做过的事 */
  title: string;
  /** 一小段描述（可选） */
  note?: string;
  photos?: ExpMedia[];
}

/** 实践照片（放 public/images/drive/） */
export const drivePhotoUrl = (file: string) => asset(`/images/drive/${file}`);

/** 类别配色（Drive 用） */
export const DRIVE_KIND_COLOR: Record<DriveKind, string> = {
  社会实践: "#E5484D",
  志愿服务: "#2FBF71",
  研学参访: "#3B82F6",
  文体活动: "#F59E0B",
  荣誉表彰: "#8E5BEF",
};

export const DRIVE_ITEMS: DriveItem[] = [
  // ---------------------------- 国家级 ----------------------------
  {
    id: "drive-hongxin",
    level: "国家级",
    kind: "志愿服务",
    title: "“红心向党”全国青年志愿宣讲活动",
    note: "担任青年宣讲志愿者，完成多场主题宣讲，被评为表现出众。",
    photos: [photo("hongxin-lecture.jpg", "“红心向党”全国青年志愿宣讲活动证明")],
  },
  {
    id: "drive-space",
    level: "国家级",
    kind: "社会实践",
    title: "“中国航天，筑梦星辰”全国青年航天知识科普行动",
    note: "参与航天知识科普的学习与传播，把科普讲给身边更多人听。",
  },
  {
    id: "drive-lowcarbon",
    date: "2024.08",
    level: "国家级",
    kind: "社会实践",
    title: "《2024 全国高校节能低碳青年行动》社会实践活动",
    note: "由北京经济循环促进会主办；积极承担社会责任、宣传节能低碳理念，获评“表现出众”。",
    photos: [photo("lowcarbon.jpg", "2024 全国高校节能低碳青年行动社会实践证书")],
  },
  {
    id: "drive-ai",
    date: "2025.09",
    level: "国家级",
    kind: "社会实践",
    title: "AI+X 高校行活动 · 社区贡献者证书",
    note: "在 OPEN AI 通识课共学系列之“AI+编程”主题学习活动中担任教学与辅导角色，获颁社区贡献者证书。",
    photos: [photo("ai-plus.jpg", "AI+X 高校行活动社区贡献者证书")],
  },
  {
    id: "drive-cctv",
    level: "国家级",
    kind: "荣誉表彰",
    title: "“新时代好少年 强国有我”主题教育活动 · 《强我少年志》在央视新闻央视影音活动专区展示",
    note: "征文作品入选央视新闻央视影音活动专区展示。",
    photos: [photo("cctv-story.jpg", "《强我少年志》在央视新闻央视影音活动专区展示")],
  },

  // ---------------------------- 省市级 ----------------------------
  {
    id: "drive-sizheng",
    level: "省市级",
    kind: "社会实践",
    title: "筹备并参与湖南省大中小学思政课一体化重要活动暨 2025 年度湖南省高校宣传部长高级研修班开班仪式",
    note: "作为工作人员参与活动筹备与现场执行。",
    photos: [
      photo("sizheng-2025.jpg", "湖南省大中小学思政课一体化重要活动暨高校宣传部长高级研修班开班仪式"),
    ],
  },
  {
    id: "drive-chuangye",
    level: "省市级",
    kind: "社会实践",
    title: "参加湖南省高校大学生创业工作推进会暨 2025 年大学生创业活动周启动仪式",
    note: "现场学习湖南省高校创业工作的推进思路与项目经验。",
    photos: [photo("chuangye-week.jpg", "湖南省高校大学生创业工作推进会暨大学生创业活动周启动仪式")],
  },
  {
    id: "drive-pinghu",
    date: "2022",
    level: "省市级",
    kind: "志愿服务",
    title: "重庆市“平湖逐梦行”“保护母亲河”等社会实践活动",
    note: "多次参与家乡的公益实践与护河行动，把志愿服务做成了习惯。",
    photos: [photo("pinghu-volunteer.jpg", "重庆市“平湖逐梦行”“保护母亲河”社会实践活动")],
  },
  {
    id: "drive-labor",
    date: "2023.01",
    level: "省市级",
    kind: "荣誉表彰",
    title: "“关爱未成年人‘五微行动’”· 获评“劳育微照”市级三等奖",
    note: "以劳动教育为主题的实践记录，获市级三等奖。",
    photos: [photo("labor-award.jpg", "“关爱未成年人‘五微行动’”劳育微照市级三等奖")],
  },

  // ---------------------------- 校级 ----------------------------
  {
    id: "drive-zhuzhou",
    level: "校级",
    kind: "研学参访",
    title: "湖南大学株洲公共服务调研活动",
    note: "走进株洲·中国动力谷，围绕公共服务与产业转型开展实地调研。",
    photos: [photo("zhuzhou.jpg", "湖南大学株洲公共服务调研活动")],
  },
  {
    id: "drive-piano-concert",
    level: "校级",
    kind: "文体活动",
    title: "湖南大学“青春麓鸣”室外音乐节 · 钢琴独奏《夕阳箫鼓》",
    note: "在室外音乐节上完成一首钢琴独奏。",
    photos: [photo("piano-concert.jpg", "湖南大学“青春麓鸣”室外音乐节钢琴独奏")],
  },
  {
    id: "drive-bank",
    level: "校级",
    kind: "研学参访",
    title: "湖南大学名企“就业早报道”走入渤海银行长沙分行活动",
    note: "实地了解银行的业务条线与用人需求，提前认识职场。",
    photos: [photo("bank-visit.jpg", "湖南大学名企“就业早报道”走入渤海银行长沙分行")],
  },
  {
    id: "drive-wzez-speech",
    date: "2025.02",
    level: "校级",
    kind: "荣誉表彰",
    title: "万州二中 2025 年春季开学典礼 · 作为全校学生代表发言并接受电台采访",
    note: "代表全校学生在开学典礼上发言，并接受电台采访。",
    photos: [photo("wzez-speech.jpg", "万州二中 2025 年春季开学典礼学生代表发言")],
  },
  {
    id: "drive-elderly",
    level: "校级",
    kind: "志愿服务",
    title: "发起并参加“奉献的青春最美丽”——走进铭雨养老公寓志愿服务活动",
    note: "活动的发起人之一：从联络对接到流程安排再到现场陪伴，全程参与。",
  },
  {
    id: "drive-national-school",
    level: "校级",
    kind: "志愿服务",
    title: "发起并参加“用我一片诚心，送你一份温暖”——走进国家学校志愿服务活动",
    note: "发起并参与送温暖志愿服务，把陪伴和物资一起带到孩子身边。",
  },

  // ---------------------------- 院级 ----------------------------
  {
    id: "drive-jintong",
    level: "院级",
    kind: "社会实践",
    title: "筹备并参与湖南大学金融与统计学院“金统探秘”活动",
    note: "参与活动策划与现场筹备，从流程设计到落地执行都跟了一遍。",
    photos: [photo("jintong-1.jpg", "金融与统计学院“金统探秘”活动")],
  },
  {
    id: "drive-yuelu-banner",
    level: "院级",
    kind: "社会实践",
    title: "“岳麓丰碑照前路，湖湘精神润青苗”金融与统计学院 2025 级本科新生团支部实践活动",
    note: "跟随团支部走进岳麓山，在实地中理解湖湘精神。",
    photos: [photo("yuelu-banner.jpg", "金融与统计学院 2025 级本科新生团支部实践活动")],
  },
  {
    id: "drive-lecture-contest",
    level: "院级",
    kind: "文体活动",
    title: "筹备并参与湖南大学金融与统计学院岳麓书院讲习大赛",
    note: "从筹备到上台，把岳麓书院的故事讲给更多人听。",
    photos: [photo("lecture-contest.jpg", "金融与统计学院岳麓书院讲习大赛")],
  },
];


// ===========================================================================
// Projects 创造 —— 项目经历
// 每个项目写清四件事：是什么（summary）、我在里面是谁（role）、
// 我具体做了什么（duties）、留下了什么（photos / docs / tags）。
// ===========================================================================
export type ProjectKind = "科研项目" | "竞赛项目";

export const PROJECT_KIND_COLOR: Record<ProjectKind, string> = {
  科研项目: "#8E5BEF",
  竞赛项目: "#EC5C8D",
};

/** 角色配色（负责人 / 核心成员） */
export const PROJECT_ROLE_COLOR: Record<string, string> = {
  项目负责人: "#B02A5B",
  核心成员: "#1D4ED8",
};

export interface ProjectItem {
  id: string;
  /** 起止时间，例如 "2026.06 – 至今" */
  period: string;
  kind: ProjectKind;
  /** 级别小标签：国家级大创 / 参赛作品 … */
  level: string;
  /** 在项目里的角色 */
  role: string;
  /** 项目全称 */
  title: string;
  /** 一句话讲清这个项目在解决什么问题 */
  summary: string;
  /** 主要负责的部分 */
  duties: string[];
  /** 技术 / 方法关键词 */
  tags?: string[];
  photos?: ExpMedia[];
  docs?: ExpDoc[];
}

/** 项目照片（放 public/images/projects/） */
export const projectPhotoUrl = (file: string) => asset(`/images/projects/${file}`);

/** HypoWeaver-Qwen 参赛作品材料 */
const HYPOWEAVER_DOC = doc(
  "hypoweaver-qwen.pdf",
  "HypoWeaver-Qwen 参赛作品材料",
);

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: "proj-srtp-navigation",
    period: "2026.06 – 至今",
    kind: "科研项目",
    level: "国家级大创",
    role: "项目负责人",
    title: "基于 AI 智能体的高校专业成长导航系统研究——以湖南大学为例",
    summary:
      "从“我该选什么专业、接下来往哪走”这个很多大学生都会卡住的真实问题出发，试着用 AI 智能体把散落在培养方案、课程信息与学长经验里的东西组织起来，做成一个可以被反复追问、能给出成长路径建议的导航系统。",
    duties: [
      "选题论证与申报书撰写：把模糊的困惑收敛成一个可以研究的问题",
      "项目统筹：任务分工、进度推进与阶段性复盘",
      "模型开发：参与知识库构建、检索增强与智能体工具调用链路的实现",
      "路演答辩：负责展示材料与现场答疑",
    ],
    tags: ["AI Agent", "RAG", "知识库", "需求调研"],
    photos: [photo("srtp-navigation-defense.jpg", "创新训练计划项目路演答辩现场")],
    docs: [SRTP_DOC],
  },
  {
    id: "proj-srtp-pcr",
    period: "2026.06 – 至今",
    kind: "科研项目",
    level: "国家级大创",
    role: "核心成员",
    title: "多源乳腺癌队列中新辅助治疗 pCR 获益异质性与统计证据审计研究",
    summary:
      "同一个治疗结论，在不同人群、不同数据来源里未必都站得住。这个项目把多个乳腺癌队列放在一起，检验新辅助治疗 pCR 获益的异质性，并对支撑结论的统计证据做一次系统审计。",
    duties: [
      "数据采集：多源队列的检索、变量提取与清洗对齐",
      "参与异质性检验与效应量合并，配合完成敏感性分析",
      "论文撰写：结果与讨论部分成稿，图表与参考文献核对",
    ],
    tags: ["数据清洗", "异质性分析", "统计审计", "论文写作"],
    docs: [SRTP_DOC],
  },
  {
    id: "proj-hypoweaver",
    period: "2026.04 – 2026.09",
    kind: "竞赛项目",
    level: "参赛作品",
    role: "核心成员",
    title:
      "HypoWeaver-Qwen：面向社会科学实证研究的证据驱动型 AI Scientist",
    summary:
      "想让 AI 不只停在“写一段像样的话”，而是能沿着“提出问题—找证据—形成假设—回头验证”的链条，把社会科学实证研究往前推一步。我负责的是其中最基础的一段：把散落的文献变成可以被检索、被追问的证据。",
    duties: [
      "文献调研：梳理领域现状，明确系统真正要解决的痛点",
      "检索抽取：设计并实现从论文中抽取研究设计、变量与结论的流程",
      "RAG 问答实现：基于 Qwen 搭建问答链路，让每句结论都能追溯到原始文献",
    ],
    tags: ["RAG", "Qwen", "信息抽取", "文献调研"],
    docs: [HYPOWEAVER_DOC],
  },
];

// ===========================================================================
// Skills 抽卡玩法：技能卡 / 兴趣卡两副牌
// 每张牌 = 一个称号 + 一句小程视角的说明 + 一幅动漫插画
//   art  ：SkillArt 组件里的插画编号（见 components/sections/SkillsArt.tsx）
//   accent：卡片主题色
// 页面不再罗列全部卡片，只靠按钮抽卡，抽到才揭晓。
// ===========================================================================
export type SkillPool = "skill" | "interest";

export interface SkillCard {
  id: string;
  name: string;
  desc: string;
  /** SkillArt 里的插画编号 */
  art: string;
  accent: string;
}

export const SKILL_DECK: SkillCard[] = [
  {
    id: "python",
    name: "Python",
    desc: "最顺手的一门语言：爬数据、跑模型、把重复的活儿交给循环。建模比赛的代码基本都在它上面长大。",
    art: "python",
    accent: "#3776AB",
  },
  {
    id: "c",
    name: "C 语言",
    desc: "计算机的入门课，也是第一次真正搞懂「内存、指针、地址」的地方。基础不花哨，但很结实。",
    art: "c",
    accent: "#5C6BC0",
  },
  {
    id: "r",
    name: "R 语言",
    desc: "统计人的老伙计：问卷、回归、假设检验，画图也能画得挺好看，适合把数据讲成一个故事。",
    art: "r",
    accent: "#276DC3",
  },
  {
    id: "wps",
    name: "WPS",
    desc: "表格、文档、演示三件套。活动方案、数据台账、答辩 PPT，很多个夜晚都是它陪着熬过去的。",
    art: "wps",
    accent: "#E5484D",
  },
  {
    id: "drawio",
    name: "draw.io",
    desc: "喜欢把脑子里缠绕的流程画成一张图：框、线、箭头一摆好，思路就跟着清楚了。",
    art: "drawio",
    accent: "#F08705",
  },
  {
    id: "plan",
    name: "活动策划与组织",
    desc: "从写方案、排流程、对接人到现场盯每一个环节。最大的收获是：计划永远要留 B 计划。",
    art: "plan",
    accent: "#EC5C8D",
  },
  {
    id: "team",
    name: "团队协作",
    desc: "当组员时把交给我的那块做扎实，当负责人时把大家的长处放到对的位置上。",
    art: "team",
    accent: "#2FBF71",
  },
  {
    id: "speak",
    name: "演讲与表达",
    desc: "上台这件事从紧张到慢慢习惯：开学典礼上作为学生代表发过言，答辩时也敢直接看评委的眼睛。",
    art: "speak",
    accent: "#F59E0B",
  },
  {
    id: "modeling",
    name: "数学建模",
    desc: "把一个模糊的现实问题翻译成公式，再写代码算出来、写成论文讲清楚——三天，常常只睡几个小时。",
    art: "modeling",
    accent: "#8E5BEF",
  },
  {
    id: "data",
    name: "数据分析",
    desc: "先清洗再描述，不急着下结论。让数据自己说话，比先有观点再找证据可靠得多。",
    art: "data",
    accent: "#0EA5E9",
  },
  {
    id: "market",
    name: "市场调研",
    desc: "设计问卷、发出去、收回来，再把一堆选项变成能支撑结论的图表。做过正大杯，才知道样本有多重要。",
    art: "market",
    accent: "#14B8A6",
  },
  {
    id: "track",
    name: "田径",
    desc: "跑道上最公平：练了多少，秒表上就写多少。校运会 4×100 米接力的那一棒，现在还记得风的声音。",
    art: "track",
    accent: "#EF4444",
  },
  {
    id: "cet4",
    name: "CET-4",
    desc: "英语四级已过。读英文文献、写英文摘要的时候，它是最基础的那块垫脚石。",
    art: "cet4",
    accent: "#6366F1",
  },
];

export const INTEREST_DECK: SkillCard[] = [
  {
    id: "piano",
    name: "钢琴",
    desc: "中国音乐家协会十级。音乐节上弹过《夕阳箫鼓》，更多的时候是弹给自己听——心情乱的时候，琴键会替我理清楚。",
    art: "piano",
    accent: "#8E5BEF",
  },
  {
    id: "travel",
    name: "旅行",
    desc: "喜欢吹旷野的风。走远一点，不是为了逃离，而是换一个坐标重新看看自己。",
    art: "travel",
    accent: "#0EA5E9",
  },
  {
    id: "sing",
    name: "唱歌 / 合唱",
    desc: "合唱团女高声部部长。一群人把声音叠在一起的瞬间，是很上瘾的。",
    art: "sing",
    accent: "#EC5C8D",
  },
  {
    id: "art",
    name: "美术",
    desc: "中国美术学院社会美术水平考级九级（最高级）。喜欢把看到的东西画下来，也喜欢科幻绘画那种天马行空。",
    art: "art",
    accent: "#F59E0B",
  },
  {
    id: "guzheng",
    name: "古筝",
    desc: "手指按在弦上的那种震动很治愈。会一点，远不算精，但很享受。",
    art: "guzheng",
    accent: "#14B8A6",
  },
  {
    id: "hulusi",
    name: "葫芦丝",
    desc: "声音软软的一件小乐器。吹起来像把一段云南的雾带在身边。",
    art: "hulusi",
    accent: "#22C55E",
  },
  {
    id: "guitar",
    name: "吉他",
    desc: "正在慢慢练。和弦按得还不太干净，但已经能自弹自唱几句了。",
    art: "guitar",
    accent: "#F97316",
  },
  {
    id: "writing",
    name: "写作",
    desc: "从学习强国征文到央视影音展示，写东西一直是我整理自己的方式：说不清的事，写下来就清楚了。",
    art: "writing",
    accent: "#3B82F6",
  },
];

// ---- Thinking 思考碎片 ----
export const THINKING_NOTES: string[] = [
  "把一件事做完了，和把它做对了，中间隔着很多次“再来一次”。",
  "比起“我很擅长”，我更愿意相信“我还可以学”。",
  "计划赶不上变化的时候，先动起来，路会在脚下长出来。",
  "表达不是为了说服谁，而是为了让自己想得更清楚。",
  "成长常常发生在不舒服的那一刻——所以别急着躲开它。",
];

// ===========================================================================
// Life 旅行地图：世界地图上「点亮」去过的地方
// 没去过的地方保持轮廓（不点亮），去过的按深浅点亮：
//   depth 5 最 deepest → 1 基础绿（配色见 TRAVEL_DEPTH_COLOR）
// 坐标为经纬度，前端按等距圆柱投影落到世界地图上。
// ===========================================================================
export interface TravelPlace {
  name: string;
  depth: number;
  lon: number;
  lat: number;
  /** 海外的地方单独标注 */
  overseas?: boolean;
}

/** 国内点亮的地方（含港澳） */
export const TRAVEL_DOMESTIC: TravelPlace[] = [
  { name: "重庆", depth: 5, lon: 106.55, lat: 29.56 },
  { name: "湖南", depth: 4, lon: 112.98, lat: 28.19 },
  { name: "湖北", depth: 4, lon: 114.3, lat: 30.59 },
  { name: "北京", depth: 3, lon: 116.4, lat: 39.9 },
  { name: "上海", depth: 3, lon: 121.47, lat: 31.23 },
  { name: "江苏", depth: 3, lon: 118.79, lat: 32.06 },
  { name: "江西", depth: 3, lon: 115.89, lat: 28.68 },
  { name: "海南", depth: 3, lon: 110.33, lat: 20.03 },
  { name: "香港", depth: 3, lon: 114.17, lat: 22.32 },
  { name: "澳门", depth: 3, lon: 113.55, lat: 22.2 },
  { name: "四川", depth: 2, lon: 104.07, lat: 30.67 },
  { name: "广东", depth: 2, lon: 113.27, lat: 23.13 },
  { name: "福建", depth: 2, lon: 119.3, lat: 26.08 },
  { name: "青海", depth: 1, lon: 101.78, lat: 36.62 },
  { name: "宁夏", depth: 1, lon: 106.28, lat: 38.47 },
  { name: "广西", depth: 1, lon: 108.32, lat: 22.82 },
  { name: "甘肃", depth: 1, lon: 103.82, lat: 36.06 },
  { name: "陕西", depth: 1, lon: 108.95, lat: 34.27 },
  { name: "云南", depth: 1, lon: 102.71, lat: 25.05 },
  { name: "贵州", depth: 1, lon: 106.71, lat: 26.58 },
  { name: "天津", depth: 1, lon: 117.19, lat: 39.13 },
  { name: "河南", depth: 1, lon: 113.65, lat: 34.76 },
  { name: "山东", depth: 1, lon: 117.0, lat: 36.65 },
  { name: "浙江", depth: 1, lon: 120.15, lat: 30.27 },
];

/** 海外点亮的地方（东南亚） */
export const TRAVEL_OVERSEAS: TravelPlace[] = [
  { name: "新加坡", depth: 1, lon: 103.82, lat: 1.35, overseas: true },
  { name: "马来西亚", depth: 1, lon: 101.69, lat: 3.14, overseas: true },
  { name: "印度尼西亚", depth: 1, lon: 106.85, lat: -6.17, overseas: true },
  { name: "泰国", depth: 1, lon: 100.5, lat: 13.75, overseas: true },
];

/** 全部点亮的地方 */
export const TRAVEL_ALL: TravelPlace[] = [...TRAVEL_DOMESTIC, ...TRAVEL_OVERSEAS];

/** depth → 绿色深浅（5 最深） */
export const TRAVEL_DEPTH_COLOR: Record<number, string> = {
  1: "#4ADE80",
  2: "#22C55E",
  3: "#16A34A",
  4: "#15803D",
  5: "#14532D",
};

/** depth → 图例文字 */
export const TRAVEL_DEPTH_LABEL: Record<number, string> = {
  1: "t < 1 月",
  2: "1 月 ≤ t < 3 月",
  3: "3 月 ≤ t < 1 年",
  4: "1 年 ≤ t < 3 年",
  5: "t ≥ 3 年",
};

// ---------------------------------------------------------------------------
// 点亮的「色块」：每个地方一组多边形（[经度, 纬度] 序列）
// 地图上把这些区域直接填成对应的绿色，没去过的省份保持不填色。
// 单一陆块给 1 个多边形；岛国（印尼、马来西亚）给多个，各岛分别填。
// 形状是手写的近似轮廓，不追求行政边界精度，但位置和大小是对的。
// ---------------------------------------------------------------------------
export type RegionShape = [number, number][][];

export const TRAVEL_REGIONS: Record<string, RegionShape> = {
  重庆: [[
    [105.3, 30.2], [106.5, 31.7], [108.2, 31.7], [110.2, 30.8],
    [109.6, 28.6], [108.6, 28.2], [107.0, 28.2], [105.8, 28.9],
  ]],
  湖南: [[
    [109.0, 28.5], [109.5, 30.2], [111.5, 30.2], [113.5, 29.8],
    [114.3, 28.5], [114.0, 26.5], [113.5, 25.0], [111.5, 24.6],
    [110.0, 25.5], [109.2, 26.5],
  ]],
  湖北: [[
    [108.4, 31.0], [109.5, 32.5], [111.5, 33.3], [113.5, 32.5],
    [115.0, 31.0], [115.9, 30.0], [115.0, 29.0], [113.0, 29.3],
    [111.0, 29.5], [109.5, 29.8],
  ]],
  北京: [[
    [115.6, 39.5], [116.0, 40.6], [117.0, 41.0], [117.5, 40.4],
    [117.3, 39.6], [116.5, 39.4],
  ]],
  上海: [[
    [120.9, 30.8], [121.4, 31.6], [121.9, 31.5], [122.0, 30.9], [121.5, 30.7],
  ]],
  江苏: [[
    [116.4, 34.5], [116.5, 35.2], [118.5, 35.0], [119.9, 34.6],
    [121.0, 32.2], [121.9, 31.9], [121.0, 31.0], [119.2, 31.5], [118.0, 32.5],
  ]],
  江西: [[
    [113.6, 29.3], [114.0, 30.0], [115.5, 30.0], [116.7, 29.6],
    [117.6, 27.6], [117.2, 25.6], [115.5, 24.5], [114.0, 25.2], [113.7, 27.5],
  ]],
  海南: [[
    [108.6, 19.9], [109.3, 20.1], [110.6, 20.1], [111.0, 19.6],
    [110.5, 18.4], [109.3, 18.2], [108.7, 18.8],
  ]],
  香港: [[
    [113.9, 22.55], [114.4, 22.5], [114.4, 22.2], [113.9, 22.2],
  ]],
  澳门: [[
    [113.52, 22.22], [113.6, 22.23], [113.62, 22.12], [113.53, 22.12],
  ]],
  四川: [[
    [97.4, 30.0], [98.5, 32.5], [100.5, 34.0], [103.0, 34.3],
    [105.2, 33.5], [106.5, 32.6], [108.2, 31.8], [108.5, 30.0],
    [107.0, 28.2], [105.0, 27.6], [103.0, 27.8], [101.0, 28.2], [99.0, 29.0],
  ]],
  广东: [[
    [109.8, 21.4], [110.5, 23.0], [112.0, 24.5], [113.9, 25.5],
    [115.5, 25.0], [117.2, 23.6], [116.5, 22.5], [114.5, 22.2], [113.2, 22.0],
    [111.0, 21.2],
  ]],
  福建: [[
    [116.0, 26.0], [116.5, 27.5], [118.0, 28.4], [119.8, 27.9],
    [120.5, 27.0], [119.5, 26.0], [118.0, 24.5], [116.8, 24.4],
  ]],
  青海: [[
    [89.9, 32.5], [90.5, 35.5], [93.0, 38.5], [97.0, 39.0],
    [100.5, 38.0], [102.5, 37.0], [103.0, 35.5], [101.0, 33.5], [97.5, 32.0], [93.0, 32.0],
  ]],
  宁夏: [[
    [104.5, 36.0], [105.2, 37.5], [106.2, 39.3], [107.3, 39.3],
    [107.6, 37.8], [106.5, 36.0], [105.5, 35.3],
  ]],
  广西: [[
    [104.4, 23.2], [105.5, 24.8], [107.5, 25.5], [109.5, 26.2],
    [111.5, 25.0], [111.0, 23.5], [109.5, 22.0], [107.5, 21.5], [105.5, 22.0],
  ]],
  甘肃: [[
    [92.3, 39.0], [94.5, 41.5], [97.5, 42.7], [101.0, 42.5],
    [103.5, 41.0], [105.5, 39.0], [106.8, 36.5], [105.0, 34.5],
    [103.5, 33.5], [101.0, 34.5], [96.0, 36.0], [93.0, 37.5],
  ]],
  陕西: [[
    [105.5, 32.5], [106.5, 34.5], [107.0, 36.5], [108.5, 37.5],
    [110.5, 38.0], [111.2, 36.0], [110.5, 33.5], [110.0, 32.0],
    [108.0, 31.5], [106.0, 32.0],
  ]],
  云南: [[
    [97.5, 24.0], [98.5, 26.5], [99.5, 28.5], [101.5, 29.0],
    [103.5, 28.5], [105.5, 27.5], [106.2, 25.0], [105.0, 22.5],
    [103.0, 22.0], [101.0, 21.2], [99.0, 22.0],
  ]],
  贵州: [[
    [103.5, 25.0], [104.5, 27.0], [105.5, 28.5], [107.5, 29.0],
    [109.0, 28.0], [108.8, 26.0], [107.5, 24.8], [105.5, 24.5],
  ]],
  天津: [[
    [116.8, 39.0], [117.0, 40.2], [117.8, 40.2], [118.0, 39.0], [117.4, 38.6],
  ]],
  河南: [[
    [110.5, 33.5], [111.0, 34.8], [113.0, 36.0], [115.5, 36.0],
    [116.5, 34.5], [116.0, 33.0], [114.0, 31.8], [112.0, 32.0],
  ]],
  山东: [[
    [114.9, 34.5], [115.5, 36.0], [116.0, 37.5], [118.0, 38.0],
    [119.5, 37.5], [121.0, 37.5], [122.5, 37.0], [122.0, 36.5],
    [120.0, 36.0], [119.0, 34.8], [117.0, 34.5],
  ]],
  浙江: [[
    [118.0, 30.5], [118.5, 31.0], [120.0, 31.0], [121.5, 30.5],
    [122.0, 29.5], [121.5, 28.0], [120.0, 27.2], [118.5, 28.0],
  ]],

  // ---------------- 海外 ----------------
  新加坡: [[
    [103.62, 1.47], [104.04, 1.46], [104.02, 1.26], [103.64, 1.27],
  ]],
  // 马来西亚：半岛部分 + 东马（婆罗洲北部）
  马来西亚: [
    [
      [100.1, 6.7], [102.5, 6.5], [104.3, 3.8], [103.5, 1.8],
      [102.0, 2.5], [100.4, 3.8], [99.6, 5.5],
    ],
    [
      [109.5, 1.8], [115.0, 4.5], [119.0, 5.5], [119.2, 4.2],
      [115.5, 2.8], [111.0, 0.9], [109.3, 0.9],
    ],
  ],
  // 印尼：苏门答腊、爪哇、加里曼丹南部、苏拉威西、新几内亚西部
  印度尼西亚: [
    [
      [95.0, 5.5], [100.0, 0.5], [106.0, -6.0], [103.5, -6.5], [98.0, 0.5], [94.5, 4.5],
    ],
    [
      [105.0, -6.0], [114.5, -8.2], [114.5, -8.9], [105.0, -6.8],
    ],
    [
      [109.0, 1.5], [117.0, 3.0], [119.0, -3.0], [114.0, -4.0], [109.0, -1.0],
    ],
    [
      [119.0, 1.0], [125.0, 1.0], [123.0, -3.0], [121.0, -5.0], [119.0, -2.0],
    ],
    [
      [131.0, -1.0], [141.0, -3.0], [141.0, -9.0], [134.0, -4.0],
    ],
  ],
  泰国: [[
    [98.5, 19.8], [100.5, 20.5], [102.5, 18.0], [105.0, 15.5],
    [105.5, 14.5], [104.0, 14.0], [102.5, 12.5], [101.0, 13.5],
    [100.0, 13.0], [99.0, 9.0], [100.5, 6.5], [101.5, 6.0],
    [102.0, 7.5], [101.0, 12.0], [99.0, 14.0], [98.5, 17.0],
  ]],
};
