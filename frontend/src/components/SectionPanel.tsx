import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  WHEEL,
  MULTICOLOR,
  DRIVE_ITEMS,
  EXPERIENCE_ITEMS,
  PROJECT_ITEMS,
  type SectionKey,
} from "@/data/content";
import { OriginSection } from "./sections/OriginSection";
import { GenericListSection } from "./sections/GenericListSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ThinkingSection } from "./sections/ThinkingSection";
import { LifeSection } from "./sections/LifeSection";
import { MulticolorSection } from "./sections/MulticolorSection";

interface SectionPanelProps {
  active: SectionKey | null;
  onClose: () => void;
  onContact: () => void;
}

function SectionContent({
  sectionKey,
  onContact,
}: {
  sectionKey: SectionKey;
  onContact: () => void;
}) {
  switch (sectionKey) {
    case "origin":
      return <OriginSection />;
    case "drive":
      return <GenericListSection items={DRIVE_ITEMS} accent="#E5484D" />;
    case "experience":
      return <GenericListSection items={EXPERIENCE_ITEMS} accent="#EC5C8D" />;
    case "projects":
      return <GenericListSection items={PROJECT_ITEMS} accent="#8E5BEF" />;
    case "skills":
      return <SkillsSection />;
    case "thinking":
      return <ThinkingSection />;
    case "life":
      return <LifeSection />;
    case "multicolor":
      return <MulticolorSection onContact={onContact} />;
  }
}

export function SectionPanel({ active, onClose, onContact }: SectionPanelProps) {
  const meta =
    active === "multicolor" ? MULTICOLOR : WHEEL.find((w) => w.key === active);

  return (
    <AnimatePresence>
      {active && meta && (
        <motion.div
          className="fixed inset-0 z-50 flex items-stretch justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background:
                active === "multicolor"
                  ? "rgba(17,17,17,0.45)"
                  : `${meta.color}22`,
            }}
            onClick={onClose}
          />
          <motion.div
            className="relative my-4 flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:my-10"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div
              className="flex items-start justify-between gap-4 px-6 py-5 md:px-8"
              style={{
                background:
                  active === "multicolor"
                    ? "linear-gradient(90deg,#F5C518,#E5484D,#EC5C8D,#8E5BEF,#3B82F6,#8B95A1,#2FBF71)"
                    : `${meta.color}14`,
                borderBottom: `3px solid ${meta.color}`,
              }}
            >
              <div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: active === "multicolor" ? "#111" : meta.color }}
                >
                  {meta.title}
                </h2>
                <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-600">
                  {meta.connect}
                </p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-full p-2 text-gray-400 transition hover:bg-black/5 hover:text-gray-700"
                aria-label="关闭"
              >
                <X size={22} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 md:px-8">
              <SectionContent
                key={active}
                sectionKey={active}
                onContact={onContact}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
