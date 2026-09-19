import { THINKING_NOTES } from "@/data/content";

export function ThinkingSection() {
  return (
    <div className="space-y-4">
      {THINKING_NOTES.map((note, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white/70 p-5 text-[15px] leading-7 text-gray-700 shadow-sm ring-1 ring-black/5"
        >
          <span className="mr-2 font-serif text-2xl text-gray-300">“</span>
          {note}
        </div>
      ))}
      <p className="pt-2 text-center text-xs text-gray-400">
        这些念头还在生长，也许下次来，会不一样。
      </p>
    </div>
  );
}
