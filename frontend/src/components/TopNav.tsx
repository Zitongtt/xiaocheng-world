import { Github, Mail, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { WHEEL, MULTICOLOR, PROFILE, type SectionKey } from "@/data/content";
import { CatLogo } from "./SiteIcons";

interface TopNavProps {
  onSelect: (key: SectionKey) => void;
}

export function TopNav({ onSelect }: TopNavProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[68px] border-b border-[#e9edf3]/90 bg-white/80 px-5 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex h-full max-w-[1480px] items-center justify-between gap-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex shrink-0 items-center gap-3"
          aria-label="回到主页顶部"
        >
          <CatLogo size={31} color="#1f2a42" />
          <span className="handwritten text-[21px] italic tracking-wide text-[#26334d]">
            {PROFILE.enName}
            <span className="ml-2 text-[#7799d4]">·</span>
          </span>
        </button>

        <nav className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center gap-0 xl:flex">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="nav-link nav-link--active">
            Home
          </button>
          {WHEEL.map((seg) => (
            <button key={seg.key} onClick={() => onSelect(seg.key)} className="nav-link">
              {seg.label}
            </button>
          ))}
          <button onClick={() => onSelect(MULTICOLOR.key)} className="nav-link">
            {MULTICOLOR.label}
          </button>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => setDark((value) => !value)} className="nav-icon" aria-label={dark ? "切换到浅色" : "切换到深色"}>
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <a href="https://github.com/Zitongtt" target="_blank" rel="noreferrer" className="nav-icon hidden sm:inline-flex" aria-label="GitHub">
            <Github size={19} />
          </a>
          <a href={`mailto:${PROFILE.email}`} className="nav-icon hidden sm:inline-flex" aria-label="发邮件">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </header>
  );
}
