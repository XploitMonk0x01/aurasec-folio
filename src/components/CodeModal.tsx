import { useState } from 'react';
import { X, Check, Copy, Terminal } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  headingFont: string;
  bodyFont: string;
  headingWeight: string;
  bodyWeight: string;
  primaryColor: string;
  headingSize: number;
  bodySize: number;
  headingLetterSpacing: number;
}

export function CodeModal({
  isOpen,
  onClose,
  headingFont,
  bodyFont,
  headingWeight,
  bodyWeight,
  primaryColor,
  headingSize,
  bodySize,
  headingLetterSpacing,
}: CodeModalProps) {
  const [tab, setTab] = useState<'local' | 'package'>('local');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const localCode = `import { KageLandingPage } from "./effects/kage-landing-page/KageLandingPage";
import "./effects/kage-landing-page/styles.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="${headingFont}"
        bodyFont="${bodyFont}"
        headingWeight="${headingWeight}"
        bodyWeight="${bodyWeight}"
        primaryColor="${primaryColor}"
        headingSize={${headingSize}}
        bodySize={${bodySize}}
        headingLetterSpacing={${headingLetterSpacing}}
      />
    </div>
  );
}`;

  const packageCode = `import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="${headingFont.toLowerCase()}"
        bodyFont="${bodyFont.toLowerCase()}"
        headingWeight="${headingWeight}"
        bodyWeight="${bodyWeight}"
        primaryColor="${primaryColor}"
        headingSize={${headingSize}}
        bodySize={${bodySize}}
        headingLetterSpacing={${headingLetterSpacing}}
      />
    </div>
  );
}`;

  const currentCode = tab === 'local' ? localCode : packageCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-white font-medium text-base">Component Usage</h2>
              <p className="text-xs text-neutral-400">Copy React integration snippet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <div className="flex gap-1.5 bg-neutral-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setTab('local')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                tab === 'local' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Local Effect Component (Self-Hosted)
            </button>
            <button
              onClick={() => setTab('package')}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                tab === 'package' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              @designcodeio/threeui Package
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-xl transition-all shadow-md shadow-red-950/40 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code block */}
        <div className="p-6 pt-2">
          <pre className="p-4 rounded-2xl bg-neutral-900/90 border border-white/10 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed selection:bg-red-500 selection:text-white">
            {currentCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
