import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { asset, PROFILE } from "@/data/content";
import { SmartImage } from "./SmartImage";

interface HeroProps {
  onContact: () => void;
}

export function Hero({ onContact }: HeroProps) {
  return (
    <section className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center gap-10 px-6 pt-16 pb-10 md:flex-row md:gap-14 md:pt-24">
      {/* 左侧：姓名 / 简介 / 操作 */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-sm font-medium tracking-[0.3em] text-gray-400 uppercase">
          Hello, I'm
        </p>
        <h1 className="mt-2 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
          {PROFILE.name}
        </h1>
        <p className="mt-3 text-lg text-gray-500">{PROFILE.tagline}</p>

        <p className="mt-6 max-w-md text-[15px] leading-7 text-gray-600">
          {PROFILE.bio}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-gray-900/10 transition hover:bg-gray-800"
          >
            <Download size={16} />
            下载简历
          </a>
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            <Mail size={16} />
            联系我
          </button>
        </div>
      </motion.div>

      {/* 右侧：生活照 */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
          <SmartImage
            src={asset("/images/life.jpg")}
            alt={`${PROFILE.name}的生活照`}
            tint="#f0c987"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20" />
        </div>
      </motion.div>
    </section>
  );
}
