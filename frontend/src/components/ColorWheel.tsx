import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { WHEEL, MULTICOLOR, type SectionKey, type WheelSegment } from "@/data/content";
import { CatLogo, SectionIcon } from "./SiteIcons";

interface ColorWheelProps {
  onSelect: (key: SectionKey) => void;
}

type Point = { x: number; y: number };

const CX = 250;
const CY = 250;
const SEGMENTS: Array<WheelSegment | typeof MULTICOLOR> = [
  WHEEL[0], WHEEL[1], WHEEL[2], WHEEL[3], WHEEL[4], WHEEL[5], WHEEL[6], MULTICOLOR,
];

const PALETTES = [
  ["#fff4a7", "#f2c83f"],
  ["#ffc8bd", "#df7469"],
  ["#ffd0e4", "#e787b3"],
  ["#d9c9ff", "#8f72df"],
  ["#c5d9ff", "#6289e6"],
  ["#e2e7ee", "#929eae"],
  ["#c8efd4", "#55b77c"],
  ["#d8c7ff", "#a77ede"],
];

function polar(radius: number, angle: number): Point {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + Math.cos(rad) * radius, y: CY + Math.sin(rad) * radius };
}

function closedCurve(points: Point[]): string {
  return points
    .map((point, index) => {
      const previous = points[(index - 1 + points.length) % points.length];
      const next = points[(index + 1) % points.length];
      const nextNext = points[(index + 2) % points.length];
      if (index === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
      const c1 = { x: previous.x + (point.x - points[(index - 2 + points.length) % points.length].x) / 6, y: previous.y + (point.y - points[(index - 2 + points.length) % points.length].y) / 6 };
      const c2 = { x: point.x - (next.x - previous.x) / 6, y: point.y - (next.y - previous.y) / 6 };
      void nextNext;
      return `C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

function makePetal(index: number) {
  const centerAngle = -90 + index * 45;
  const outerRadii = [194, 213, 225, 216, 198];
  const innerRadii = [118, 108, 101, 109, 120];
  const angles = [-27, -14, 0, 14, 27];
  const outer = angles.map((offset, pointIndex) => polar(outerRadii[pointIndex] + ((index + pointIndex) % 3 - 1) * 4, centerAngle + offset));
  const inner = [...angles].reverse().map((offset, reverseIndex) => {
    const pointIndex = angles.length - 1 - reverseIndex;
    return polar(innerRadii[pointIndex] + ((index * 2 + pointIndex) % 3 - 1) * 3, centerAngle + offset);
  });
  return {
    path: closedCurve([...outer, ...inner]),
    label: polar(168, centerAngle),
    floatX: Math.cos((centerAngle * Math.PI) / 180) * 12,
    floatY: Math.sin((centerAngle * Math.PI) / 180) * 12,
  };
}

export function ColorWheel({ onSelect }: ColorWheelProps) {
  const [hovered, setHovered] = useState<SectionKey | null>(null);
  const [selected, setSelected] = useState<SectionKey | null>(null);
  const timer = useRef<number | null>(null);
  const petals = useMemo(() => SEGMENTS.map((_, index) => makePetal(index)), []);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const openSection = (key: SectionKey) => {
    if (selected) return;
    setSelected(key);
    timer.current = window.setTimeout(() => {
      onSelect(key);
      setSelected(null);
    }, 760);
  };

  const onSegmentKeyDown = (event: KeyboardEvent<SVGGElement>, key: SectionKey) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSection(key);
    }
  };

  return (
    <div
      className={`organic-wheel relative aspect-square w-full ${hovered ? "has-hover" : ""} ${selected ? "is-opening" : ""}`}
      aria-label="小程的世界栏目导航"
    >
      <div aria-hidden className="organic-wheel__halo" />
      <svg viewBox="0 0 500 500" className="relative z-10 h-full w-full overflow-visible" role="group">
        <defs>
          <filter id="organicSoftGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="13" />
          </filter>
          <filter id="organicPetalShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#8092ad" floodOpacity=".16" />
          </filter>
          {PALETTES.map(([light, deep], index) => (
            <radialGradient key={index} id={`petalGradient${index}`} cx="30%" cy="20%" r="88%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".75" />
              <stop offset="24%" stopColor={light} stopOpacity=".92" />
              <stop offset="100%" stopColor={deep} stopOpacity=".94" />
            </radialGradient>
          ))}
          <linearGradient id="aboutShimmer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b99aed" />
            <stop offset=".42" stopColor="#9ecbe5" />
            <stop offset=".72" stopColor="#a9dfbc" />
            <stop offset="1" stopColor="#d7b6ea" />
          </linearGradient>
        </defs>

        <g className="organic-wheel__aura" filter="url(#organicSoftGlow)" aria-hidden>
          {petals.map((petal, index) => (
            <path key={index} d={petal.path} fill={index === 7 ? "url(#aboutShimmer)" : `url(#petalGradient${index})`} />
          ))}
        </g>

        <circle className="organic-wheel__orbit organic-wheel__orbit--outer" cx="250" cy="250" r="229" />
        <circle className="organic-wheel__orbit organic-wheel__orbit--inner" cx="250" cy="250" r="112" />

        <g filter="url(#organicPetalShadow)">
          {SEGMENTS.map((segment, index) => {
            const petal = petals[index];
            const isHovered = hovered === segment.key;
            const isSelected = selected === segment.key;
            return (
              <g
                key={segment.key}
                role="button"
                tabIndex={0}
                aria-label={`${segment.label} ${segment.nav}`}
                onMouseEnter={() => setHovered(segment.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(segment.key)}
                onBlur={() => setHovered(null)}
                onClick={() => openSection(segment.key)}
                onKeyDown={(event) => onSegmentKeyDown(event, segment.key)}
                className={`organic-segment ${isHovered ? "is-hovered" : ""} ${isSelected ? "is-selected" : ""}`}
                style={{
                  "--float-x": `${petal.floatX}px`,
                  "--float-y": `${petal.floatY}px`,
                  "--open-x": `${petal.floatX * 2.2}px`,
                  "--open-y": `${petal.floatY * 2.2}px`,
                } as CSSProperties}
              >
                <path className="organic-segment__shape" d={petal.path} fill={index === 7 ? "url(#aboutShimmer)" : `url(#petalGradient${index})`} />
                <g className="organic-segment__label" transform={`translate(${petal.label.x} ${petal.label.y})`}>
                  <g transform="translate(-17 -42)"><SectionIcon name={segment.icon} size={34} /></g>
                  <text className="organic-segment__en" textAnchor="middle" y="6">{segment.label}</text>
                  <text className="organic-segment__cn" textAnchor="middle" y="25">{segment.nav}</text>
                </g>
              </g>
            );
          })}
        </g>

        <g
          className="organic-center"
          onClick={() => openSection(MULTICOLOR.key)}
          onKeyDown={(event) => onSegmentKeyDown(event, MULTICOLOR.key)}
          role="button"
          tabIndex={0}
          aria-label="打开关于小程"
        >
          <circle cx="250" cy="250" r="78" fill="rgba(255,253,248,.97)" />
          <foreignObject x="172" y="172" width="156" height="156" pointerEvents="none">
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              <CatLogo size={29} color="#344058" />
              <span className="handwritten mt-1 text-[14px] italic leading-tight text-[#43506a]">Open the world</span>
              <span className="mt-0.5 text-[15px] font-medium leading-tight text-[#344058]">of 小程</span>
              <ChevronDown size={15} className="mt-1 text-[#7890b8]" />
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}
