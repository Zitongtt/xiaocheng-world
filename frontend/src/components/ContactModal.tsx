import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Download, Copy, Check } from "lucide-react";
import { PROFILE } from "@/data/content";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // 剪贴板不可用（非 https 或权限被拒）时静默失败，
      // 用户仍可点击整行用邮件客户端打开
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="关闭"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-semibold text-gray-900">联系我</h3>
            <p className="mt-1 text-sm text-gray-500">
              很高兴你愿意走近我的世界，随时找我聊聊～
            </p>

            <div className="mt-6 space-y-3">
              {/* 电话：PROFILE.phone 为空时不显示这一项 */}
              {PROFILE.phone ? (
                <a
                  href={`tel:${PROFILE.phone}`}
                  className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 transition hover:bg-gray-100"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Phone size={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-gray-400">电话</span>
                    <span className="font-medium text-gray-800">
                      {PROFILE.phone}
                    </span>
                  </span>
                </a>
              ) : null}

              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 transition hover:bg-gray-100">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex flex-1 items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Mail size={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-gray-400">邮箱</span>
                    <span className="font-medium text-gray-800">
                      {PROFILE.email}
                    </span>
                  </span>
                </a>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-white hover:text-gray-900"
                  aria-label="复制邮箱"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "已复制" : "复制"}
                </button>
              </div>

              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 transition hover:bg-gray-100"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Download size={18} />
                </span>
                <span>
                  <span className="block text-xs text-gray-400">简历</span>
                  <span className="font-medium text-gray-800">
                    查看 / 下载 PDF 简历
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
