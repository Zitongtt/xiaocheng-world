import { useMemo, useState } from "react";
import {
  DRIVE_ITEMS,
  DRIVE_KIND_COLOR,
  EXP_LEVEL_STYLE,
  LEVEL_ORDER,
  drivePhotoUrl,
  type ExpLevel,
} from "@/data/content";
import {
  KindBadge,
  LevelBadge,
  LevelFilter,
  PhotoZoomProvider,
  ZoomLightbox,
  ZoomablePhotoStack,
  type ZoomTarget,
} from "./ExperienceBits";

const ACCENT = "#E5484D";

/** 一张卡：左边一张照片，右边一小段描述 */
function DriveCard({ item }: { item: (typeof DRIVE_ITEMS)[number] }) {
  const lv = EXP_LEVEL_STYLE[item.level];
  const photos = item.photos ?? [];

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className={`grid gap-0 ${photos.length > 0 ? "sm:grid-cols-[minmax(0,15rem)_1fr]" : ""}`}>
        {photos.length > 0 && (
          <div className="p-3 sm:pr-0">
            <ZoomablePhotoStack
              photos={photos}
              resolve={drivePhotoUrl}
              accent={ACCENT}
              tint={lv.color}
              boxClass="h-44 sm:h-full sm:min-h-[11rem]"
            />
          </div>
        )}

        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <LevelBadge level={item.level} />
            <KindBadge kind={item.kind} color={DRIVE_KIND_COLOR[item.kind]} />
            {item.date && (
              <span className="text-[11px] tabular-nums text-gray-400">{item.date}</span>
            )}
          </div>

          <h4 className="mt-2 text-[15px] font-semibold leading-6 text-gray-900">{item.title}</h4>

          {item.note && (
            <p className="mt-2 text-[13px] leading-6 text-gray-500">{item.note}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function DriveSection() {
  const [filter, setFilter] = useState<ExpLevel | "全部">("全部");
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const it of DRIVE_ITEMS) c[it.level] = (c[it.level] ?? 0) + 1;
    return c;
  }, []);

  /** 先按级别从高到低归堆，堆内按时间倒序 */
  const blocks = useMemo(
    () =>
      LEVEL_ORDER.map((level) => ({
        level,
        items: DRIVE_ITEMS.filter(
          (item) => item.level === level && (filter === "全部" || filter === level),
        ).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
      })).filter((b) => b.items.length > 0),
    [filter],
  );

  return (
    <PhotoZoomProvider onZoom={setZoom}>
      <div>
        <LevelFilter
          value={filter}
          onChange={setFilter}
          counts={counts}
          total={DRIVE_ITEMS.length}
        />

        <p className="mt-3 text-xs text-gray-400">
          共 {DRIVE_ITEMS.length} 次行动 · 按级别排列（国家级在最前）· 有照片的可以点开看
        </p>

        <div className="mt-5 space-y-8">
          {blocks.map(({ level, items }) => {
            const lv = EXP_LEVEL_STYLE[level];
            return (
              <section key={level}>
                <div className="mb-3 flex items-center gap-3">
                  <h3
                    className="shrink-0 text-sm font-bold tracking-wide"
                    style={{ color: lv.color }}
                  >
                    {level}
                    <span className="ml-1.5 text-xs font-normal text-gray-400">
                      {items.length} 次
                    </span>
                  </h3>
                  <span className="h-px flex-1" style={{ background: `${lv.color}2b` }} />
                </div>

                <div className="grid gap-4">
                  {items.map((item) => (
                    <DriveCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}

          {blocks.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-400">这个级别暂时还没有记录。</p>
          )}
        </div>
      </div>

      <ZoomLightbox target={zoom} onClose={() => setZoom(null)} />
    </PhotoZoomProvider>
  );
}
