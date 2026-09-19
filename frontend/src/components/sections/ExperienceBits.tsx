import {
  createContext,
  useContext,
  useEffect,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { FileText, ImageIcon, ExternalLink, X } from "lucide-react";
import { SmartImage } from "../SmartImage";
import {
  EXP_LEVEL_STYLE,
  LEVEL_ORDER,
  expDocUrl,
  type ExpDoc,
  type ExpLevel,
  type ExpMedia,
} from "@/data/content";

/** 灯箱要展示的内容 */
export interface ZoomTarget {
  src: string;
  caption: string;
}

// ---------------------------------------------------------------------------
// 照片放大：用 context 把「打开灯箱」这件事往下传，避免一层层传 props
// ---------------------------------------------------------------------------
const ZoomContext = createContext<(t: ZoomTarget) => void>(() => {});

export function PhotoZoomProvider({
  onZoom,
  children,
}: {
  onZoom: (t: ZoomTarget) => void;
  children: ReactNode;
}) {
  return <ZoomContext.Provider value={onZoom}>{children}</ZoomContext.Provider>;
}

// ---------------------------------------------------------------------------
// 级别徽章 / 类别徽章
// ---------------------------------------------------------------------------
export function LevelBadge({ level }: { level: ExpLevel }) {
  const lv = EXP_LEVEL_STYLE[level];
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide"
      style={{ background: lv.bg, color: lv.color }}
    >
      {level}
    </span>
  );
}

export function KindBadge({ kind, color }: { kind: string; color: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
      style={{ background: `${color}1a`, color }}
    >
      {kind}
    </span>
  );
}

// ---------------------------------------------------------------------------
// 级别筛选条
// ---------------------------------------------------------------------------
export function LevelFilter({
  value,
  onChange,
  counts,
  total,
}: {
  value: ExpLevel | "全部";
  onChange: (v: ExpLevel | "全部") => void;
  counts: Record<string, number>;
  total: number;
}) {
  const opts: (ExpLevel | "全部")[] = ["全部", ...LEVEL_ORDER];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {opts.map((lv) => {
        const on = value === lv;
        const style = lv === "全部" ? { color: "#B02A5B", bg: "#FDE9F1" } : EXP_LEVEL_STYLE[lv];
        const n = lv === "全部" ? total : counts[lv] ?? 0;
        return (
          <button
            key={lv}
            type="button"
            onClick={() => onChange(lv)}
            className="rounded-full border px-3 py-1 text-xs font-medium transition"
            style={{
              borderColor: on ? style.color : "rgba(0,0,0,0.08)",
              background: on ? style.bg : "white",
              color: on ? style.color : "#6B7280",
            }}
          >
            {lv}
            <span className="ml-1.5 tabular-nums opacity-60">{n}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 照片缩略图（点击放大）
// ---------------------------------------------------------------------------
export function ZoomablePhoto({
  photo,
  resolve,
  accent,
  tint,
  boxClass,
  badge,
}: {
  photo: ExpMedia;
  resolve: (file: string) => string;
  accent: string;
  tint: string;
  /** 控制图片高度，例如 "h-44 sm:h-52" */
  boxClass: string;
  /** 多图时右下角的 “+N” 角标 */
  badge?: ReactNode;
}) {
  const openZoom = useContext(ZoomContext);
  const src = resolve(photo.file);

  return (
    <button
      type="button"
      title={photo.caption}
      onClick={() => openZoom({ src, caption: photo.caption })}
      className="group/img relative w-full overflow-hidden rounded-xl ring-1 ring-black/5 transition hover:ring-2 hover:ring-offset-1"
      style={{ "--tw-ring-color": accent } as CSSProperties}
    >
      <SmartImage
        src={src}
        alt={photo.caption}
        tint={tint}
        className={`w-full cursor-zoom-in object-cover transition duration-300 group-hover/img:scale-[1.04] ${boxClass}`}
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-gradient-to-t from-black/55 to-transparent pb-1.5 pt-6 text-[10px] font-medium text-white opacity-0 transition group-hover/img:opacity-100">
        <ImageIcon size={11} /> 点击查看
      </span>
      {badge}
    </button>
  );
}

/** 多张照片：第一张为主图，其余用 “+N” 提示 */
export function ZoomablePhotoStack({
  photos,
  resolve,
  accent,
  tint,
  boxClass,
}: {
  photos: ExpMedia[];
  resolve: (file: string) => string;
  accent: string;
  tint: string;
  boxClass: string;
}) {
  const [first, ...rest] = photos;
  return (
    <ZoomablePhoto
      photo={first}
      resolve={resolve}
      accent={accent}
      tint={tint}
      boxClass={boxClass}
      badge={
        rest.length > 0 ? (
          <span className="absolute bottom-1.5 right-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">
            共 {photos.length} 张
          </span>
        ) : undefined
      }
    />
  );
}

// ---------------------------------------------------------------------------
// 文档链接：点击跳转
// ---------------------------------------------------------------------------
export function DocLinks({ docs, accent }: { docs: ExpDoc[]; accent: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {docs.map((d) => (
        <a
          key={d.file + d.label}
          href={expDocUrl(d.file)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed px-3 py-1.5 text-xs font-medium transition hover:bg-black/[0.03]"
          style={{ borderColor: `${accent}66`, color: accent }}
        >
          <FileText size={13} />
          {d.label}
          <ExternalLink size={12} className="opacity-60" />
        </a>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 全屏灯箱：挂在 body 上，避免被 SectionPanel 的 scale 变换困在面板里
// ---------------------------------------------------------------------------
export function ZoomLightbox({
  target,
  onClose,
}: {
  target: ZoomTarget | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [target, onClose]);

  if (!target) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
        aria-label="关闭"
      >
        <X size={20} />
      </button>
      <SmartImage
        src={target.src}
        alt={target.caption}
        className="max-h-[78vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
      />
      <p className="mt-4 max-w-xl text-center text-sm leading-6 text-white/85">{target.caption}</p>
    </div>,
    document.body,
  );
}
