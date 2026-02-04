"use client";

import React from "react";
import { Check, Copy, TriangleAlert } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
  locale: "en" | "id";
};

const copyText = {
  en: {
    copy: "Copy",
    copied: "Copied",
    failed: "Copy failed",
    aria: "Copy code block"
  },
  id: {
    copy: "Salin",
    copied: "Tersalin",
    failed: "Gagal salin",
    aria: "Salin blok kode"
  }
} as const;

function CodeBlock({
  code,
  language,
  locale
}: {
  code: string;
  language?: string;
  locale: "en" | "id";
}) {
  const t = copyText[locale];
  const [status, setStatus] = React.useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("failed");
      window.setTimeout(() => setStatus("idle"), 1600);
    }
  }

  const label = status === "copied" ? t.copied : status === "failed" ? t.failed : t.copy;
  const buttonClass =
    status === "copied" ? "code-copy-button code-copy-button-copied" : status === "failed" ? "code-copy-button code-copy-button-error" : "code-copy-button";
  const Icon = status === "copied" ? Check : status === "failed" ? TriangleAlert : Copy;

  return (
    <div className="code-block-shell">
      <div className="code-copy-toolbar">
        <span className="code-language-label">{language ?? "text"}</span>
        <button aria-label={t.aria} className={buttonClass} onClick={handleCopy} type="button">
          <Icon aria-hidden="true" className="code-copy-icon" size={13} />
          {label}
        </button>
      </div>
      <pre className="code-block-content">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function MarkdownContent({ content, locale }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        pre({ children }) {
          const child = Array.isArray(children) ? children[0] : children;
          if (!React.isValidElement<{ className?: string; children?: React.ReactNode }>(child)) {
            return <pre>{children}</pre>;
          }

          const className = typeof child.props.className === "string" ? child.props.className : "";
          const match = /language-([\w-]+)/.exec(className);
          const language = match?.[1];
          const code = String(child.props.children ?? "").replace(/\n$/, "");

          return <CodeBlock code={code} language={language} locale={locale} />;
        }
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
