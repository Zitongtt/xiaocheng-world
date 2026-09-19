import { Mail, Phone, Download } from "lucide-react";
import { PROFILE, MULTICOLOR } from "@/data/content";

interface MulticolorSectionProps {
  onContact: () => void;
}

export function MulticolorSection({ onContact }: MulticolorSectionProps) {
  return (
    <div className="space-y-8">
      {/* 联系我 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">联系我</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {PROFILE.phone ? (
            <a
              href={`tel:${PROFILE.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white"
            >
              <Phone size={15} /> {PROFILE.phone}
            </a>
          ) : null}
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white"
          >
            <Mail size={15} /> {PROFILE.email}
          </a>
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-900"
          >
            打开联系卡
          </button>
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-900"
          >
            <Download size={15} /> 简历
          </a>
        </div>
      </div>

      {/* 结语 */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-pink-50 to-green-50 p-6 text-center">
        <p className="whitespace-pre-line text-[15px] leading-8 text-gray-700">
          {MULTICOLOR.outro}
        </p>
      </div>
    </div>
  );
}
