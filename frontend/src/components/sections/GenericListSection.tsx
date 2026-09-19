import type { ListItem } from "@/data/content";

interface GenericListSectionProps {
  items: ListItem[];
  accent: string; // 主题色
}

/** 通用列表板块：用于 Drive / Experience / Projects */
export function GenericListSection({ items, accent }: GenericListSectionProps) {
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
          style={{ borderLeft: `4px solid ${accent}` }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-base font-semibold text-gray-900">{it.title}</h4>
            {it.meta && (
              <span
                className="rounded-full px-3 py-0.5 text-xs font-medium"
                style={{ background: `${accent}1a`, color: accent }}
              >
                {it.meta}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-6 text-gray-600">{it.desc}</p>
        </div>
      ))}
      <p className="pt-2 text-center text-xs text-gray-400">
        带「请补充」的内容，替换成你简历里的真实经历即可。
      </p>
    </div>
  );
}
