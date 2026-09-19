import type { ReactNode } from "react";

// ===========================================================================
// 首页小图标：色环扇区里的图形、小猫 logo、气泡等
// 全部是 inline SVG（矢量、不依赖图片），风格统一成细描边 + 半透明填充。
// ===========================================================================

/** 小猫 logo（首页左上角和色环中心用） */
export function CatLogo({ size = 28, color = "#3F3F46" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden>
      <path
        d="M12 20 L9 8 L19 14.5 M36 20 L39 8 L29 14.5"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 13 C34.5 13 40 19.5 40 27 C40 34.5 33 39 24 39 C15 39 8 34.5 8 27 C8 19.5 13.5 13 24 13 Z"
        fill={color}
      />
      <circle cx="18" cy="25" r="2.1" fill="#FFFFFF" />
      <circle cx="30" cy="25" r="2.1" fill="#FFFFFF" />
      <path d="M24 29.5 L22.4 31.4 H25.6 Z" fill="#FFFFFF" />
      <path
        d="M11.5 30 L4.5 29 M11.8 34 L5.5 35.5 M36.5 30 L43.5 29 M36.2 34 L42.5 35.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 色环扇区里的小图标
// ---------------------------------------------------------------------------
const S = {
  fill: "rgba(255,255,255,0.34)",
  stroke: "#FFFFFF",
  strokeWidth: 2.1,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

const ICONS: Record<string, ReactNode> = {
  home: (
    <>
      <path d="M7 19 L21 8 L35 19" {...S} fill="none" />
      <path d="M11 18 V34 H31 V18" {...S} />
      <path d="M18 34 V25 H24 V34" {...S} fill="none" />
    </>
  ),
  rocket: (
    <>
      <path d="M21 8 C27 12 30 19 30 26 L12 26 C12 19 15 12 21 8 Z" {...S} />
      <circle cx="21" cy="18" r="3.4" fill="none" stroke="#FFFFFF" strokeWidth="2.1" />
      <path d="M15 28 L11 34 M27 28 L31 34 M19 30 L20 36 L22 30" {...S} fill="none" />
    </>
  ),
  star: (
    <path
      d="M21 7 L24.6 16.4 L34.5 17 L26.7 23.4 L29.3 33 L21 27.6 L12.7 33 L15.3 23.4 L7.5 17 L17.4 16.4 Z"
      {...S}
    />
  ),
  box: (
    <>
      <path d="M21 7 L34 14 V28 L21 35 L8 28 V14 Z" {...S} />
      <path d="M8 14 L21 21 L34 14 M21 21 V35" fill="none" stroke="#FFFFFF" strokeWidth="2.1" strokeLinejoin="round" />
    </>
  ),
  code: (
    <>
      <path d="M15 12 L7 21 L15 30" {...S} fill="none" />
      <path d="M27 12 L35 21 L27 30" {...S} fill="none" />
      <path d="M24 10 L18 32" {...S} fill="none" />
    </>
  ),
  cloud: (
    <path
      d="M13 30 C8 30 6 26 8 22 C6 17 11 13 16 15 C18 9 27 9 29 15 C35 14 38 20 35 24 C37 28 33 31 29 30 Z"
      {...S}
    />
  ),
  compass: (
    <>
      <circle cx="21" cy="21" r="13" {...S} />
      <path d="M26 16 L23 23 L16 26 L19 19 Z" {...S} />
    </>
  ),
  pig: (
    <>
      <path d="M11 17 L9 9 L16 13 M31 17 L33 9 L26 13" fill="none" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="21" cy="24" rx="12" ry="10" {...S} />
      <circle cx="17" cy="23" r="1.7" fill="#FFFFFF" />
      <circle cx="25" cy="23" r="1.7" fill="#FFFFFF" />
      <ellipse cx="21" cy="28.5" rx="3.4" ry="2.4" fill="#FFFFFF" opacity="0.9" />
    </>
  ),
};

/** 按编号取图标 */
export function SectionIcon({ name, size = 34 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 42 42" width={size} height={size} fill="none" aria-hidden>
      {ICONS[name] ?? ICONS.star}
    </svg>
  );
}

/** 首页装饰用的泡泡 */
export function Bubble({
  size,
  className = "",
  delay = 0,
}: {
  size: number;
  className?: string;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={`bubble pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        background:
          "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.28) 52%, rgba(190,225,255,0.22) 100%)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "inset -3px -4px 8px rgba(180,205,235,0.35), 0 6px 18px rgba(150,185,225,0.22)",
      }}
    />
  );
}

/** 底部远山 + 云 + 纸飞机，让首页底部有一层景深 */
export function HeroScenery() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 overflow-hidden">
      {/* 远山 */}
      <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full" preserveAspectRatio="none">
        <path
          d="M0 250 L120 210 L220 245 L330 195 L430 240 L560 185 L680 235 L820 190 L960 240 L1090 200 L1230 245 L1340 215 L1440 250 L1440 320 L0 320 Z"
          fill="rgba(183,203,232,0.35)"
        />
        <path
          d="M0 285 L140 255 L260 285 L400 240 L540 285 L700 245 L860 288 L1010 250 L1160 288 L1310 255 L1440 285 L1440 320 L0 320 Z"
          fill="rgba(158,183,219,0.42)"
        />
        <path
          d="M0 310 L200 292 L400 308 L620 282 L840 308 L1060 286 L1280 308 L1440 294 L1440 320 L0 320 Z"
          fill="rgba(136,164,205,0.5)"
        />
      </svg>

      {/* 云 */}
      <svg viewBox="0 0 200 60" className="absolute bottom-32 left-[6%] w-40 opacity-70">
        <path
          d="M30 46 C14 46 8 36 16 29 C12 18 28 11 38 18 C44 8 64 9 68 20 C82 18 90 30 84 38 C92 46 82 54 70 52 Z"
          fill="rgba(255,255,255,0.75)"
        />
      </svg>
      <svg viewBox="0 0 200 60" className="absolute bottom-44 right-[10%] w-28 opacity-60">
        <path
          d="M30 46 C14 46 8 36 16 29 C12 18 28 11 38 18 C44 8 64 9 68 20 C82 18 90 30 84 38 C92 46 82 54 70 52 Z"
          fill="rgba(255,255,255,0.8)"
        />
      </svg>

      {/* 纸飞机 */}
      <svg viewBox="0 0 120 60" className="absolute bottom-40 right-[22%] w-24 opacity-80 sm:right-[26%]">
        <path d="M6 30 L104 8 L52 52 L44 34 Z" fill="rgba(255,255,255,0.9)" stroke="rgba(150,180,215,0.7)" strokeWidth="1.4" />
        <path d="M44 34 L104 8" stroke="rgba(150,180,215,0.7)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
