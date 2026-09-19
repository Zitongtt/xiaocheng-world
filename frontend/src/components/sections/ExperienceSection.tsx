import { useMemo, useState } from "react";
import {
  EXPERIENCE_TIMELINE,
  EXP_KIND_COLOR,
  EXP_LEVEL_STYLE,
  expPhotoUrl,
  type ExpLevel,
} from "@/data/content";
import {
  DocLinks,
  KindBadge,
  LevelBadge,
  LevelFilter,
  PhotoZoomProvider,
  ZoomLightbox,
  ZoomablePhoto,
  type ZoomTarget,
} from "./ExperienceBits";

const ACCENT = "#EC5C8D";

/** 一条经历：级别 + 类别 + 时间，下面挂照片与文档 */
function ExpCard({ item }: { item: (typeof EXPERIENCE_TIMELINE)[number] }) {
  const lv = EXP_LEVEL_STYLE[item.level];
  const photos = item.photos ?? (item.photo ? [item.photo] : []);
  const docs = item.docs ?? (item.doc ? [item.doc] : []);

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <LevelBadge level={item.level} />
        <KindBadge kind={item.kind} color={EXP_KIND_COLOR[item.kind]} />
        <span className="text-[11px] tabular-nums text-gray-400">{item.date}</span>
      </div>

      <h4 className="mt-2 text-[15px] font-semibold leading-6 text-gray-900">{item.title}</h4>

      {item.note && <p className="mt-1.5 text-[13px] leading-6 text-gray-500">{item.note}</p>}

      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photos.map((m) => (
            <ZoomablePhoto
              key={m.file + m.caption}
              photo={m}
              resolve={expPhotoUrl}
              accent={ACCENT}
              tint={lv.color}
              boxClass="h-24 sm:h-28"
            />
          ))}
        </div>
      )}

      {docs.length > 0 && (
        <div className="mt-3">
          <DocLinks docs={docs} accent={ACCENT} />
        </div>
      )}
    </article>
  );
}

export function ExperienceSection() {
  const [filter, setFilter] = useState<ExpLevel | "全部">("全部");
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const it of EXPERIENCE_TIMELINE) c[it.level] = (c[it.level] ?? 0) + 1;
    return c;
  }, []);

  /**
   * 按时间轴排列：最新在最上面。
   * 「同一个月」的经历会自动归成一组（组标题就是那个时间点），
   * 卡片上仍然标着级别和类别，所以级别信息不会丢。
   */
  const blocks = useMemo(() => {
    const items = EXPERIENCE_TIMELINE.filter(
      (item) => filter === "全部" || item.level === filter,
    ).sort((a, b) => b.date.localeCompare(a.date));

    const map = new Map<string, typeof items>();
    for (const item of items) {
      const list = map.get(item.date) ?? [];
      list.push(item);
      map.set(item.date, list);
    }
    return Array.from(map, ([date, list]) => ({ date, list }));
  }, [filter]);

  return (
    <PhotoZoomProvider onZoom={setZoom}>
      <div>
        <LevelFilter
          value={filter}
          onChange={setFilter}
          counts={counts}
          total={EXPERIENCE_TIMELINE.length}
        />

        <p className="mt-3 text-xs text-gray-400">
          共 {EXPERIENCE_TIMELINE.length} 段经历 · 按时间排列（最新在上面）
          · 每张卡上标了级别和类别 · 有照片的点开可放大，有文档的点开可跳转
        </p>

        {/* 时间轴：一条竖线 + 每个时间点一个圆点，和 Origin 起点板块同一套写法 */}
        <ol
          className="relative mt-6 space-y-8 border-l-2 pl-6"
          style={{ borderColor: `${ACCENT}33` }}
        >
          {blocks.map(({ date, list }) => (
            <li key={date} className="relative">
              <span
                className="absolute -left-[31px] top-1.5 h-5 w-5 rounded-full ring-4 ring-white"
                style={{ background: ACCENT }}
              />

              <div className="grid gap-4 sm:grid-cols-[104px_1fr] sm:items-start">
                <div
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: ACCENT }}
                >
                  {date}
                  <span className="mt-0.5 block text-xs font-normal text-gray-400">
                    {list.length} 项
                  </span>
                </div>

                <div className="grid gap-4">
                  {list.map((item) => (
                    <ExpCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {blocks.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">这个级别暂时还没有记录。</p>
        )}
      </div>

      <ZoomLightbox target={zoom} onClose={() => setZoom(null)} />
    </PhotoZoomProvider>
  );
}
