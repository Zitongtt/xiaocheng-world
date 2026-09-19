import { useState } from "react";
import { ORIGIN_TIMELINE } from "@/data/content";
import {
  PhotoZoomProvider,
  ZoomLightbox,
  ZoomablePhoto,
  type ZoomTarget,
} from "./ExperienceBits";

/** 起点板块的主题色（琥珀） */
const ACCENT = "#F5C518";

/** ORIGIN_TIMELINE 里存的是拼好的完整路径，不需要再补前缀 */
const resolveSelf = (file: string) => file;

export function OriginSection() {
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);

  return (
    <PhotoZoomProvider onZoom={setZoom}>
      <ol className="relative space-y-10 border-l-2 border-amber-200 pl-6">
        {ORIGIN_TIMELINE.map((item, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 ring-4 ring-white" />
            <div className="grid gap-4 sm:grid-cols-[140px_1fr] sm:items-start">
              <div className="text-sm font-semibold text-amber-700">
                {item.period}
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="w-full shrink-0 sm:w-40">
                    <ZoomablePhoto
                      photo={{ file: item.img, caption: item.caption }}
                      resolve={resolveSelf}
                      accent={ACCENT}
                      tint="#f0c987"
                      boxClass="h-28"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {item.school}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-amber-600">
                      {item.role}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{item.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <ZoomLightbox target={zoom} onClose={() => setZoom(null)} />
    </PhotoZoomProvider>
  );
}
