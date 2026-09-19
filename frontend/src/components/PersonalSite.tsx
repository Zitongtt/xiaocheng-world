import { useState } from "react";
import { Hero } from "./Hero";
import { ColorWheel } from "./ColorWheel";
import { SectionPanel } from "./SectionPanel";
import { ContactModal } from "./ContactModal";
import type { SectionKey } from "@/data/content";

export function PersonalSite() {
  const [active, setActive] = useState<SectionKey | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fafaf7] text-gray-900">
      <Hero onContact={() => setContactOpen(true)} />

      {/* 色环导航 */}
      <section className="mx-auto max-w-3xl px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">小程的世界</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
          用色环打开不同的自己 —— 每一种颜色，都是一段正在生长的故事。
        </p>
        <div className="mt-6">
          <ColorWheel onSelect={setActive} />
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        This is my world · Still under construction · 小程
      </footer>

      <SectionPanel
        active={active}
        onClose={() => setActive(null)}
        onContact={() => {
          setActive(null);
          setContactOpen(true);
        }}
      />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
