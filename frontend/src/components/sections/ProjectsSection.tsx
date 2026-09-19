import { useMemo, useState } from "react";
import { CheckCircle2, ExternalLink, FileText } from "lucide-react";
import {
  PROJECT_ITEMS,
  PROJECT_KIND_COLOR,
  PROJECT_ROLE_COLOR,
  expDocUrl,
  projectPhotoUrl,
  type ProjectItem,
  type ProjectKind,
} from "@/data/content";

import {
  KindBadge,
  PhotoZoomProvider,
  ZoomLightbox,
  ZoomablePhotoStack,
  type ZoomTarget,
} from "./ExperienceBits";

/** 筛选条上的顺序 */
const KIND_ORDER: ProjectKind[] = ["科研项目", "竞赛项目"];

const ACCENT = "#8E5BEF";

/** 一个项目一张卡：左边照片，右边是「是什么 / 我做了什么 / 留下了什么」 */
function ProjectCard({ item }: { item: ProjectItem }) {
  const kindColor = PROJECT_KIND_COLOR[item.kind];
  const roleColor = PROJECT_ROLE_COLOR[item.role] ?? ACCENT;
  const photos = item.photos ?? [];
  const docs = item.docs ?? [];

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`grid gap-0 ${photos.length > 0 ? "sm:grid-cols-[minmax(0,14rem)_1fr]" : ""}`}
      >
        {photos.length > 0 && (
          <div className="p-3 sm:pr-0">
            <ZoomablePhotoStack
              photos={photos}
              resolve={projectPhotoUrl}
              accent={ACCENT}
              tint={ACCENT}
              boxClass="h-44 sm:h-full sm:min-h-[13rem]"
            />
          </div>
        )}

        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <KindBadge kind={item.kind} color={kindColor} />
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              style={{ background: `${roleColor}1a`, color: roleColor }}
            >
              {item.role}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
              {item.level}
            </span>
            <span className="text-[11px] tabular-nums text-gray-400">
              {item.period}
            </span>
          </div>

          <h4 className="mt-2 text-[15px] font-semibold leading-6 text-gray-900">
            {item.title}
          </h4>

          <p className="mt-2 text-[13px] leading-6 text-gray-600">{item.summary}</p>

          {item.duties.length > 0 && (
            <div className="mt-3 rounded-xl bg-black/[0.025] p-3">
              <p
                className="text-[11px] font-semibold tracking-wide"
                style={{ color: ACCENT }}
              >
                主要负责
              </p>
              <ul className="mt-1.5 space-y-1">
                {item.duties.map((d) => (
                  <li key={d} className="flex gap-1.5 text-[12.5px] leading-6 text-gray-600">
                    <CheckCircle2
                      size={13}
                      className="mt-[5px] shrink-0"
                      style={{ color: `${ACCENT}99` }}
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border px-2 py-0.5 text-[11px] text-gray-500"
                  style={{ borderColor: `${ACCENT}33` }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {docs.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {docs.map((d) => (
                <a
                  key={d.file + d.label}
                  href={expDocUrl(d.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed px-3 py-1.5 text-xs font-medium transition hover:bg-black/[0.03]"
                  style={{ borderColor: `${ACCENT}66`, color: ACCENT }}
                >
                  <FileText size={13} />
                  {d.label}
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectKind | "全部">("全部");
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const it of PROJECT_ITEMS) c[it.kind] = (c[it.kind] ?? 0) + 1;
    return c;
  }, []);

  const items = useMemo(
    () =>
      PROJECT_ITEMS.filter((it) => filter === "全部" || it.kind === filter).sort(
        (a, b) => b.period.localeCompare(a.period),
      ),
    [filter],
  );

  const opts: (ProjectKind | "全部")[] = ["全部", ...KIND_ORDER];

  return (
    <PhotoZoomProvider onZoom={setZoom}>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {opts.map((k) => {
            const on = filter === k;
            const color = k === "全部" ? ACCENT : PROJECT_KIND_COLOR[k];
            const n = k === "全部" ? PROJECT_ITEMS.length : counts[k] ?? 0;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                className="rounded-full border px-3 py-1 text-xs font-medium transition"
                style={{
                  borderColor: on ? color : "rgba(0,0,0,0.08)",
                  background: on ? `${color}1a` : "white",
                  color: on ? color : "#6B7280",
                }}
              >
                {k}
                <span className="ml-1.5 tabular-nums opacity-60">{n}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-gray-400">
          共 {PROJECT_ITEMS.length} 个项目 · 从想法到落地，每一步都记在这里 · 有材料的可以点开看
        </p>

        <div className="mt-5 grid gap-4">
          {items.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">这一类暂时还没有记录。</p>
        )}
      </div>

      <ZoomLightbox target={zoom} onClose={() => setZoom(null)} />
    </PhotoZoomProvider>
  );
}
