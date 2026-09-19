import { ORIGIN_TIMELINE } from "@/data/content";
import { SmartImage } from "../SmartImage";

export function OriginSection() {
  return (
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
                <SmartImage
                  src={item.img}
                  alt={item.caption}
                  tint="#f0c987"
                  className="h-28 w-full rounded-xl object-cover sm:w-40"
                />
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
  );
}
