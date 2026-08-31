import { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface CustomizationOptions {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string | number;
  bodyWeight?: string | number;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
}

export interface LandingPageFrameProps {
  title?: string;
  sourceUrl: string;
  customization?: CustomizationOptions;
  className?: string;
  style?: CSSProperties;
  onLoad?: () => void;
}

export function LandingPageFrame({
  title = 'Kage — Where stillness reveals the unseen',
  sourceUrl,
  customization,
  className = '',
  style,
  onLoad,
}: LandingPageFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const applyCustomization = (iframe: HTMLIFrameElement | null, options?: CustomizationOptions) => {
    if (!iframe || !options) return;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || !doc.head) return;

      let customStyle = doc.getElementById('threeui-customization') as HTMLStyleElement | null;
      if (!customStyle) {
        customStyle = doc.createElement('style');
        customStyle.id = 'threeui-customization';
        doc.head.appendChild(customStyle);
      }

      const fontsToLoad = new Set<string>();
      if (options.headingFont) fontsToLoad.add(options.headingFont);
      if (options.bodyFont) fontsToLoad.add(options.bodyFont);

      const fontFamilies = Array.from(fontsToLoad)
        .filter(f => !['Onest', 'sans-serif', 'serif', 'monospace', 'system-ui'].includes(f))
        .map(f => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700`)
        .join('&');

      if (fontFamilies && !doc.getElementById('threeui-fonts-loader')) {
        const link = doc.createElement('link');
        link.id = 'threeui-fonts-loader';
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
        doc.head.appendChild(link);
      }

      const cssRules: string[] = [];

      if (options.primaryColor) {
        cssRules.push(`
          :root {
            --vermilion: ${options.primaryColor} !important;
            --ember: ${options.primaryColor} !important;
          }
          ::selection {
            background: ${options.primaryColor} !important;
            color: #ffffff !important;
          }
        `);
      }

      if (options.headingFont || options.headingWeight || options.headingSize || options.headingLetterSpacing !== undefined) {
        const fontRule = options.headingFont ? `font-family: '${options.headingFont}', 'Onest', system-ui, sans-serif !important;` : '';
        const weightRule = options.headingWeight ? `font-weight: ${options.headingWeight} !important;` : '';
        const trackRule = options.headingLetterSpacing !== undefined ? `letter-spacing: ${options.headingLetterSpacing}em !important;` : '';
        const sizeRule = options.headingSize ? `font-size: clamp(${Math.round(options.headingSize * 0.65)}px, 3.2vw, ${options.headingSize}px) !important;` : '';

        cssRules.push(`
          h1, h2, h3, .display, .h-hero, .h-sec {
            ${fontRule}
            ${weightRule}
            ${trackRule}
            ${sizeRule}
          }
        `);
      }

      if (options.bodyFont || options.bodyWeight || options.bodySize) {
        const bodyFontRule = options.bodyFont ? `font-family: '${options.bodyFont}', 'Onest', system-ui, sans-serif !important;` : '';
        const bodyWeightRule = options.bodyWeight ? `font-weight: ${options.bodyWeight} !important;` : '';
        const bodySizeRule = options.bodySize ? `font-size: ${options.bodySize}px !important;` : '';

        cssRules.push(`
          body, .body, .body-lg, p {
            ${bodyFontRule}
            ${bodyWeightRule}
            ${bodySizeRule}
          }
        `);
      }

      customStyle.textContent = cssRules.join('\n');
    } catch {
      // Ignore cross-origin access issues in non-same-origin environments
    }
  };

  useEffect(() => {
    applyCustomization(iframeRef.current, customization);
  }, [customization]);

  return (
    <div
      className={`threeui-background landing-page-frame ${className}`.trim()}
      data-state={isReady ? 'ready' : 'loading'}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#05070a',
        pointerEvents: 'auto',
        ...style,
      }}
    >
      <iframe
        ref={iframeRef}
        title={title}
        src={sourceUrl}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
        loading="eager"
        onLoad={e => {
          applyCustomization(e.currentTarget, customization);
          setIsReady(true);
          onLoad?.();
        }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
          background: '#05070a',
          opacity: 1,
        }}
      />
    </div>
  );
}
