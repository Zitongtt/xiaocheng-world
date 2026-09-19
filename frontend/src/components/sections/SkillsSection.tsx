import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CARDS, INTEREST_CARDS } from "@/data/content";

type Pool = "skill" | "interest";

const POOL_META: Record<Pool, { title: string; color: string; cards: string[] }> = {
  skill: { title: "技能卡", color: "#3B82F6", cards: SKILL_CARDS },
  interest: { title: "兴趣卡", color: "#EC5C8D", cards: INTEREST_CARDS },
};

export function SkillsSection() {
  const [drawn, setDrawn] = useState<{ pool: Pool; value: string } | null>(null);
  const [key, setKey] = useState(0);

  const draw = (pool: Pool) => {
    const list = POOL_META[pool].cards;
    const value = list[Math.floor(Math.random() * list.length)];
    setDrawn({ pool, value });
    setKey((k) => k + 1);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => draw("skill")}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
          style={{ background: POOL_META.skill.color }}
        >
          抽一张技能卡
        </button>
        <button
          onClick={() => draw("interest")}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
          style={{ background: POOL_META.interest.color }}
        >
          抽一张兴趣卡
        </button>
      </div>

      {/* 抽卡展示区 */}
      <div className="mt-6 flex min-h-[180px] items-center justify-center">
        <AnimatePresence mode="wait">
          {drawn ? (
            <motion.div
              key={key}
              initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div
                className="flex h-44 w-32 items-center justify-center rounded-2xl p-4 text-center text-xl font-bold text-white shadow-xl"
                style={{
                  background: `linear-gradient(160deg, ${POOL_META[drawn.pool].color}, ${POOL_META[drawn.pool].color}aa)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {drawn.value}
              </div>
              <span
                className="mt-3 text-sm font-medium"
                style={{ color: POOL_META[drawn.pool].color }}
              >
                {POOL_META[drawn.pool].title}
              </span>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-400"
            >
              点上面的按钮，随机翻一张卡
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 全部卡片一览（淡化展示） */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {POOL_META.skill.cards.concat(POOL_META.interest.cards).map((c, i) => (
          <span
            key={i}
            className="rounded-lg bg-gray-50 px-3 py-1.5 text-center text-xs text-gray-500 ring-1 ring-black/5"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
