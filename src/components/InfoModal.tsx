import { X, Sparkles, Cpu, Image as ImageIcon } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-950 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <span className="text-red-400 font-serif text-lg">影</span>
            </div>
            <div>
              <h2 className="text-white font-medium text-lg">Kage Temple Experience</h2>
              <p className="text-xs text-neutral-400">Technical Architecture & Render Contract</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-neutral-300">
          {/* Brief */}
          <div className="bg-neutral-900/60 p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>Authored Kyoto Temple Experience</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              A live five-chapter nocturnal walk through a Kyoto mountain temple. Charred cypress, lantern light, and a vermilion moon rendered via WebGL and layered WebP parallax surfaces.
            </p>
          </div>

          {/* 14 Scene Layers */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium text-xs font-mono uppercase tracking-wider">
              <ImageIcon className="w-4 h-4 text-red-400" />
              <span>14 Local WebP Scene Layers</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                'kage-approach.webp',
                'kage-lantern-court.webp',
                'kage-moonwater.webp',
                'kage-sanmon-preview.webp',
                'basalt-stones.webp',
                'garden-bush.webp',
                'hill.webp',
                'maple-leaves.webp',
                'pine-tree.webp',
                'sakura-branch.webp',
                'shrine-ruins.webp',
                'stone-lantern.webp',
                'tall-grass.webp',
                'temple-wall.webp',
              ].map((layer) => (
                <div key={layer} className="bg-neutral-900/80 px-3 py-2 rounded-xl border border-white/5 font-mono text-[11px] text-neutral-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="truncate">{layer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Behavior Contract */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium text-xs font-mono uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-red-400" />
              <span>Runtime & Verification Contract</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span><strong className="text-white">Renderer:</strong> 1 sandboxed full-document Three.js WebGL renderer + custom GLSL noise & fog shaders.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span><strong className="text-white">Interactions:</strong> Pointer tracking, inertia scroll scenes, keyboard navigation, dynamic reveal transitions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span><strong className="text-white">Assets:</strong> 100% self-hosted local fonts, Three.js bundle, and 14 WebP binary layers with zero external dependencies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span><strong className="text-white">Customization:</strong> Live CSS variable & typography token bridge connecting React host to sandboxed renderer.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
