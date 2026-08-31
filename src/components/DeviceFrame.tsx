import type { ReactNode } from 'react';
import type { DeviceMode } from './Navigation';

interface DeviceFrameProps {
  mode: DeviceMode;
  children: ReactNode;
}

export function DeviceFrame({ mode, children }: DeviceFrameProps) {
  if (mode === 'fullscreen') {
    return <div className="w-full h-full min-h-screen">{children}</div>;
  }

  const getDimensions = () => {
    switch (mode) {
      case 'desktop':
        return { width: '1440px', height: '900px', label: 'MacBook Pro (1440 × 900)' };
      case 'tablet':
        return { width: '768px', height: '1024px', label: 'iPad Pro (768 × 1024)' };
      case 'mobile':
        return { width: '390px', height: '844px', label: 'iPhone 15 Pro (390 × 844)' };
    }
  };

  const dim = getDimensions();

  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 pt-24 pb-16 overflow-x-auto">
      {/* Device wrapper header */}
      <div className="mb-3 flex items-center justify-between w-full max-w-[1440px] px-2 text-xs text-neutral-400 font-mono">
        <span>Preview Mode: <span className="text-white font-medium">{dim.label}</span></span>
        <span>WebGL 2.0 Canvas</span>
      </div>

      {/* Frame device border */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 bg-black transition-all duration-300"
        style={{
          width: dim.width,
          height: dim.height,
          maxHeight: 'calc(100vh - 150px)',
        }}
      >
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
