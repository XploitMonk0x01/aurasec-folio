import { Sliders, Code2, Info, Maximize2, Minimize2, Monitor, Tablet, Smartphone, ExternalLink, Sparkles } from 'lucide-react';

export type DeviceMode = 'fullscreen' | 'desktop' | 'tablet' | 'mobile';

export interface Preset {
  id: string;
  name: string;
  jp: string;
  primaryColor: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: string;
  bodyWeight: string;
  headingSize: number;
  bodySize: number;
  headingLetterSpacing: number;
}

interface NavigationProps {
  deviceMode: DeviceMode;
  setDeviceMode: (m: DeviceMode) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  onOpenCustomizer: () => void;
  onOpenCode: () => void;
  onOpenInfo: () => void;
  activePresetId: string;
  onSelectPreset: (p: Preset) => void;
  presets: Preset[];
  isCustomizerOpen: boolean;
}

export function Navigation({
  deviceMode,
  setDeviceMode,
  isFullscreen,
  toggleFullscreen,
  onOpenCustomizer,
  onOpenCode,
  onOpenInfo,
  activePresetId,
  onSelectPreset,
  presets,
  isCustomizerOpen,
}: NavigationProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-3 sm:p-4 flex items-center justify-between gap-3">
      {/* Brand & Title */}
      <div className="pointer-events-auto flex items-center gap-3 bg-neutral-950/80 backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-red-700 to-red-500 flex items-center justify-center shadow-lg shadow-red-950/50">
            <span className="text-white text-xs font-semibold tracking-tighter">影</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-medium text-sm tracking-tight">Kage</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 bg-red-950/80 border border-red-500/30 px-1.5 py-0.2 rounded-full">ThreeUI</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-light hidden md:block">Kyoto Temple Live WebGL Experience</p>
          </div>
        </div>
      </div>

      {/* Preset pills (center) */}
      <div className="pointer-events-auto hidden lg:flex items-center gap-1 bg-neutral-950/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-2xl">
        <div className="px-2 text-[11px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-red-400" />
          <span>Atmosphere:</span>
        </div>
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`px-3 py-1 text-xs rounded-xl font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-neutral-800 text-white shadow-sm border border-white/15'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: preset.primaryColor }}
              />
              <span>{preset.name}</span>
              <span className="text-[10px] opacity-40">{preset.jp}</span>
            </button>
          );
        })}
      </div>

      {/* Action Controls (Right) */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Device preview toggles */}
        <div className="hidden sm:flex items-center bg-neutral-950/80 backdrop-blur-xl border border-white/10 p-1 rounded-2xl shadow-2xl">
          <button
            title="Fullscreen Responsive View"
            onClick={() => setDeviceMode('fullscreen')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              deviceMode === 'fullscreen' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            title="Desktop Canvas"
            onClick={() => setDeviceMode('desktop')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            title="Tablet Canvas"
            onClick={() => setDeviceMode('tablet')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              deviceMode === 'tablet' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            title="Mobile Canvas"
            onClick={() => setDeviceMode('mobile')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons group */}
        <div className="flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-xl border border-white/10 p-1 rounded-2xl shadow-2xl">
          <button
            onClick={onOpenCustomizer}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isCustomizerOpen ? 'bg-red-600 text-white shadow-lg shadow-red-950' : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          <button
            onClick={onOpenCode}
            title="View React Component Code"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenInfo}
            title="Technical Architecture & Shader Spec"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer"
          >
            <Info className="w-4 h-4" />
          </button>

          <a
            href="/landing-pages/kage.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Standalone HTML Document"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Browser Fullscreen' : 'Enter Browser Fullscreen'}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all hidden md:block cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
