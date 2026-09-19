import { useEffect, useState } from "react";
import { Hero } from "./Hero";
import { TopNav } from "./TopNav";
import { SectionPanel } from "./SectionPanel";
import { ContactModal } from "./ContactModal";
import { WHEEL, MULTICOLOR, type SectionKey } from "@/data/content";

const ALL_KEYS: SectionKey[] = [...WHEEL.map((w) => w.key), MULTICOLOR.key];

/** 把「#/experience」这样的地址解析成板块 key，方便直接分享某一板块的链接 */
function readSectionFromHash(): SectionKey | null {
  const raw = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  if (!raw) return null;
  return ALL_KEYS.find((k) => k === raw) ?? null;
}

export function PersonalSite() {
  const [active, setActive] = useState<SectionKey | null>(() =>
    typeof window === "undefined" ? null : readSectionFromHash(),
  );
  const [contactOpen, setContactOpen] = useState(false);

  // 打开/关闭板块时同步地址栏，例如 #/experience
  useEffect(() => {
    const want = active ? `#/${active}` : "";
    if (window.location.hash === want) return;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${want}`,
    );
  }, [active]);

  // 支持浏览器前进/后退与外部直接粘贴带 #/ 的链接
  useEffect(() => {
    const onHash = () => setActive(readSectionFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <main className="site-canvas relative isolate min-h-screen overflow-x-hidden text-gray-900">
      <TopNav onSelect={setActive} />

      <Hero onContact={() => setContactOpen(true)} onSelect={setActive} />

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
