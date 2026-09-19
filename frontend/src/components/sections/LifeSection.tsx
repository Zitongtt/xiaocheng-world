import { useState } from "react";
import {
  TRAVEL_DEPTH_COLOR,
  TRAVEL_DEPTH_LABEL,
  TRAVEL_DOMESTIC,
  TRAVEL_OVERSEAS,
  TRAVEL_REGIONS,
  type RegionShape,
} from "@/data/content";
import { CHINA_PROVINCES } from "@/data/chinaRegions";

// ===========================================================================
// 世界地图（等距圆柱投影：经纬度直接线性映射）
// · 底图：手写的粗略大陆轮廓，没去过的地方只留轮廓、不填色
// · 点亮：去过的地方直接给「色块」——按停留深浅填成不同深浅的绿
// ===========================================================================
const VIEW_W = 1000;
const VIEW_H = 560;
const LON_MIN = -180;
const LON_MAX = 180;
const LAT_TOP = 83;

const kx = VIEW_W / (LON_MAX - LON_MIN);
const ky = VIEW_H / (LAT_TOP + 50);

type Projector = (lon: number, lat: number) => { x: number; y: number };

/** 经纬度 → 画布坐标 */
const project: Projector = (lon, lat) => ({
  x: (lon - LON_MIN) * kx,
  y: (LAT_TOP - lat) * ky,
});

/** [经度, 纬度] 数组转成 SVG path */
function toPath(points: [number, number][], p: Projector = project) {
  return (
    points
      .map(([lon, lat], i) => {
        const { x, y } = p(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join("") + "Z"
  );
}

// ---------------------------------------------------------------------------
// 世界底图轮廓（比上一版多加了不少细节：地中海、黑海、波罗的海、半岛、岛屿）
// ---------------------------------------------------------------------------
const LANDS: { name: string; d: string }[] = [
  {
    name: "北美洲",
    d: toPath([
      [-168, 65], [-160, 71], [-140, 70], [-125, 70], [-110, 68], [-95, 68],
      [-80, 70], [-62, 60], [-55, 50], [-65, 45], [-70, 42], [-75, 36],
      [-81, 25], [-90, 29], [-97, 26], [-105, 20], [-98, 16], [-92, 15],
      [-84, 10], [-78, 9], [-83, 15], [-95, 18], [-110, 24], [-118, 31],
      [-124, 40], [-125, 48], [-135, 57], [-150, 59], [-160, 55], [-165, 60],
    ]),
  },
  {
    name: "格陵兰",
    d: toPath([
      [-45, 60], [-25, 68], [-22, 76], [-35, 83], [-55, 80], [-60, 72], [-52, 64],
    ]),
  },
  {
    name: "南美洲",
    d: toPath([
      [-77, 8], [-70, 11], [-62, 10], [-52, 5], [-44, -2], [-35, -8],
      [-39, -16], [-48, -25], [-58, -34], [-62, -42], [-66, -50],
      [-73, -52], [-75, -45], [-73, -35], [-71, -22], [-79, -6], [-81, 2],
    ]),
  },
  {
    name: "非洲",
    d: toPath([
      [-17, 15], [-17, 21], [-10, 27], [0, 36], [11, 37], [20, 32], [32, 31],
      [35, 28], [43, 12], [51, 12], [43, 0], [40, -10], [34, -20],
      [28, -33], [18, -34], [12, -18], [9, -1], [5, 5], [-8, 5], [-13, 9],
    ]),
  },
  {
    name: "欧亚大陆",
    d: toPath([
      // 伊比利亚 → 地中海北岸
      [-9.5, 43.5], [-9, 38], [-6, 36], [-1, 37.5], [3, 42], [7, 43.5],
      [12, 44], [16, 41.5], [19, 40], [24, 35], [26, 40], [28, 41],
      [33, 42], [41, 43], [48, 46], [52, 47], [60, 46], [55, 50], [58, 55],
      [60, 60], [65, 66], [70, 73], [80, 76], [95, 78], [110, 77],
      [130, 73], [145, 72], [160, 70], [175, 68], [178, 65], [170, 60],
      [155, 58], [143, 59], [135, 55], [130, 48], [128, 43], [122, 40],
      [121, 38], [119, 35], [122, 37], [121, 31], [122, 30], [120, 27],
      [118, 24], [113, 22], [110, 21], [108, 21], [106, 22], [102, 22],
      [99, 23], [97, 25], [98, 28], [96, 29], [92, 28], [88, 28], [85, 28],
      [82, 30], [78, 32], [76, 35], [73, 39], [74, 41], [76, 43],
      [68, 40], [64, 38], [60, 37], [57, 25], [50, 29], [43, 30], [41, 37],
      [35, 36], [28, 37], [26, 40], [24, 35], [19, 40], [16, 41.5],
      [12, 44], [7, 43.5], [3, 42], [-1, 37.5], [-6, 36], [-9, 38],
    ]),
  },
  {
    name: "阿拉伯半岛",
    d: toPath([
      [34, 29], [43, 30], [50, 29], [56, 26], [59, 22], [52, 15], [45, 12], [43, 13],
    ]),
  },
  {
    name: "印度半岛",
    d: toPath([
      [68, 24], [72, 22], [73, 15], [77, 8], [80, 15], [85, 20], [89, 22], [89, 25],
    ]),
  },
  {
    name: "中南半岛",
    d: toPath([
      [92, 20], [97, 17], [99, 12], [101, 6], [104, 1], [106, 9], [109, 15],
      [109, 21], [106, 22], [103, 22], [100, 20],
    ]),
  },
  {
    name: "朝鲜半岛",
    d: toPath([
      [126, 38], [129, 38.5], [129, 35], [127, 34], [126, 36],
    ]),
  },
  {
    name: "不列颠",
    d: toPath([[-5, 50], [-3, 54], [-2, 58], [-5, 58], [-6, 55], [-5, 52]]),
  },
  {
    name: "爱尔兰",
    d: toPath([[-10, 52], [-7, 55], [-6, 54], [-8, 52]]),
  },
  {
    name: "日本",
    d: toPath([
      [130, 31], [132, 34], [135, 34], [139, 35], [141, 39], [141, 45], [145, 44], [143, 42], [139, 37], [135, 34], [131, 33],
    ]),
  },
  {
    name: "菲律宾",
    d: toPath([
      [121, 18], [124, 13], [126, 8], [124, 6], [121, 12], [120, 16],
    ]),
  },
  { name: "苏门答腊", d: toPath([[95, 5], [100, 0], [106, -6], [104, -7], [98, 0], [94, 4]]) },
  { name: "加里曼丹", d: toPath([[109, 2], [117, 4], [119, -3], [114, -4], [109, -1]]) },
  { name: "爪哇", d: toPath([[105, -6], [114, -8], [114, -9], [105, -7]]) },
  { name: "苏拉威西", d: toPath([[119, 1], [125, 1], [123, -3], [121, -5], [119, -2]]) },
  { name: "新几内亚", d: toPath([[131, -1], [141, -3], [150, -9], [143, -9], [134, -4]]) },
  {
    name: "澳大利亚",
    d: toPath([
      [114, -22], [113, -26], [115, -34], [123, -34], [132, -32], [141, -38],
      [150, -37], [153, -28], [146, -19], [142, -11], [136, -12], [130, -11],
      [127, -14], [122, -18],
    ]),
  },
  { name: "塔斯马尼亚", d: toPath([[145, -41], [148, -42], [147, -43], [144, -42]]) },
  { name: "马达加斯加", d: toPath([[43, -13], [50, -15], [48, -25], [44, -22]]) },
  { name: "新西兰", d: toPath([[173, -35], [178, -38], [176, -42], [170, -46], [167, -46], [172, -41]]) },
  { name: "冰岛", d: toPath([[-24, 65], [-14, 66], [-14, 63.5], [-22, 63.5]]) },
  { name: "斯里兰卡", d: toPath([[80, 9], [82, 8], [81, 6], [80, 7]]) },
  { name: "台湾岛", d: toPath([[120.9, 25.3], [122, 25], [121.9, 23], [120.8, 21.9], [120.1, 23], [120.6, 24.5]]) },
  { name: "海南岛", d: toPath([[108.6, 19.9], [110, 20.1], [111, 19.6], [110.5, 18.4], [109, 18.2], [108.7, 18.8]]) },
];

/** 内部分界线：乌拉尔、红海、波斯湾，让欧亚非不至于糊成一整块 */
const DIVIDERS: [number, number][][] = [
  [[60, 52], [58, 60], [60, 68]],
  [[32, 30], [37, 24], [43, 13]],
  [[50, 29], [54, 27], [57, 25]],
];

const GRID_LON = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
const GRID_LAT = [-30, 0, 30, 60];

// 世界地图上的中国轮廓；中国放大图仍负责展示各省的驻留时长层级。
const CHINA_WORLD_PATH = toPath([
  [73, 39], [76, 35], [80, 32], [86, 28], [92, 28], [97, 25],
  [101, 22], [106, 22], [110, 20], [114, 22], [119, 25], [121, 30],
  [120, 34], [123, 39], [128, 42], [131, 47], [127, 49], [122, 53],
  [116, 49], [111, 45], [104, 42], [98, 42], [92, 45], [86, 48],
  [80, 45], [76, 42],
]);

// ---------------------------------------------------------------------------
// 中国放大图：单独一套投影（东亚那一块在世界地图上太小，看不清省份）
// ---------------------------------------------------------------------------
const CN_W = 620;
const CN_H = 500;
const CN_LON: [number, number] = [72, 137];
const CN_LAT: [number, number] = [16, 55];

const projectCN: Projector = (lon, lat) => ({
  x: ((lon - CN_LON[0]) / (CN_LON[1] - CN_LON[0])) * CN_W,
  y: ((CN_LAT[1] - lat) / (CN_LAT[1] - CN_LAT[0])) * CN_H,
});

/**
 * 把多边形朝自己的重心收一点。
 * 手写的轮廓普遍画得偏大，直接用会互相盖住；收一下就像一块块分开的色块，
 * 相邻省份之间留出细白缝，反而更像地图。世界地图收得多一点，放大图收得少一点。
 */
function shrinkPolygon(poly: [number, number][], k: number): [number, number][] {
  const n = poly.length;
  const cx = poly.reduce((s, p) => s + p[0], 0) / n;
  const cy = poly.reduce((s, p) => s + p[1], 0) / n;
  return poly.map(([lon, lat]) => [cx + (lon - cx) * k, cy + (lat - cy) * k] as [number, number]);
}

/** 点亮色块的 path（可能是多块，比如印尼的几个岛） */
function litRegionPaths(name: string, p: Projector, shrink: number): string[] {
  const custom: RegionShape | undefined = TRAVEL_REGIONS[name];
  if (custom) return custom.map((poly) => toPath(shrinkPolygon(poly, shrink), p));
  const province = CHINA_PROVINCES.find((c) => c.name === name);
  return province ? [toPath(shrinkPolygon(province.poly, shrink), p)] : [];
}

function depthOf(name: string): number {
  return (
    TRAVEL_DOMESTIC.find((d) => d.name === name)?.depth ??
    TRAVEL_OVERSEAS.find((d) => d.name === name)?.depth ??
    0
  );
}

/** 一个点亮的色块（多边形的每个部分一起响应悬停） */
function LitRegion({
  name,
  p,
  shrink,
  hoveredName,
  onHover,
  strokeWidth = 0.7,
  /** true = 只铺底，不描白边、不响应鼠标（用来把缝隙填满） */
  underlay = false,
  /** true = 不描白边，靠半透明叠加体现深浅（放大图用） */
  flat = false,
}: {
  name: string;
  p: Projector;
  /** 朝重心收缩的比例，1 = 不收缩 */
  shrink: number;
  hoveredName: string | null;
  onHover: (n: string | null) => void;
  strokeWidth?: number;
  underlay?: boolean;
  flat?: boolean;
}) {
  const paths = litRegionPaths(name, p, shrink);
  if (paths.length === 0) return null;
  const depth = depthOf(name);
  const color = TRAVEL_DEPTH_COLOR[depth];

  if (underlay) {
    return (
      <g fill={color} fillOpacity="0.95" stroke="none">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    );
  }

  const active = hoveredName === name;
  return (
    <g
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "pointer" }}
      fill={color}
      fillOpacity={active ? 0.85 : flat ? 0.5 : 0.92}
      stroke={active ? "#064E3B" : flat ? "#065F46" : "#F0FDF4"}
      strokeWidth={active ? strokeWidth + 0.8 : flat ? strokeWidth * 0.55 : strokeWidth}
      strokeLinejoin="round"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <title>{name}</title>
    </g>
  );
}

/** depth → 该深浅对应的光晕色（用于把相邻色块连成一片） */
const DEPTH_HALO: Record<number, string> = {
  1: "#86EFAC",
  2: "#4ADE80",
  3: "#22C55E",
  4: "#16A34A",
  5: "#15803D",
};

/**
 * 一层「晕」：把不收缩的多边形描一圈粗边再模糊掉。
 * 相邻省份的晕会连在一起，所以整片已点亮的区域看起来是一整块，
 * 而不是一块块分开的拼图；上面的实心色块仍然按深浅区分。
 */
function RegionHalo({
  names,
  p,
  filterId,
  strokeWidth = 9,
  fade = 0.5,
}: {
  names: string[];
  p: Projector;
  /** 本 svg 内部定义的模糊滤镜 id */
  filterId: string;
  strokeWidth?: number;
  fade?: number;
}) {
  const blobs = names
    .map((n) => {
      const depth = depthOf(n);
      const paths = litRegionPaths(n, p, 1);
      return paths.length > 0 ? { depth, d: paths.join(" ") } : null;
    })
    .filter((b): b is { depth: number; d: string } => b !== null);

  if (blobs.length === 0) return null;

  return (
    <g filter={`url(#${filterId})`}>
      {blobs.map((b, i) => (
        <path
          key={i}
          d={b.d}
          fill="none"
          stroke={DEPTH_HALO[b.depth]}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          opacity={fade}
        />
      ))}
    </g>
  );
}

/** 悬停时在左上角显示名字（只显示地方，不显示停留时长） */
function HoverChip({ name }: { name: string | null }) {
  if (!name) return null;
  const depth = name === "中国" ? 1 : depthOf(name);
  return (
    <g>
      <rect
        x="16"
        y="14"
        width={name.length * 17 + 46}
        height="34"
        rx="17"
        fill="#FFFFFF"
        opacity="0.95"
        stroke={TRAVEL_DEPTH_COLOR[depth]}
        strokeWidth="1.5"
      />
      <circle cx="34" cy="31" r="5.5" fill={TRAVEL_DEPTH_COLOR[depth]} />
      <text x="48" y="36" fontSize="15" fontWeight="700" fill="#166534">
        {name}
      </text>
    </g>
  );
}

export function LifeSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const legend = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-600">Places I have stayed</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-800">被时间点亮的地方</h3>
          <p className="mt-1 text-sm text-slate-500">轮廓代表世界，绿色代表我真实停留过的时间。</p>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[10px] text-slate-500">
          {legend.map((depth) => (
            <span key={depth} className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <i className="h-2.5 w-2.5 rounded-[3px]" style={{ background: TRAVEL_DEPTH_COLOR[depth] }} />
              {TRAVEL_DEPTH_LABEL[depth]}
            </span>
          ))}
        </div>
      </header>

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">01 / World</span>
            <h4 className="text-base font-semibold text-slate-700">世界地图</h4>
          </div>
          <p className="text-right text-[11px] text-slate-400">未到访区域保留轮廓 · 海外足迹以色块点亮</p>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-slate-200/70 bg-[#f8fbfa] shadow-[0_18px_55px_-40px_rgba(15,118,110,.45)]">
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full" aria-label="世界旅行地图">
          <defs>
            <filter id="xcLandShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor="#64748B" floodOpacity="0.11" />
            </filter>
            <filter id="xcRegionShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#047857" floodOpacity="0.28" />
            </filter>
            <filter id="xcHalo" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <linearGradient id="oceanWash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f9fcfb" />
              <stop offset="1" stopColor="#eef7f4" />
            </linearGradient>
          </defs>

          <rect width={VIEW_W} height={VIEW_H} fill="url(#oceanWash)" />

          <g stroke="#cbd8d5" strokeWidth="0.55" strokeDasharray="3 7" opacity="0.48">
            {GRID_LON.map((lon) => (
              <path key={`lon${lon}`} d={`M${project(lon, 0).x} 0 V${VIEW_H}`} />
            ))}
            {GRID_LAT.map((lat) => (
              <path key={`lat${lat}`} d={`M0 ${project(0, lat).y} H${VIEW_W}`} />
            ))}
          </g>
          <g>
            {LANDS.map((land) => (
              <path
                key={land.name}
                d={land.d}
                fill="#fdfefd"
                stroke="#9baaa7"
                strokeWidth="1.05"
                strokeLinejoin="round"
                filter="url(#xcLandShadow)"
              />
            ))}
            {DIVIDERS.map((line, i) => (
              <path
                key={`div${i}`}
                d={toPath(line)}
                fill="none"
                stroke="#b8c5c2"
                strokeWidth="0.7"
                strokeDasharray="4 5"
              />
            ))}
          </g>

          <RegionHalo
            names={TRAVEL_OVERSEAS.map((p) => p.name)}
            p={project}
            filterId="xcHalo"
            strokeWidth={5}
            fade={0.22}
          />

          <path
            d={CHINA_WORLD_PATH}
            fill={TRAVEL_DEPTH_COLOR[1]}
            fillOpacity={hovered === "中国" ? 0.82 : 0.58}
            stroke={hovered === "中国" ? "#166534" : "#39a96b"}
            strokeWidth={hovered === "中国" ? 1.8 : 0.85}
            strokeLinejoin="round"
            filter="url(#xcRegionShadow)"
            onMouseEnter={() => setHovered("中国")}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer", transition: "fill-opacity 180ms ease, stroke-width 180ms ease" }}
          >
            <title>中国</title>
          </path>

          <g filter="url(#xcRegionShadow)">
            {TRAVEL_OVERSEAS.map((place) => (
              <LitRegion
                key={place.name}
                name={place.name}
                p={project}
                shrink={0.96}
                hoveredName={hovered}
                onHover={setHovered}
                strokeWidth={0.45}
                flat
              />
            ))}
          </g>

          <HoverChip name={hovered} />
        </svg>
      </div>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">02 / China</span>
            <h4 className="text-base font-semibold text-slate-700">中国地图</h4>
          </div>
          <p className="text-right text-[11px] text-slate-400">按驻留时间 t 分级点亮</p>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-slate-200/70 bg-[#f8fbfa] px-2 py-3 shadow-[0_18px_55px_-40px_rgba(15,118,110,.45)] sm:px-5">
          <svg viewBox={`0 0 ${CN_W} ${CN_H}`} className="mx-auto block w-full max-w-[680px]" aria-label="中国省级旅行地图">
            <defs>
              <filter id="xcRegionShadowCN" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#065F46" floodOpacity="0.2" />
              </filter>
            </defs>

            <g>
              {CHINA_PROVINCES.map((province) => {
                const depth = depthOf(province.name);
                const isActive = hovered === province.name;
                return (
                <path
                  key={province.name}
                  d={toPath(province.poly, projectCN)}
                  fill={depth ? TRAVEL_DEPTH_COLOR[depth] : "#fdfefd"}
                  fillOpacity={depth ? (isActive ? .98 : .88) : 1}
                  stroke={depth ? "#f4fbf7" : "#9caaa7"}
                  strokeWidth={isActive ? 2 : 1.05}
                  strokeLinejoin="round"
                  onMouseEnter={() => setHovered(province.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="transition-[fill-opacity,filter] duration-200"
                  style={{ cursor: "pointer", filter: isActive ? "drop-shadow(0 2px 3px rgba(6,95,70,.28))" : undefined }}
                >
                  <title>{province.name}</title>
                </path>
              );})}
            </g>

            <HoverChip name={hovered} />
            <text x={CN_W - 10} y={CN_H - 9} textAnchor="end" fontSize="10.5" fill="#82908d">
              未点亮区域仍保留省级轮廓
            </text>
          </svg>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {legend.map((depth) => (
            <div key={depth} className="rounded-xl border border-slate-200/70 bg-white/75 px-3 py-2.5">
              <span className="block h-1.5 w-8 rounded-full" style={{ background: TRAVEL_DEPTH_COLOR[depth] }} />
              <span className="mt-2 block text-[11px] font-medium text-slate-600">{TRAVEL_DEPTH_LABEL[depth]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
