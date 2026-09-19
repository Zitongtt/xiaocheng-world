import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";
import {
  SKILL_DECK,
  INTEREST_DECK,
  type SkillCard,
  type SkillPool,
} from "@/data/content";
import { CardArt } from "./SkillsArt";

const POOL: Record<SkillPool, { title: string; sub: string; color: string; cards: SkillCard[] }> = {
  skill: {
    title: "抽一张技能卡",
    sub: "SKILL",
    color: "#3B82F6",
    cards: SKILL_DECK,
  },
  interest: {
    title: "抽一张兴趣卡",
    sub: "INTEREST",
    color: "#EC5C8D",
    cards: INTEREST_DECK,
  },
};

/** 调试用：地址后面加 ?draw=1 时进页面先各抽一张，并跳过翻牌动画，方便截图检查排版 */
const DEBUG_DRAW =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("draw") === "1";

/** 随机抽一张，尽量不跟上一张重复 */
function drawFrom(cards: SkillCard[], lastId?: string): SkillCard {
  if (cards.length === 1) return cards[0];
  let next = cards[Math.floor(Math.random() * cards.length)];
  while (next.id === lastId) next = cards[Math.floor(Math.random() * cards.length)];
  return next;
}

function CardFace({
  card,
  color,
  sub,
  onRedraw,
}: {
  card: SkillCard;
  color: string;
  sub: string;
  onRedraw: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5"
        style={{ background: `linear-gradient(170deg, ${color}14, #ffffff 42%, #ffffff 100%)` }}
      >
        {/* 卡面顶栏 */}
        <div className="flex items-center justify-between px-4 pt-3.5">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.16em]"
            style={{ background: `${color}1f`, color }}
          >
            {sub}
          </span>
          <Sparkles size={15} style={{ color }} className="opacity-60" />
        </div>

        {/* 插画 */}
        <div className="px-3 pt-1">
          <CardArt art={card.art} accent={card.accent} className="h-auto w-full" />
        </div>

        {/* 文字 */}
        <div className="px-4 pb-5 pt-1 text-center">
          <span className="mx-auto mb-2.5 block h-px w-10" style={{ background: `${color}59` }} />
          <h4 className="text-lg font-bold" style={{ color }}>
            {card.name}
          </h4>
          <p className="mt-2 text-[13px] leading-6 text-gray-500">{card.desc}</p>
        </div>

        {/* 底部色条 */}
        <span className="absolute inset-x-0 bottom-0 h-1.5" style={{ background: `linear-gradient(90deg, ${color}, ${card.accent})` }} />
      </div>

      <button
        type="button"
        onClick={onRedraw}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition hover:bg-black/5"
        style={{ color }}
      >
        <RefreshCw size={13} /> 再抽一次
      </button>
    </div>
  );
}

function EmptySlot({ pool }: { pool: SkillPool }) {
  const p = POOL[pool];
  return (
    <div
      className="flex min-h-[15rem] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed text-center"
      style={{ borderColor: `${p.color}3d`, background: `${p.color}0a` }}
    >
      <span className="text-3xl">🎴</span>
      <p className="mt-3 px-6 text-xs leading-5 text-gray-400">
        还没有抽卡
        <br />
        点上面的按钮试试
      </p>
    </div>
  );
}

export function SkillsSection() {
  // ?draw=1 时先各抽一张（用惰性初始值算一次，不用 effect，避免多余的二次渲染）
  const [drawn, setDrawn] = useState<Partial<Record<SkillPool, SkillCard>>>(() =>
    DEBUG_DRAW
      ? { skill: drawFrom(SKILL_DECK), interest: drawFrom(INTEREST_DECK) }
      : {},
  );
  // 抽过的卡片数量（只用来做一个小提示，不展示清单）
  const [seen, setSeen] = useState<Set<string>>(() => new Set(Object.values(drawn).map((c) => c.id)));

  const doDraw = (pool: SkillPool) => {
    const card = drawFrom(POOL[pool].cards, drawn[pool]?.id);
    setDrawn((d) => ({ ...d, [pool]: card }));
    setSeen((s) => new Set(s).add(card.id));
  };

  return (
    <div>
      {/* 抽卡按钮 */}
      <div className="flex flex-wrap gap-3">
        {(["skill", "interest"] as SkillPool[]).map((pool) => {
          const p = POOL[pool];
          return (
            <button
              key={pool}
              type="button"
              onClick={() => doDraw(pool)}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 active:scale-95"
              style={{ background: p.color }}
            >
              {p.title}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        两副牌各自独立，随便点、随便抽 —— 已翻到 {seen.size} / {SKILL_DECK.length + INTEREST_DECK.length} 张
      </p>

      {/* 抽卡结果 */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {(["skill", "interest"] as SkillPool[]).map((pool) => {
          const card = drawn[pool];
          const p = POOL[pool];
          return (
            <div key={pool} className="flex flex-col">
              <span className="mb-2 text-center text-[11px] font-semibold tracking-[0.18em] text-gray-400">
                {p.sub} CARD
              </span>

              <AnimatePresence mode="wait">
                {card ? (
                  // ?draw=1（调试截图）时直接渲染卡面，不做翻牌动画
                  DEBUG_DRAW ? (
                    <CardFace key={card.id + pool} card={card} color={p.color} sub={p.sub} onRedraw={() => doDraw(pool)} />
                  ) : (
                    <motion.div
                      key={card.id + pool}
                      initial={{ rotateY: 88, opacity: 0, y: 10 }}
                      animate={{ rotateY: 0, opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.42, ease: "easeOut" }}
                      style={{ perspective: 1000 }}
                    >
                      <CardFace card={card} color={p.color} sub={p.sub} onRedraw={() => doDraw(pool)} />
                    </motion.div>
                  )
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <EmptySlot pool={pool} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
