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
  label: string; // 色环上显示的名称
  title: string; // 板块标题
  color: string; // 主题色
  connect: string; // 连接语
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
  // 英文名/昵称，可留空
  tagline: "正在慢慢长成自己的小小程",
  bio: "我是程子桐，来自重庆万州，现就读于湖南大学。喜欢走路、听歌、吹旷野的风，也喜欢用代码和设计把脑子里的想法一点点做成现实。这里收着我走过的路、做过的事，和一些还没想清楚的念头。",
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
    title: "Origin · 起点",
    color: "#F5C518",
    connect:
      "所有远行，都始于一个被叫作“家乡”的地方。\n那些最早教会小程责任与担当的时光，\n藏在小学的走廊、中学的教室，也藏在每一次被信任、被托付的时刻里。",
  },
  {
    key: "drive",
    label: "Drive",
    title: "Drive · 驱动",
    color: "#E5484D",
    connect:
      "知道自己想成为什么，只是开始；真正的答案，往往藏在做过什么之中。\n于是，我开始从课堂走向现实，从“学习”走向“行动”。",
  },
  {
    key: "experience",
    label: "EXPERIENCE",
    title: "Experience · 历练",
    color: "#EC5C8D",
    connect:
      "比赛的意义，从来不只在于那张奖状。\n它更像一次被压缩的成长——在有限时间里逼自己做到更好，在压力里看清自己的边界，然后发现，边界原来可以再往外推一点。",
  },
  {
    key: "projects",
    label: "Projects",
    title: "Projects · 项目",
    color: "#8E5BEF",
    connect:
      "项目，是想法真正落地后留下的痕迹。\n每一个从零开始的东西，都经历过混乱、推翻与重来。最终留下的不只是一个成果，更是一种确认——原来一个模糊的想法，也可以被一点一点做成现实。",
  },
  {
    key: "skills",
    label: "Skills",
    title: "Skills · 技能",
    color: "#3B82F6",
    connect:
      "从代码到设计，我享受用工具把想法变成现实。\n技能对我而言，不是需要被列出的清单，而是让想法有机会发生的方式。",
  },
  {
    key: "thinking",
    label: "Thinking",
    title: "Thinking · 思考",
    color: "#8B95A1",
    connect:
      "有些话不必急着归类，有些思考值得被单独留下。\n它们可能还不完整，可能还在生长。但正是这些尚未成形的念头，让我保持对自己的诚实。",
  },
  {
    key: "life",
    label: "Life",
    title: "Life · 生活",
    color: "#2FBF71",
    connect:
      "旅行不是逃离，是换一个坐标重新看自己。\n或许 小程就是一只会飞的小小猪，喜欢走走路、听听歌、吹吹旷野的风、看看山川湖海。\n走远一点，也只是为了记得自己从哪里出发。",
  },
];

export const MULTICOLOR = {
  key: "multicolor" as SectionKey,
  label: "ALL",
  title: "This is my world",
  color: "#111111",
  connect:
    "走到这里，也许你看到的并不是一个已经完成的答案。\n只是一个正在慢慢长成自己的小小程。\nThis is my world. Still under construction.",
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
    role: "班长 · 团支书 · 宣传部长",
    img: asset("/images/origin-junior.jpg"),
    caption: "在集体里学着把一件事做好",
  },
  {
    period: "2022.09 – 2025.07",
    school: "重庆市万州第二高级中学",
    role: "班长 · 纪检部长",
    img: asset("/images/origin-senior.jpg"),
    caption: "责任变得更具体，也更安静",
  },
  {
    period: "2026.09 – 至今",
    school: "湖南大学",
    role: "学习部长 · 合唱团女高声部部长",
    img: asset("/images/origin-university.jpg"),
    caption: "在更广阔的地方继续生长",
  },
];

// ---- Drive 社会实践（来自简历，请补充你的真实经历） ----
export interface ListItem {
  title: string;
  meta?: string;
  desc: string;
}
export const DRIVE_ITEMS: ListItem[] = [
  {
    title: "（请补充：社会实践活动 1）",
    meta: "时间 · 组织",
    desc: "把这段经历换成你简历里的社会实践：做了什么、承担了什么角色、有什么收获。",
  },
  {
    title: "（请补充：社会实践活动 2）",
    meta: "时间 · 组织",
    desc: "例如志愿服务、调研、实习、校园活动等，尽量用一句话说清你的贡献。",
  },
  {
    title: "（请补充：社会实践活动 3）",
    meta: "时间 · 组织",
    desc: "想突出“从课堂走向现实”的故事，可以写你如何把学到的东西用在了真实场景里。",
  },
];

// ---- EXPERIENCE 比赛获奖（来自简历，请补充） ----
export const EXPERIENCE_ITEMS: ListItem[] = [
  {
    title: "（请补充：获奖 / 比赛 1）",
    meta: "年份 · 奖项等级",
    desc: "写清比赛名称、你的角色和成果，比如“团队负责人，负责整体方案与答辩”。",
  },
  {
    title: "（请补充：获奖 / 比赛 2）",
    meta: "年份 · 奖项等级",
    desc: "挑最有代表性的 3–5 项即可，不必罗列全部。",
  },
  {
    title: "（请补充：获奖 / 比赛 3）",
    meta: "年份 · 奖项等级",
    desc: "可以加一句“这次经历让我学会了……”，让奖状背后有成长。",
  },
];

// ---- Projects 项目经历（请补充） ----
export const PROJECT_ITEMS: ListItem[] = [
  {
    title: "（请补充：项目 1）",
    meta: "角色 · 技术/领域",
    desc: "一句话讲清项目目标，再写你做了什么、遇到过什么坑、最后留下了什么。",
  },
  {
    title: "（请补充：项目 2）",
    meta: "角色 · 技术/领域",
    desc: "如果有链接（仓库 / 演示 / 文章）可以补在 desc 里。",
  },
  {
    title: "（请补充：项目 3）",
    meta: "角色 · 技术/领域",
    desc: "哪怕很小，只要是从零做出来的，都值得留下。",
  },
];

// ---- Skills 抽卡：技能卡 ----
export const SKILL_CARDS: string[] = [
  "Python",
  "C 语言",
  "R 语言",
  "WPS",
  "draw.io",
  "活动策划与组织",
  "团队协作",
  "演讲与表达",
  "数学建模",
  "数据分析",
  "市场调研",
  "田径",
  "CET-4",
];

// ---- Skills 抽卡：兴趣卡 ----
export const INTEREST_CARDS: string[] = [
  "钢琴",
  "旅行",
  "唱歌 / 合唱",
  "美术",
  "古筝",
  "葫芦丝",
  "吉他",
  "写作",
];

// ---- Thinking 思考碎片 ----
export const THINKING_NOTES: string[] = [
  "把一件事做完了，和把它做对了，中间隔着很多次“再来一次”。",
  "比起“我很擅长”，我更愿意相信“我还可以学”。",
  "计划赶不上变化的时候，先动起来，路会在脚下长出来。",
  "表达不是为了说服谁，而是为了让自己想得更清楚。",
  "成长常常发生在不舒服的那一刻——所以别急着躲开它。",
];

// ---- Life 旅行地图：点亮去过的地方 ----
// depth: 5=最最深绿 4=最深绿 3=较深绿 2=较较深绿 1=基础绿
export interface TravelPlace {
  name: string;
  depth: number;
  // 经纬度（用于中国地图投影）；海外单独放在 overseas 区
  lon: number;
  lat: number;
  overseas?: boolean;
}
export const TRAVEL_DOMESTIC: TravelPlace[] = [
  { name: "重庆", depth: 5, lon: 107.5, lat: 29.5 },
  { name: "湖南", depth: 4, lon: 111.7, lat: 27.6 },
  { name: "湖北", depth: 4, lon: 112.3, lat: 30.7 },
  { name: "香港", depth: 3, lon: 114.2, lat: 22.3 },
  { name: "澳门", depth: 3, lon: 113.5, lat: 22.2 },
  { name: "上海", depth: 3, lon: 121.5, lat: 31.2 },
  { name: "北京", depth: 3, lon: 116.4, lat: 39.9 },
  { name: "海南", depth: 3, lon: 109.8, lat: 19.2 },
  { name: "江西", depth: 3, lon: 115.9, lat: 27.6 },
  { name: "江苏", depth: 3, lon: 119.8, lat: 32.9 },
  { name: "四川", depth: 2, lon: 104.1, lat: 30.7 },
  { name: "广东", depth: 2, lon: 113.4, lat: 23.4 },
  { name: "福建", depth: 2, lon: 118.3, lat: 26.1 },
  { name: "青海", depth: 1, lon: 96.0, lat: 35.6 },
  { name: "宁夏", depth: 1, lon: 106.2, lat: 37.3 },
  { name: "广西", depth: 1, lon: 108.8, lat: 23.8 },
  { name: "甘肃", depth: 1, lon: 103.8, lat: 37.0 },
  { name: "陕西", depth: 1, lon: 108.9, lat: 34.3 },
  { name: "云南", depth: 1, lon: 101.5, lat: 25.0 },
  { name: "贵州", depth: 1, lon: 106.7, lat: 26.8 },
  { name: "天津", depth: 1, lon: 117.2, lat: 39.1 },
  { name: "河南", depth: 1, lon: 113.6, lat: 34.0 },
  { name: "山东", depth: 1, lon: 117.0, lat: 36.4 },
  { name: "浙江", depth: 1, lon: 120.2, lat: 29.2 },
];

export const TRAVEL_OVERSEAS: TravelPlace[] = [
  { name: "新加坡", depth: 1, lon: 0, lat: 0, overseas: true },
  { name: "马来西亚", depth: 1, lon: 0, lat: 0, overseas: true },
  { name: "印度尼西亚", depth: 1, lon: 0, lat: 0, overseas: true },
  { name: "泰国", depth: 1, lon: 0, lat: 0, overseas: true },
];

export const TRAVEL_DEPTH_COLOR: Record<number, string> = {
  1: "#4ADE80",
  2: "#22C55E",
  3: "#16A34A",
  4: "#15803D",
  5: "#166534",
};
