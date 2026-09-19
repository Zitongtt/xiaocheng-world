import { useState } from "react";
import {
  TRAVEL_DOMESTIC,
  TRAVEL_OVERSEAS,
  TRAVEL_DEPTH_COLOR,
  type TravelPlace,
} from "@/data/content";

// 粗略的中国轮廓（lon, lat），用于投影成可识别的形状
const CHINA_OUTLINE: [number, number][] = [
  [73, 39], [75, 37], [80, 35], [85, 36], [88, 48], [91, 46], [96, 43],
  [100, 42], [110, 42], [115, 45], [120, 50], [125, 53], [131, 48],
  [128, 42], [124, 40], [122, 37], [120, 34], [121, 31], [118, 24],
  [113, 22], [110, 21], [108, 21], [106, 22], [102, 22], [98, 24],
  [97, 28], [85, 28], [82, 30], [78, 32], [74, 35], [73, 39],
];

const LON_MIN = 73, LON_MAX = 135, LAT_MIN = 18, LAT_MAX = 53;
const X0 = 60, X1 = 940, Y0 = 40, Y1 = 760;

function project(lon: number, lat: number) {
  const x = X0 + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (X1 - X0);
  const y = Y1 - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * (Y1 - Y0);
  return { x, y };
}

function outlinePath() {
  return (
    CHINA_OUTLINE.map(([lon, lat], i) => {
      const { x, y } = project(lon, lat);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ") + " Z"
  );
}

export function LifeSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const all = [...TRAVEL_DOMESTIC, ...TRAVEL_OVERSEAS];
  const total = all.length;

  return (
    <div>
      <p className="mb-3 text-sm text-gray-500">
        已点亮 <span className="font-semibold text-green-600">{total}</span> 个地方
        ——颜色越深，走得越近、留得越久。
      </p>

      <svg viewBox="0 0 1000 820" className="w-full">
        {/* 中国轮廓 */}
        <path
          d={outlinePath()}
          fill="#ecfdf5"
          stroke="#bbf7d0"
          strokeWidth={2}
        />

        {/* 国内地点 */}
        {TRAVEL_DOMESTIC.map((p: TravelPlace) => {
          const { x, y } = project(p.lon, p.lat);
          const r = 5 + p.depth;
          const color = TRAVEL_DEPTH_COLOR[p.depth];
          return (
            <g
              key={p.name}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={x} cy={y} r={r + 3} fill={color} opacity={0.25} />
              <circle cx={x} cy={y} r={r} fill={color} />
              <title>{p.name}</title>
            </g>
          );
        })}

        {/* 海外小窗 */}
        <rect
          x={838}
          y={600}
          width={150}
          height={150}
          rx={16}
          fill="#f0fdf4"
          stroke="#bbf7d0"
          strokeWidth={1.5}
          strokeDasharray="6 5"
        />
        <text x={913} y={624} textAnchor="middle" fontSize={13} fill="#16a34a" fontWeight={600}>
          海外 · 东南亚
        </text>
        {TRAVEL_OVERSEAS.map((p: TravelPlace, i: number) => {
          const x = 868 + (i % 2) * 70;
          const y = 660 + Math.floor(i / 2) * 48;
          const color = TRAVEL_DEPTH_COLOR[p.depth];
          return (
            <g
              key={p.name}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={x} cy={y} r={8} fill={color} />
              <text x={x + 14} y={y + 4} fontSize={12} fill="#374151">
                {p.name}
              </text>
              <title>{p.name}</title>
            </g>
          );
        })}

        {/* 悬停提示 */}
        {hovered && (
          <text
            x={500}
            y={800}
            textAnchor="middle"
            fontSize={16}
            fontWeight={700}
            fill="#15803d"
          >
            {hovered}
          </text>
        )}
      </svg>

      {/* 图例 */}
      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        {[1, 2, 3, 4, 5].map((d) => (
          <span key={d} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: TRAVEL_DEPTH_COLOR[d] }}
            />
            {d === 5 ? "最 deepest" : d === 4 ? "最深" : d === 3 ? "较深" : d === 2 ? "较较深" : "基础"}
          </span>
        ))}
      </div>
    </div>
  );
}
