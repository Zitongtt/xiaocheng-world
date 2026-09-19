import type { ReactNode } from "react";

// ===========================================================================
// Skills 抽卡用的动漫插画
// 全部是手写的 inline SVG：矢量、不依赖任何图片文件，缩放都不糊。
// 每张牌一个小场景：一个女孩子 + 一件和这张牌有关的道具。
// ===========================================================================

const SKIN = "#FFE3D3";
const HAIR = "#33302E";
const HAIR_HI = "#4E4A47";
const LINE = "#33302E";
const SHIRT = "#F7F7FA";

/** 同一个女孩子的头 + 上半身（可换发型小配饰） */
function Girl({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform-origin={`${x + 36} ${y + 60}`} transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* 后发 */}
      <path
        d="M11 38 C11 9 22 3 36 3 C50 3 61 9 61 38 L61 62 C61 70 57 76 52 79 L20 79 C15 76 11 70 11 62 Z"
        fill={HAIR}
      />
      {/* 身体 / 衬衫 */}
      <path d="M18 79 C19 68 26 63 36 63 C46 63 53 68 54 79 Z" fill={SHIRT} stroke={LINE} strokeWidth="1.6" strokeLinejoin="round" />
      {/* 脖子 */}
      <rect x="31" y="53" width="10" height="12" rx="4" fill={SKIN} />
      {/* 脸 */}
      <ellipse cx="36" cy="35" rx="22" ry="23.5" fill={SKIN} />
      {/* 耳朵 */}
      <ellipse cx="14.5" cy="37" rx="3.6" ry="5.5" fill={SKIN} />
      <ellipse cx="57.5" cy="37" rx="3.6" ry="5.5" fill={SKIN} />
      {/* 刘海 */}
      <path
        d="M12 34 C12 10 23 4 36 4 C49 4 60 10 60 34 C55 20 49 17 41 20 C34 23 27 23 22 20 C16 24 13 27 12 34 Z"
        fill={HAIR}
      />
      <path d="M24 11 C30 5 44 5 50 11 C42 8 32 8 24 11 Z" fill={HAIR_HI} />
      {/* 眉毛 */}
      <path d="M22 30 C25 28 29 28.5 31 30" stroke={LINE} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M41 30 C43 28.5 47 28 50 30" stroke={LINE} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* 眼睛 */}
      <ellipse cx="26" cy="38" rx="4.6" ry="5.4" fill={LINE} />
      <ellipse cx="46" cy="38" rx="4.6" ry="5.4" fill={LINE} />
      <circle cx="27.6" cy="36" r="1.6" fill="#FFFFFF" />
      <circle cx="47.6" cy="36" r="1.6" fill="#FFFFFF" />
      {/* 腮红 */}
      <ellipse cx="19" cy="45" rx="4" ry="2.3" fill="#FFB3C6" opacity="0.75" />
      <ellipse cx="53" cy="45" rx="4" ry="2.3" fill="#FFB3C6" opacity="0.75" />
      {/* 嘴 */}
      <path d="M33 46 C35 49.5 39 49.5 41 46" stroke={LINE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** 飘在空中的小音符 */
function Notes({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill={color} opacity="0.85">
      <ellipse cx="0" cy="0" rx="4" ry="3.2" />
      <rect x="3.2" y="-13" width="1.6" height="13" rx="0.8" />
      <path d="M3.2 -13 C7 -11.5 8 -9.5 8 -7.5 C6.5 -9.5 5 -10.3 3.2 -10.5 Z" />
      <ellipse cx="14" cy="5" rx="3.4" ry="2.7" />
      <rect x="16.8" y="-6" width="1.5" height="11" rx="0.75" />
      <path d="M16.8 -6 C20 -4.8 20.8 -3 20.8 -1.4 C19.5 -3 18.2 -3.7 16.8 -3.9 Z" />
    </g>
  );
}

/** 速度线 */
function Speed({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round">
      <path d="M0 0 H16" />
      <path d="M4 10 H22" />
      <path d="M0 20 H13" />
    </g>
  );
}

/** 浮动卡片用的柔和投影 / 光晕（用到它的 svg 内部自己放一份） */
function Defs() {
  return (
    <defs>
      <filter id="xcSoft" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#94A3B8" floodOpacity="0.4" />
      </filter>
      <filter id="xcBlur" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
    </defs>
  );
}

/** 小星星 */
function Star({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${r})`}
      d="M0 -10 L2.9 -3.2 L10 -2.6 L4.6 2.1 L6.4 9.2 L0 5.4 L-6.4 9.2 L-4.6 2.1 L-10 -2.6 L-2.9 -3.2 Z"
      fill={color}
      opacity="0.9"
    />
  );
}

// ---------------------------------------------------------------------------
// 技能卡插画
// ---------------------------------------------------------------------------

function ArtPython({ accent }: { accent: string }) {
  return (
    <g>
      <Defs />
      <Girl x={8} y={28} scale={0.84} />
      <g transform="translate(0 14)">
        {/* 笔记本电脑（带柔光投影，像浮在卡面上） */}
        <g transform="translate(84 62)" filter="url(#xcSoft)">
          <path d="M6 0 H66 L74 40 H-2 Z" fill="#E7EAF3" stroke={LINE} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 6 H60 L65 33 H7 Z" fill="#1E1E2E" />
          <text x="36" y="24" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#7DD3FC">
            &gt;_
          </text>
          <rect x="-10" y="40" width="94" height="7" rx="3.5" fill="#CBD5E1" stroke={LINE} strokeWidth="1.6" />
        </g>
        {/* 代码卡片 + Python 双蛇色块 */}
        <g transform="translate(102 -8)" filter="url(#xcSoft)">
          <rect width="84" height="46" rx="7" fill="#2B2B3C" />
          <circle cx="9" cy="9" r="2.6" fill="#FF5F57" />
          <circle cx="18" cy="9" r="2.6" fill="#FEBC2E" />
          <circle cx="27" cy="9" r="2.6" fill="#28C840" />
          <rect x="9" y="19" width="30" height="4" rx="2" fill="#93C5FD" />
          <rect x="43" y="19" width="20" height="4" rx="2" fill="#FCD34D" />
          <rect x="9" y="28" width="18" height="4" rx="2" fill="#A7F3D0" />
          <rect x="31" y="28" width="30" height="4" rx="2" fill="#F9A8D4" />
          <g transform="translate(67 22) scale(0.5)">
            <path d="M2 -22 C2 -34 12 -34 20 -34 H24 C32 -34 42 -34 42 -22 V-4 C42 6 34 6 28 6 H12 V-2 H28 C34 -2 34 -6 34 -10 V-26 C34 -30 30 -30 24 -30 H4 V-14 H-4 V-22 C-4 -34 6 -34 14 -34" fill="#3776AB" />
          </g>
        </g>
      </g>
      <Star x={92} y={124} r={0.5} color="#FCD34D" />
      <Star x={176} y={116} r={0.4} color="#93C5FD" />
      <circle cx="8" cy="126" r="3" fill={accent} opacity="0.35" />
    </g>
  );
}

function ArtC({ accent }: { accent: string }) {
  return (
    <g>
      <Girl x={8} y={26} scale={0.86} />
      {/* 芯片 */}
      <g transform="translate(96 32)">
        <rect x="0" y="0" width="62" height="62" rx="9" fill="#4F46E5" stroke={LINE} strokeWidth="1.8" />
        <rect x="11" y="11" width="40" height="40" rx="5" fill="#312E81" />
        <text x="31" y="38" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#C7D2FE" fontFamily="monospace">
          C
        </text>
        {[14, 26, 38, 50].map((d) => (
          <g key={d} stroke="#818CF8" strokeWidth="3" strokeLinecap="round">
            <path d={`M${d} 0 V-7`} />
            <path d={`M${d} 62 V69`} />
            <path d={`M0 ${d} H-7`} />
            <path d={`M62 ${d} H69`} />
          </g>
        ))}
      </g>
      {/* 内存 / 指针小牌子 */}
      <g transform="translate(76 108)">
        <rect width="102" height="26" rx="6" fill="#EEF2FF" stroke={accent} strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="51" y="17.5" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#4338CA">
          int *p = &amp;a;
        </text>
      </g>
    </g>
  );
}

function ArtR({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={6} y={28} scale={0.84} />
      {/* 带 R 的图表面板 */}
      <g transform="translate(88 8)">
        <rect width="104" height="118" rx="10" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="0" y="0" width="104" height="22" rx="10" fill="#276DC3" />
        <rect x="0" y="12" width="104" height="10" fill="#276DC3" />
        <circle cx="12" cy="11" r="3.4" fill="#BFDBFE" />
        <text x="24" y="15" fontSize="11" fill="#FFFFFF" fontFamily="monospace">
          R · stats
        </text>
        {/* 柱状图 */}
        <g transform="translate(12 34)">
          <rect x="0" y="40" width="12" height="30" rx="2" fill="#60A5FA" />
          <rect x="18" y="24" width="12" height="46" rx="2" fill="#3B82F6" />
          <rect x="36" y="10" width="12" height="60" rx="2" fill="#1D4ED8" />
          <rect x="54" y="30" width="12" height="40" rx="2" fill="#93C5FD" />
          <path d="M0 44 L18 30 L36 16 L54 34" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M6 70 H64" stroke={LINE} strokeWidth="1.6" />
        </g>
        <rect x="12" y="92" width="46" height="5" rx="2.5" fill="#DBEAFE" />
        <rect x="12" y="101" width="64" height="5" rx="2.5" fill="#EFF6FF" />
      </g>
      <Star x={78} y={22} r={0.45} color="#60A5FA" />
    </g>
  );
}

function ArtWps({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={8} y={26} scale={0.86} />
      {/* 文档 */}
      <g transform="translate(86 12)">
        <rect x="10" y="4" width="72" height="98" rx="7" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="0" y="0" width="72" height="98" rx="7" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="10" y="12" width="42" height="8" rx="4" fill="#E5484D" />
        <rect x="10" y="28" width="52" height="4.5" rx="2.2" fill="#E5E7EB" />
        <rect x="10" y="38" width="46" height="4.5" rx="2.2" fill="#E5E7EB" />
        {/* 表格 */}
        <g stroke="#D1D5DB" strokeWidth="1.2" fill="none">
          <rect x="10" y="50" width="52" height="30" />
          <path d="M10 60 H62 M10 70 H62 M27 50 V80 M44 50 V80" />
        </g>
        <rect x="10" y="88" width="34" height="4.5" rx="2.2" fill="#FCA5A5" />
      </g>
      {/* 图表卡 */}
      <g transform="translate(158 62)">
        <rect width="38" height="46" rx="7" fill="#FFF1F2" stroke="#E5484D" strokeWidth="1.6" />
        <rect x="8" y="26" width="7" height="12" rx="2" fill="#FB7185" />
        <rect x="19" y="18" width="7" height="20" rx="2" fill="#E5484D" />
        <rect x="8" y="10" width="22" height="4" rx="2" fill="#FECDD3" />
      </g>
      <Star x={80} y={124} r={0.45} color="#FB7185" />
    </g>
  );
}

function ArtDrawio({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={6} y={28} scale={0.84} />
      {/* 流程图 */}
      <g transform="translate(84 10)">
        <rect x="24" y="0" width="76" height="26" rx="7" fill="#FFF7ED" stroke="#F08705" strokeWidth="1.8" />
        <text x="62" y="17" textAnchor="middle" fontSize="10" fill="#B45309">
          开始
        </text>
        <path d="M62 26 V42" stroke={LINE} strokeWidth="1.6" />
        <path d="M62 42 l-4 -6 h8 z" fill={LINE} />
        <rect x="16" y="44" width="92" height="28" rx="7" fill="#FFEDD5" stroke="#F08705" strokeWidth="1.8" />
        <text x="62" y="62" textAnchor="middle" fontSize="10" fill="#B45309">
          想法 → 结构
        </text>
        <path d="M62 72 V88" stroke={LINE} strokeWidth="1.6" />
        <path d="M62 88 l-4 -6 h8 z" fill={LINE} />
        <rect x="34" y="90" width="56" height="26" rx="13" fill="#FDE68A" stroke="#D97706" strokeWidth="1.8" />
        <text x="62" y="107" textAnchor="middle" fontSize="10" fill="#92400E">
          落地
        </text>
        {/* 虚线回环 */}
        <path d="M16 58 H4 V103 H34" stroke="#F59E0B" strokeWidth="1.6" fill="none" strokeDasharray="5 4" />
      </g>
      <Star x={78} y={20} r={0.45} color="#FBBF24" />
    </g>
  );
}

function ArtPlan({ accent }: { accent: string }) {
  return (
    <g>
      <Girl x={4} y={28} scale={0.84} />
      {/* 写字板 */}
      <g transform="translate(88 8)">
        <rect x="0" y="0" width="88" height="112" rx="9" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="28" y="-6" width="32" height="14" rx="6" fill="#9CA3AF" stroke={LINE} strokeWidth="1.4" />
        <g transform="translate(14 22)">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(0 ${i * 22})`}>
              <rect width="12" height="12" rx="3.5" fill={i < 2 ? accent : "#FFFFFF"} stroke={accent} strokeWidth="1.6" />
              {i < 2 && <path d="M2.5 6.5 L5 9 L9.5 3.5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
              <rect x="20" y="1.5" width={i < 2 ? 42 : 30} height="4.5" rx="2.2" fill="#E5E7EB" />
              <rect x="20" y="8" width={i < 2 ? 30 : 20} height="3.5" rx="1.8" fill="#F3F4F6" />
            </g>
          ))}
        </g>
      </g>
      <Star x={80} y={126} r={0.5} color={accent} />
    </g>
  );
}

function ArtTeam({ accent }: { accent: string }) {
  return (
    <g>
      <Girl x={0} y={24} scale={0.84} />
      {/* 队友（简化小人） */}
      <g transform="translate(104 26) scale(0.84)">
        <path d="M6 40 C6 14 17 8 30 8 C43 8 54 14 54 40 Z" fill="#A78BFA" />
        <ellipse cx="30" cy="34" rx="20" ry="21" fill={SKIN} />
        <path d="M10 32 C10 12 20 7 30 7 C40 7 50 12 50 32 C46 20 40 17 34 19 C28 21 22 21 18 19 C14 22 11 25 10 32 Z" fill="#6D28D9" />
        <ellipse cx="21" cy="36" rx="4" ry="4.8" fill={LINE} />
        <ellipse cx="39" cy="36" rx="4" ry="4.8" fill={LINE} />
        <circle cx="22.4" cy="34" r="1.4" fill="#FFFFFF" />
        <circle cx="40.4" cy="34" r="1.4" fill="#FFFFFF" />
        <path d="M27 43 C29 46 33 46 35 43" stroke={LINE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="15" cy="42" rx="3.4" ry="2" fill="#FFB3C6" opacity="0.75" />
        <ellipse cx="45" cy="42" rx="3.4" ry="2" fill="#FFB3C6" opacity="0.75" />
      </g>
      {/* 握在一起的手 */}
      <g transform="translate(72 96)">
        <circle cx="0" cy="0" r="9" fill={SKIN} stroke={LINE} strokeWidth="1.5" />
        <circle cx="20" cy="0" r="9" fill={SKIN} stroke={LINE} strokeWidth="1.5" />
        <path d="M8 -3 H12 M8 3 H12" stroke={LINE} strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <Star x={92} y={14} r={0.5} color={accent} />
      <Star x={170} y={126} r={0.42} color="#A78BFA" />
    </g>
  );
}

function ArtSpeak({ accent }: { accent: string }) {
  return (
    <g>
      <Girl x={10} y={26} scale={0.88} />
      {/* 话筒 */}
      <g transform="translate(96 42)">
        <rect x="18" y="0" width="30" height="52" rx="15" fill="#4B5563" stroke={LINE} strokeWidth="1.8" />
        <g stroke="#9CA3AF" strokeWidth="1.4">
          <path d="M24 10 H42 M24 20 H42 M24 30 H42 M24 40 H42" />
        </g>
        <path d="M8 34 C8 56 33 58 33 58 C33 58 58 56 58 34" stroke={LINE} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <rect x="30" y="58" width="7" height="34" rx="3" fill="#374151" />
        <ellipse cx="33" cy="96" rx="22" ry="7" fill="#1F2937" />
      </g>
      {/* 声波 */}
      <g stroke={accent} strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M164 52 C170 62 170 78 164 88" />
        <path d="M174 44 C183 60 183 80 174 96" />
        <path d="M184 36 C196 58 196 82 184 104" />
      </g>
      <Star x={88} y={20} r={0.5} color="#FCD34D" />
    </g>
  );
}

function ArtModeling({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={4} y={28} scale={0.84} />
      <g transform="translate(86 10)">
        <rect width="106" height="112" rx="10" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="0" y="0" width="106" height="24" rx="10" fill="#8E5BEF" />
        <rect x="0" y="14" width="106" height="10" fill="#8E5BEF" />
        <text x="10" y="17" fontSize="11" fill="#FFFFFF" fontFamily="monospace">
          max f(x) = ?
        </text>
        {/* 坐标轴 */}
        <path d="M14 98 H96 M14 98 V38" stroke={LINE} strokeWidth="1.8" strokeLinecap="round" />
        {/* 曲线 */}
        <path d="M16 96 C34 92 44 40 58 40 C72 40 82 74 94 88" stroke="#8E5BEF" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* 顶点 */}
        <circle cx="58" cy="40" r="4.4" fill="#F59E0B" stroke={LINE} strokeWidth="1.3" />
        <path d="M58 44 V98" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="62" y="34" fontSize="9" fill="#B45309">
          最优解
        </text>
        {/* 变量 */}
        <text x="18" y="34" fontSize="10" fill="#7C3AED" fontFamily="monospace">
          x₁ x₂ x₃
        </text>
      </g>
      <Star x={78} y={126} r={0.45} color="#C4B5FD" />
    </g>
  );
}

function ArtData({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={6} y={28} scale={0.84} />
      <g transform="translate(88 4)">
        <rect width="104" height="122" rx="10" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="0" y="0" width="104" height="22" rx="10" fill="#0EA5E9" />
        <rect x="0" y="13" width="104" height="9" fill="#0EA5E9" />
        <circle cx="12" cy="11" r="3.2" fill="#BAE6FD" />
        <circle cx="24" cy="11" r="3.2" fill="#7DD3FC" />
        <circle cx="36" cy="11" r="3.2" fill="#38BDF8" />
        {/* 折线上升 */}
        <path d="M12 92 L32 74 L52 80 L72 52 L92 40" stroke="#0284C7" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 92 L32 74 L52 80 L72 52 L92 40 L92 104 L12 104 Z" fill="#0EA5E9" opacity="0.14" />
        <path d="M12 104 H94" stroke={LINE} strokeWidth="1.6" />
        {[
          [32, 74],
          [52, 80],
          [72, 52],
          [92, 40],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="3.4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
        ))}
      </g>
      <Star x={80} y={20} r={0.45} color="#7DD3FC" />
    </g>
  );
}

function ArtMarket({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={4} y={28} scale={0.82} />
      {/* 问卷 */}
      <g transform="translate(82 14)">
        <rect x="0" y="6" width="62" height="86" rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="8" y="0" width="62" height="86" rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="16" y="12" width="34" height="6" rx="3" fill="#14B8A6" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(16 ${28 + i * 18})`}>
            <circle cx="4" cy="4" r="4.5" fill="none" stroke="#14B8A6" strokeWidth="1.6" />
            {i === 1 && <circle cx="4" cy="4" r="2" fill="#14B8A6" />}
            <rect x="14" y="1.5" width="34" height="5" rx="2.5" fill="#E5E7EB" />
          </g>
        ))}
      </g>
      {/* 放大镜 + 饼图 */}
      <g transform="translate(140 40)">
        <circle cx="24" cy="24" r="22" fill="#ECFDF5" stroke="#0F766E" strokeWidth="2.4" />
        <path d="M24 24 L24 2 A22 22 0 0 1 43 35 Z" fill="#2DD4BF" />
        <path d="M24 24 L43 35 A22 22 0 0 1 5 30 Z" fill="#0D9488" opacity="0.75" />
        <path d="M40 42 L58 60" stroke="#0F766E" strokeWidth="6" strokeLinecap="round" />
      </g>
      <Star x={78} y={126} r={0.45} color="#5EEAD4" />
    </g>
  );
}

function ArtTrack({ accent }: { accent: string }) {
  return (
    <g>
      <Speed x={86} y={54} />
      <Speed x={92} y={98} />
      {/* 跑道 */}
      <g>
        <path d="M0 122 H200" stroke="#FECACA" strokeWidth="10" />
        <path d="M0 122 H200" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="12 10" />
      </g>
      {/* 跑动的小程 */}
      <g transform="translate(112 24)">
        <path d="M-4 66 L14 42" stroke={LINE} strokeWidth="7" strokeLinecap="round" />
        <path d="M14 42 L30 60" stroke={LINE} strokeWidth="7" strokeLinecap="round" />
        <path d="M-8 64 L-22 78" stroke={LINE} strokeWidth="7" strokeLinecap="round" />
        <path d="M28 62 L40 80" stroke={LINE} strokeWidth="7" strokeLinecap="round" />
        <path d="M14 42 C6 26 12 14 22 12 C32 10 38 20 34 34 Z" fill="#EF4444" />
        <path d="M26 30 L46 20" stroke={SKIN} strokeWidth="7" strokeLinecap="round" />
        <path d="M8 34 L-8 26" stroke={SKIN} strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="26" cy="0" rx="16" ry="17" fill={SKIN} />
        <path d="M11 -2 C11 -18 20 -22 27 -22 C35 -22 42 -17 42 -2 C38 -12 33 -14 28 -12 C23 -10 18 -10 15 -12 C13 -9 12 -6 11 -2 Z" fill={HAIR} />
        <path d="M40 -14 C48 -10 50 -2 46 4 C45 -4 43 -8 40 -14 Z" fill={HAIR} />
        <ellipse cx="20" cy="1" rx="3.4" ry="4" fill={LINE} />
        <ellipse cx="33" cy="1" rx="3.4" ry="4" fill={LINE} />
        <circle cx="21.2" cy="-0.5" r="1.2" fill="#FFFFFF" />
        <circle cx="34.2" cy="-0.5" r="1.2" fill="#FFFFFF" />
        <path d="M24 9 C26 11.5 29 11.5 31 9" stroke={LINE} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
      {/* 终点带 */}
      <g transform="translate(178 74)">
        <path d="M0 0 V48" stroke={accent} strokeWidth="3" />
        <path d="M0 6 l14 6 l-14 6" fill="none" stroke={accent} strokeWidth="3" />
      </g>
      <Star x={78} y={30} r={0.5} color="#FCA5A5" />
    </g>
  );
}

function ArtCet4({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={6} y={28} scale={0.84} />
      {/* 证书 */}
      <g transform="translate(84 16)">
        <rect x="6" y="6" width="102" height="72" rx="8" fill="#EEF2FF" stroke={LINE} strokeWidth="1.8" />
        <rect x="0" y="0" width="102" height="72" rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        <rect x="0" y="0" width="102" height="20" rx="8" fill="#6366F1" />
        <rect x="0" y="12" width="102" height="8" fill="#6366F1" />
        <text x="51" y="14.5" textAnchor="middle" fontSize="10" fill="#FFFFFF">
          Certificate
        </text>
        <rect x="12" y="30" width="56" height="5" rx="2.5" fill="#E0E7FF" />
        <rect x="12" y="41" width="70" height="5" rx="2.5" fill="#EEF2FF" />
        <rect x="12" y="52" width="44" height="5" rx="2.5" fill="#EEF2FF" />
        <circle cx="84" cy="52" r="11" fill="#FDE68A" stroke="#D97706" strokeWidth="1.6" />
        <text x="84" y="56" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400E">
          4
        </text>
      </g>
      {/* 绶带奖章 */}
      <g transform="translate(148 70)">
        <path d="M6 0 L-6 30 L6 24 L18 30 L6 0 Z" fill="#EF4444" />
        <circle cx="6" cy="2" r="14" fill="#FBBF24" stroke="#D97706" strokeWidth="1.8" />
        <text x="6" y="7" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400E">
          A
        </text>
      </g>
      <Star x={80} y={24} r={0.45} color="#A5B4FC" />
    </g>
  );
}

// ---------------------------------------------------------------------------
// 兴趣卡插画
// ---------------------------------------------------------------------------

/** 钢琴：主体就是这台琴，不画人物（有主体的牌只画主体） */
function ArtPiano({ accent }: { accent: string }) {
  return (
    <g>
      <Defs />
      <g transform="translate(2 2) scale(1.02)">
        {/* 琴身（三角钢琴） */}
        <path
          d="M14 118 V46 C14 20 36 6 66 6 H172 C184 6 189 16 182 27 L152 52 H14 Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 掀起的琴盖 */}
        <path d="M14 46 C14 20 36 6 66 6 H172 C183 6 188 14 183 24 L154 46 Z" fill="#334155" />
        <path d="M34 17 C66 7 128 7 168 13" stroke="#64748B" strokeWidth="2.4" fill="none" opacity="0.65" />
        {/* 键盘 */}
        <rect x="8" y="82" width="146" height="32" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.4" />
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={12 + i * 13} y="82" width="12" height="32" fill="none" stroke="#CBD5E1" strokeWidth="1" />
        ))}
        {[1, 2, 4, 5, 6, 8, 9].map((i) => (
          <rect key={i} x={16.5 + i * 13} y="82" width="7" height="20" rx="2" fill="#111827" />
        ))}
        {/* 谱架 + 谱子 */}
        <path d="M62 52 V71 M112 52 V71" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        <rect x="56" y="58" width="62" height="15" rx="3" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.2" />
        <path d="M62 64 H108 M62 69 H98" stroke="#CBD5E1" strokeWidth="1.6" />
        {/* 支腿 + 踏板 */}
        <path d="M30 118 L18 148 M140 118 L154 148 M86 118 V146" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="86" cy="149" rx="15" ry="5" fill="#94A3B8" />
      </g>
      <Notes x={126} y={20} color={accent} />
      <Star x={24} y={24} r={0.55} color="#C4B5FD" />
      <Star x={188} y={108} r={0.45} color="#FCD34D" />
    </g>
  );
}

function ArtTravel({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Defs />
      {/* 拎着行李箱的小程：手向前伸，握着拉杆 */}
      <g transform="translate(2 24) scale(0.84)">
        <circle cx="36" cy="2" r="22" fill={HAIR_HI} opacity="0.09" />
        <Girl x={0} y={0} />
        <path d="M52 84 L84 88" stroke={SKIN} strokeWidth="8" strokeLinecap="round" />
        <circle cx="86" cy="88" r="5.4" fill={SKIN} stroke={LINE} strokeWidth="1.4" />
      </g>
      {/* 行李箱（手正好在拉杆上） */}
      <g transform="translate(70 96)">
        <path d="M16 18 V8 H40 V18" fill="none" stroke={LINE} strokeWidth="3" strokeLinecap="round" />
        <rect x="0" y="18" width="56" height="42" rx="8" fill="#F59E0B" stroke={LINE} strokeWidth="1.8" />
        <path d="M19 20 V58 M37 20 V58" stroke="#D97706" strokeWidth="3" />
        <rect x="40" y="30" width="16" height="13" rx="4" fill="#FEF3C7" stroke={LINE} strokeWidth="1.4" />
        <circle cx="8" cy="62" r="3.4" fill="#78350F" />
        <circle cx="48" cy="62" r="3.4" fill="#78350F" />
      </g>
      {/* 地球 */}
      <g transform="translate(128 26)">
        <circle cx="34" cy="34" r="31" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
        <path d="M11 26 C20 19 29 30 39 23 C48 18 55 26 59 23" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M7 40 C18 35 26 46 38 39 C48 34 57 41 61 38" stroke="#7DD3FC" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M14 52 C25 49 35 57 49 50" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="34" cy="34" rx="31" ry="10" fill="none" stroke="#38BDF8" strokeWidth="1.6" opacity="0.6" />
        <path d="M34 3 V65" stroke="#38BDF8" strokeWidth="1.6" opacity="0.5" />
      </g>
      {/* 飞机绕飞 */}
      <g transform="translate(150 2) rotate(16)">
        <path d="M0 8 L32 0 L38 6 L12 14 Z" fill="#F8FAFC" stroke={LINE} strokeWidth="1.6" />
        <path d="M13 12 L21 23 L27 21 L23 12 Z" fill="#E2E8F0" stroke={LINE} strokeWidth="1.4" />
        <path d="M6 9 L-4 15 L0 4 Z" fill="#E2E8F0" stroke={LINE} strokeWidth="1.4" />
      </g>
      <path d="M10 122 C40 130 70 130 100 122" stroke="#BAE6FD" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Star x={116} y={128} r={0.45} color="#7DD3FC" />
    </g>
  );
}

function ArtSing({ accent }: { accent: string }) {
  return (
    <g>
      <Girl x={24} y={26} scale={0.94} />
      <Notes x={128} y={54} color={accent} />
      <Notes x={20} y={30} color="#F9A8D4" />
      {/* 话筒 */}
      <g transform="translate(126 78)">
        <rect x="8" y="0" width="26" height="42" rx="13" fill="#4B5563" stroke={LINE} strokeWidth="1.8" />
        <g stroke="#9CA3AF" strokeWidth="1.3">
          <path d="M13 9 H29 M13 18 H29 M13 27 H29 M13 36 H29" />
        </g>
        <rect x="17" y="42" width="8" height="26" rx="4" fill="#374151" />
        <ellipse cx="21" cy="72" rx="18" ry="6" fill="#1F2937" />
      </g>
      <path d="M158 40 C166 52 166 74 158 86" stroke={accent} strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.75" />
      {/* 合唱团的小音符排队 */}
      <g opacity="0.9">
        <circle cx="176" cy="112" r="7" fill="#FBCFE8" />
        <circle cx="160" cy="118" r="5" fill="#C4B5FD" />
        <circle cx="188" cy="120" r="4" fill="#FDE68A" />
      </g>
      <Star x={94} y={22} r={0.5} color="#F9A8D4" />
    </g>
  );
}

function ArtArt({ accent: _accent }: { accent: string }) {
  return (
    <g>
      <Girl x={8} y={28} scale={0.84} />
      {/* 画架 */}
      <g transform="translate(88 6)">
        <path d="M40 0 V96" stroke="#B45309" strokeWidth="5" />
        <path d="M6 6 H74 V76 H6 Z" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        {/* 画里的科幻风景 */}
        <rect x="10" y="10" width="60" height="68" rx="3" fill="#EEF2FF" />
        <circle cx="40" cy="34" r="12" fill="#F472B6" opacity="0.85" />
        <path d="M10 56 C22 44 32 66 44 54 C54 44 62 62 70 54 V74 H10 Z" fill="#8E5BEF" opacity="0.8" />
        <circle cx="24" cy="20" r="1.6" fill="#FBBF24" />
        <circle cx="58" cy="18" r="1.2" fill="#FBBF24" />
        {/* 架子 */}
        <path d="M10 76 L-4 126" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
        <path d="M70 76 L90 124" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* 调色盘 + 笔 */}
      <g transform="translate(140 62)">
        <ellipse cx="24" cy="24" rx="24" ry="18" fill="#FDE68A" stroke={LINE} strokeWidth="1.8" />
        <circle cx="12" cy="16" r="4" fill="#EF4444" />
        <circle cx="26" cy="12" r="4" fill="#3B82F6" />
        <circle cx="40" cy="18" r="4" fill="#22C55E" />
        <circle cx="16" cy="30" r="4" fill="#8E5BEF" />
        <circle cx="34" cy="30" r="4" fill="#F59E0B" />
        <path d="M40 40 L58 58" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      </g>
      <Star x={80} y={18} r={0.5} color="#FBBF24" />
    </g>
  );
}

/** 古筝：只画琴，琴身放大占满卡面 */
function ArtGuzheng({ accent }: { accent: string }) {
  return (
    <g>
      <Defs />
      <g transform="translate(2 34) rotate(-7) scale(0.94)">
        {/* 琴身：一头宽一头窄的筝体 */}
        <path
          d="M14 16 C60 0 156 0 202 16 L202 50 C156 66 60 66 14 50 Z"
          fill="#B45309"
          stroke="#7C2D12"
          strokeWidth="2.2"
        />
        {/* 面板高光 */}
        <path d="M18 21 C62 7 156 7 198 21" stroke="#FBBF24" strokeWidth="3" fill="none" />
        {/* 琴弦（后密前疏，筝的特点） */}
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M16 ${26 + i * 3.4} C62 ${14 + i * 3.4} 158 ${14 + i * 3.4} 200 ${26 + i * 3.4}`}
            stroke="#FDE68A"
            strokeWidth="1.4"
            fill="none"
          />
        ))}
        {/* 雁柱 */}
        {[46, 82, 118, 154, 186].map((x) => (
          <path key={x} d={`M${x} 12 V54`} stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" />
        ))}
        {/* 前后岳山 */}
        <path d="M14 16 V50 M202 16 V50" stroke="#7C2D12" strokeWidth="5" strokeLinecap="round" />
        {/* 支腿 */}
        <path d="M34 52 L24 82 M182 52 L194 82" stroke="#7C2D12" strokeWidth="7" strokeLinecap="round" />
      </g>
      <Notes x={40} y={26} color={accent} />
      <Star x={176} y={124} r={0.5} color="#FCD34D" />
      <Star x={30} y={128} r={0.4} color="#FDBA74" />
    </g>
  );
}

/** 葫芦丝：只画乐器，整体放大 */
function ArtHulusi({ accent }: { accent: string }) {
  return (
    <g>
      <g transform="translate(62 6) scale(1.55)">
        {/* 副管 */}
        <rect x="-11" y="42" width="9" height="58" rx="4.5" fill="#E7C08A" stroke="#B45309" strokeWidth="1.5" />
        <rect x="46" y="42" width="9" height="58" rx="4.5" fill="#E7C08A" stroke="#B45309" strokeWidth="1.5" />
        {/* 主管 + 音孔 */}
        <rect x="16" y="40" width="13" height="70" rx="5" fill="#EFD3A8" stroke="#B45309" strokeWidth="1.7" />
        {[48, 58, 68, 78, 88, 98, 106].map((y) => (
          <circle key={y} cx="22.5" cy={y} r="2.8" fill="#92400E" />
        ))}
        {/* 葫芦 */}
        <path
          d="M22 2 C7 2 2 15 13 23 C2 31 -3 44 8 52 C16 58 30 58 37 52 C48 44 43 31 32 23 C43 15 38 2 22 2 Z"
          fill="#F5D0A9"
          stroke="#B45309"
          strokeWidth="1.9"
        />
        {/* 葫芦束腰 + 装饰 */}
        <path d="M15 22 C18 26 27 26 30 22" stroke="#E7C08A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M16 44 C20 48 28 48 32 44" stroke="#E7C08A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* 吹嘴 */}
        <rect x="19" y="-9" width="7" height="11" rx="3.5" fill="#C08457" stroke="#B45309" strokeWidth="1.2" />
        {/* 挂穗 */}
        <path d="M22 58 V74" stroke="#B45309" strokeWidth="1.6" />
        <path d="M18 74 H26 L22 84 Z" fill={accent} opacity="0.85" />
      </g>
      {/* 吹出来的气团 */}
      <g stroke={accent} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M32 40 C22 50 22 66 32 76" />
        <path d="M18 30 C4 46 4 72 18 88" />
      </g>
      <Star x={150} y={40} r={0.5} color="#FDBA74" />
      <Star x={172} y={100} r={0.4} color="#FCD34D" />
    </g>
  );
}

/** 吉他：只画吉他，斜着占满卡面 */
function ArtGuitar({ accent }: { accent: string }) {
  return (
    <g>
      <Defs />
      <g transform="translate(46 2) rotate(20) scale(1.16)" filter="url(#xcSoft)">
        {/* 琴头 */}
        <rect x="22" y="-12" width="24" height="16" rx="5" fill="#7C2D12" stroke="#4B2E12" strokeWidth="1.5" />
        <circle cx="28" cy="-4" r="2.2" fill="#FDE68A" />
        <circle cx="40" cy="-4" r="2.2" fill="#FDE68A" />
        {/* 琴颈 + 品丝 */}
        <rect x="27" y="2" width="14" height="46" fill="#B45309" stroke="#7C2D12" strokeWidth="1.5" />
        {[10, 18, 26, 34, 42].map((y) => (
          <path key={y} d={`M27 ${y} H41`} stroke="#FDE68A" strokeWidth="1.2" opacity="0.8" />
        ))}
        {/* 琴弦 */}
        <path d="M30 4 V50 M34 4 V50 M38 4 V50" stroke="#FEF3C7" strokeWidth="1" />
        {/* 琴身 */}
        <path
          d="M34 48 C50 44 58 56 66 64 C86 60 104 76 104 96 C104 122 84 138 62 136 C38 134 18 120 18 98 C18 82 24 64 34 48 Z"
          fill="#D97706"
          stroke="#7C2D12"
          strokeWidth="2.2"
        />
        {/* 音孔 + 花环 */}
        <circle cx="60" cy="98" r="17" fill="#7C2D12" />
        <circle cx="60" cy="98" r="11.5" fill="#1F2937" />
        <circle cx="60" cy="98" r="21" fill="none" stroke="#FDE68A" strokeWidth="1.6" opacity="0.85" />
        {/* 琴马 */}
        <rect x="46" y="122" width="30" height="5" rx="2.5" fill="#4B2E12" />
        <rect x="54" y="52" width="12" height="4" rx="2" fill="#4B2E12" />
      </g>
      <Notes x={150} y={28} color={accent} />
      <Star x={30} y={124} r={0.5} color="#FDBA74" />
      <Star x={176} y={110} r={0.4} color="#FCD34D" />
    </g>
  );
}

function ArtWriting({ accent }: { accent: string }) {
  return (
    <g>
      <Girl x={6} y={26} scale={0.84} />
      {/* 稿纸 */}
      <g transform="translate(86 12)">
        <rect x="8" y="8" width="86" height="104" rx="8" fill="#F1F5F9" stroke={LINE} strokeWidth="1.8" />
        <rect x="0" y="0" width="86" height="104" rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="1.8" />
        {[18, 32, 46, 60, 74, 88].map((y, i) => (
          <rect key={y} x="12" y={y} width={i === 5 ? 40 : 62} height="5" rx="2.5" fill={i === 0 ? accent : "#E2E8F0"} />
        ))}
        {/* 笔 */}
        <g transform="rotate(38 74 84)">
          <rect x="62" y="70" width="30" height="8" rx="4" fill="#3B82F6" />
          <path d="M92 70 L102 74 L92 78 Z" fill={LINE} />
        </g>
      </g>
      {/* 墨水瓶 */}
      <g transform="translate(160 96)">
        <path d="M0 10 H34 V34 C34 40 28 44 17 44 C6 44 0 40 0 34 Z" fill="#1E293B" />
        <rect x="10" y="0" width="14" height="12" rx="3" fill="#334155" />
      </g>
      <Star x={80} y={18} r={0.5} color="#93C5FD" />
    </g>
  );
}

// ---------------------------------------------------------------------------
const ART: Record<string, (p: { accent: string }) => ReactNode> = {
  python: ArtPython,
  c: ArtC,
  r: ArtR,
  wps: ArtWps,
  drawio: ArtDrawio,
  plan: ArtPlan,
  team: ArtTeam,
  speak: ArtSpeak,
  modeling: ArtModeling,
  data: ArtData,
  market: ArtMarket,
  track: ArtTrack,
  cet4: ArtCet4,
  piano: ArtPiano,
  travel: ArtTravel,
  sing: ArtSing,
  art: ArtArt,
  guzheng: ArtGuzheng,
  hulusi: ArtHulusi,
  guitar: ArtGuitar,
  writing: ArtWriting,
};

/** 根据卡片 id 渲染对应插画 */
export function CardArt({ art, accent, className = "" }: { art: string; accent: string; className?: string }) {
  const Draw = ART[art];
  return (
    <svg viewBox="0 0 200 150" className={className} role="img" aria-hidden>
      {Draw ? <Draw accent={accent} /> : <Girl x={64} y={30} scale={1} />}
    </svg>
  );
}
