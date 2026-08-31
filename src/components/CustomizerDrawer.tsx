import { X, RotateCcw, Palette, Type, Sliders, Check } from 'lucide-react';
import type { Preset } from './Navigation';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  headingFont: string;
  setHeadingFont: (f: string) => void;
  bodyFont: string;
  setBodyFont: (f: string) => void;
  headingWeight: string;
  setHeadingWeight: (w: string) => void;
  bodyWeight: string;
  setBodyWeight: (w: string) => void;
  primaryColor: string;
  setPrimaryColor: (c: string) => void;
  headingSize: number;
  setHeadingSize: (s: number) => void;
  bodySize: number;
  setBodySize: (s: number) => void;
  headingLetterSpacing: number;
  setHeadingLetterSpacing: (t: number) => void;
  onReset: () => void;
  presets: Preset[];
  onSelectPreset: (p: Preset) => void;
  activePresetId: string;
}

const FONT_OPTIONS = [
  { id: 'Onest', label: 'Onest', sub: 'Author Default' },
  { id: 'Instrument Serif', label: 'Instrument Serif', sub: 'Kyoto Editorial' },
  { id: 'Newsreader', label: 'Newsreader', sub: 'Classic Literary' },
  { id: 'Geist', label: 'Geist Sans', sub: 'Modern Minimal' },
];

const WEIGHT_OPTIONS = ['300', '400', '500', '600', '700'];

const COLOR_SWATCHES = [
  { name: 'Vermilion (Authored)', color: '#e0231c' },
  { name: 'Ember Blaze', color: '#ff5a3c' },
  { name: 'Imperial Gold', color: '#c9a24a' },
  { name: 'Bamboo Jade', color: '#2db87a' },
  { name: 'Kyoto Indigo', color: '#388bfd' },
  { name: 'Cherry Blossom', color: '#f778ba' },
  { name: 'Ghost White', color: '#dfe7e0' },
  { name: 'Shadow Violet', color: '#9e6a03' },
];

export function CustomizerDrawer({
  isOpen,
  onClose,
  headingFont,
  setHeadingFont,
  bodyFont,
  setBodyFont,
  headingWeight,
  setHeadingWeight,
  bodyWeight,
  setBodyWeight,
  primaryColor,
  setPrimaryColor,
  headingSize,
  setHeadingSize,
  bodySize,
  setBodySize,
  headingLetterSpacing,
  setHeadingLetterSpacing,
  onReset,
  presets,
  onSelectPreset,
  activePresetId,
}: CustomizerDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-neutral-950/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center">
            <Sliders className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h2 className="text-white font-medium text-sm">Theme Customizer</h2>
            <p className="text-xs text-neutral-400">Live override of renderer tokens</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            title="Reset to Authored Defaults"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable controls */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Preset selector */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2.5">
            Atmospheric Preset
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p) => {
              const active = activePresetId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPreset(p)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    active
                      ? 'bg-neutral-900 border-red-500/50 shadow-md ring-1 ring-red-500/20'
                      : 'bg-neutral-900/50 border-white/5 hover:border-white/15 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${active ? 'text-white' : 'text-neutral-300'}`}>
                      {p.name}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: p.primaryColor }}
                    />
                  </div>
                  <span className="text-[11px] text-neutral-500">{p.jp}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Color */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-red-400" />
              Primary Color (--vermilion)
            </label>
            <span className="font-mono text-xs text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-white/10">
              {primaryColor}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            {COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.color}
                onClick={() => setPrimaryColor(swatch.color)}
                className="group relative flex flex-col items-center gap-1 p-2 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
              >
                <div
                  className="w-6 h-6 rounded-lg ring-1 ring-white/20 flex items-center justify-center"
                  style={{ backgroundColor: swatch.color }}
                >
                  {primaryColor.toLowerCase() === swatch.color.toLowerCase() && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                  )}
                </div>
                <span className="text-[10px] text-neutral-400 truncate w-full text-center">
                  {swatch.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-neutral-900/60 p-2.5 rounded-xl border border-white/5">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <span className="text-xs text-neutral-400">Custom Hex Code</span>
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="ml-auto bg-neutral-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-white w-24 text-center focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Heading Typography */}
        <div className="pt-2 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-red-400" />
              Heading Font
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {FONT_OPTIONS.map((f) => {
              const active = headingFont === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setHeadingFont(f.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    active
                      ? 'bg-neutral-900 border-red-500/60 text-white'
                      : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:border-white/15'
                  }`}
                >
                  <div className="text-xs font-medium text-white">{f.label}</div>
                  <div className="text-[10px] text-neutral-500">{f.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Heading Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-400">Heading Weight</span>
              <span className="font-mono text-xs text-neutral-300">{headingWeight}</span>
            </div>
            <div className="flex gap-1 bg-neutral-900/60 p-1 rounded-xl border border-white/5">
              {WEIGHT_OPTIONS.map((w) => (
                <button
                  key={w}
                  onClick={() => setHeadingWeight(w)}
                  className={`flex-1 py-1 text-xs rounded-lg font-mono transition-all cursor-pointer ${
                    headingWeight === w ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Heading Size Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-neutral-400">Heading Size Ceiling</span>
              <span className="font-mono text-xs text-neutral-300">{headingSize}px</span>
            </div>
            <input
              type="range"
              min={30}
              max={72}
              value={headingSize}
              onChange={(e) => setHeadingSize(Number(e.target.value))}
              className="w-full accent-red-500 bg-neutral-900"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>30px</span>
              <span>Default 46px</span>
              <span>72px</span>
            </div>
          </div>

          {/* Heading Letter Spacing */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-neutral-400">Heading Tracking</span>
              <span className="font-mono text-xs text-neutral-300">{headingLetterSpacing}em</span>
            </div>
            <input
              type="range"
              min={-0.05}
              max={0.05}
              step={0.002}
              value={headingLetterSpacing}
              onChange={(e) => setHeadingLetterSpacing(Number(e.target.value))}
              className="w-full accent-red-500 bg-neutral-900"
            />
          </div>
        </div>

        {/* Body Typography */}
        <div className="pt-2 border-t border-white/10 space-y-4">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
            Body Typography
          </label>

          <div className="grid grid-cols-2 gap-2">
            {FONT_OPTIONS.map((f) => {
              const active = bodyFont === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setBodyFont(f.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    active
                      ? 'bg-neutral-900 border-red-500/60 text-white'
                      : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:border-white/15'
                  }`}
                >
                  <div className="text-xs font-medium text-white">{f.label}</div>
                  <div className="text-[10px] text-neutral-500">{f.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Body Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-400">Body Weight</span>
              <span className="font-mono text-xs text-neutral-300">{bodyWeight}</span>
            </div>
            <div className="flex gap-1 bg-neutral-900/60 p-1 rounded-xl border border-white/5">
              {['300', '400', '500', '600'].map((w) => (
                <button
                  key={w}
                  onClick={() => setBodyWeight(w)}
                  className={`flex-1 py-1 text-xs rounded-lg font-mono transition-all cursor-pointer ${
                    bodyWeight === w ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Body Size */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-neutral-400">Body Size</span>
              <span className="font-mono text-xs text-neutral-300">{bodySize}px</span>
            </div>
            <input
              type="range"
              min={13}
              max={22}
              value={bodySize}
              onChange={(e) => setBodySize(Number(e.target.value))}
              className="w-full accent-red-500 bg-neutral-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
