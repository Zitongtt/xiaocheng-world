import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  // 占位时显示的色调（可选）
  tint?: string;
}

/**
 * 图片组件：尝试加载真实图片，加载失败则显示一个带文字的渐变占位块，
 * 这样即使还没放入照片，页面也完整好看。
 * 真实照片请放到 public/images/ 下，文件名与 src 对应。
 */
export function SmartImage({ src, alt, className = "", tint = "#cbd5e1" }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center text-center text-sm font-medium text-white/90 ${className}`}
        style={{
          background: `linear-gradient(135deg, ${tint}, ${tint}99)`,
        }}
      >
        <span className="px-4 leading-relaxed">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
