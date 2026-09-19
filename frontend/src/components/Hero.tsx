import { motion } from "framer-motion";
import { Download, Mail, Heart } from "lucide-react";
import { asset, PROFILE, type SectionKey } from "@/data/content";
import { HeroScenery } from "./SiteIcons";
import { ColorWheel } from "./ColorWheel";

interface HeroProps {
  onContact: () => void;
  onSelect: (key: SectionKey) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  }),
};

const STATIC =
  typeof window !== "undefined" &&
  (new URLSearchParams(window.location.search).get("static") === "1" ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true);

const enter = (delay: number) =>
  STATIC
    ? { initial: false as const, animate: "show" as const }
    : { initial: "hidden" as const, animate: "show" as const, custom: delay };

export function Hero({ onContact, onSelect }: HeroProps) {
  return (
    <section className="home-hero relative isolate min-h-[100svh] overflow-hidden px-5 pt-24 sm:px-8 lg:pt-[84px]">
      <div aria-hidden className="home-glow home-glow--blue" />
      <div aria-hidden className="home-glow home-glow--peach" />

      <div className="home-stage relative mx-auto h-[calc(100svh-84px)] min-h-[700px] w-full max-w-[1440px]">
        <motion.div
          variants={fadeUp}
          {...enter(0)}
          className="home-intro relative z-20 mx-auto text-center lg:absolute lg:left-[7.5%] lg:top-[7%] lg:mx-0 lg:w-[530px] lg:text-left"
        >
          <p className="handwritten text-[25px] italic text-[#6f94d6]">Hi, I’m</p>
          <h1 className="mt-2 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1 lg:justify-start">
            <span className="text-[3.35rem] font-black leading-none tracking-[0.08em] text-[#17233e] sm:text-[3.8rem]">
              {PROFILE.name}
            </span>
            <span className="handwritten text-[1.75rem] italic text-[#7899d7] sm:text-[2rem]">
              {PROFILE.enName}
            </span>
          </h1>
          <p className="mt-5 text-[16px] leading-8 tracking-[0.03em] text-[#42506a]">
            一只喜欢探索世界，也喜欢折腾想法的小小猪
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="hero-action hero-action--primary">
              <Download size={15} />查看 / 下载简历
            </a>
            <button onClick={onContact} className="hero-action">
              <Mail size={15} />联系我
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          {...enter(0.15)}
          className="home-photo relative z-10 mx-auto mt-10 w-[min(78vw,360px)] lg:absolute lg:right-[5.5%] lg:top-[2.5%] lg:mt-0 lg:w-[330px] xl:right-[7%] xl:w-[355px]"
        >
          <div className="photo-card rotate-[-6deg] rounded-[9px] bg-white p-3 pb-5 shadow-[0_20px_55px_rgba(73,94,129,0.18)]">
            <img
              src={asset("/images/hero-photo.jpg")}
              alt={`${PROFILE.name}的照片`}
              className="h-[250px] w-full rounded-[4px] object-cover object-[50%_58%] sm:h-[276px]"
              draggable={false}
            />
          </div>
          <Heart aria-hidden className="absolute -right-10 top-12 rotate-12 text-[#8aa9df]" size={25} strokeWidth={1.6} />
          <p className="handwritten absolute -right-20 top-[92px] rotate-[8deg] text-[16px] italic leading-6 text-[#6f8fc8]">
            Little Pig<br />Big Dream
          </p>
          <div className="absolute -left-12 top-11 h-px w-7 rotate-[28deg] bg-[#94b3e3]" />
          <div className="absolute -left-10 top-16 h-px w-5 rotate-[12deg] bg-[#94b3e3]" />
        </motion.div>

        <motion.div
          id="wheel"
          variants={fadeUp}
          {...enter(0.22)}
          className="home-wheel relative z-20 mx-auto mt-12 w-[min(94vw,560px)] scroll-mt-24 lg:absolute lg:bottom-[6.5%] lg:left-1/2 lg:mt-0 lg:w-[510px] lg:-translate-x-1/2 xl:w-[550px]"
        >
          <ColorWheel onSelect={onSelect} />
        </motion.div>
      </div>

      <HeroScenery />
    </section>
  );
}
