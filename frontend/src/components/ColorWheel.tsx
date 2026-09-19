import { useState } from "react";
import { motion } from "framer-motion";
import { WHEEL, MULTICOLOR, type SectionKey } from "@/data/content";

interface ColorWheelProps {
  onSelect: (key: SectionKey) => void;
}

const CX = 200;
const CY = 200;
const R_OUTER = 186;
const R_INNER = 80;
const STEP = 360 / WHEEL.length;

function polar(r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
}

function segmentPath(a1: number, a2: number) {
  const o1 = polar(R_OUTER, a1);
  const o2 = polar(R_OUTER, a2);
  const i2 = polar(R_INNER, a2);
  const i1 = polar(R_INNER, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i2.x} ${i2.y}`,
    `A ${R_INNER} ${R_INNER} 0 ${large} 0 ${i1.x} ${i1.y}`,
    "Z",
  ].join(" ");
}

export function ColorWheel({ onSelect }: ColorWheelProps) {
  const [hovered, setHovered] = useState<SectionKey | null>(null);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox="0 0 400 400" className="h-full w-full">
        {WHEEL.map((seg, i) => {
          const a1 = i * STEP - 90 + 0.6;
          const a2 = (i + 1) * STEP - 90 - 0.6;
          const mid = (a1 + a2) / 2;
          const labelPos = polar((R_OUTER + R_INNER) / 2, mid);
          const isHover = hovered === seg.key;
          return (
            <g
              key={seg.key}
              onClick={() => onSelect(seg.key)}
              onMouseEnter={() => setHovered(seg.key)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              <path
                d={segmentPath(a1, a2)}
                fill={seg.color}
                stroke="#fff"
                strokeWidth={3}
                style={{
                  transition: "transform 0.25s ease, filter 0.25s ease",
                  transform: isHover ? "scale(1.04)" : "scale(1)",
                  filter: isHover
                    ? "drop-shadow(0 6px 14px rgba(0,0,0,0.25))"
                    : "none",
                  opacity: hovered && !isHover ? 0.85 : 1,
                }}
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fontWeight={700}
                fill="#1f2937"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {seg.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 中心 MULTICOLOR 按钮 */}
      <button
        onClick={() => onSelect(MULTICOLOR.key)}
        onMouseEnter={() => setHovered("multicolor")}
        onMouseLeave={() => setHovered(null)}
        className="absolute left-1/2 top-1/2 flex h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-bold tracking-wider text-white shadow-lg ring-4 ring-white transition hover:scale-110"
        style={{
          background:
            "conic-gradient(#F5C518,#E5484D,#EC5C8D,#8E5BEF,#3B82F6,#8B95A1,#2FBF71,#F5C518)",
        }}
        aria-label="打开全部 / 关于我"
      >
        ALL
      </button>

      <motion.p
        className="mt-6 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        点击色环上的颜色，打开小程的世界 ↓
      </motion.p>
    </div>
  );
}
