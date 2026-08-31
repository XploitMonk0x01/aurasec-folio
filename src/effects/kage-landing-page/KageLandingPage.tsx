import type { CSSProperties } from 'react';
import { LandingPageFrame, type CustomizationOptions } from './LandingPageFrame';
import './styles.css';

export interface KageLandingPageProps {
  headingFont?: 'Onest' | 'Instrument Serif' | 'Newsreader' | 'Geist' | string;
  bodyFont?: 'Onest' | 'Geist' | 'Newsreader' | 'Instrument Serif' | string;
  headingWeight?: '300' | '400' | '500' | '600' | '700' | number | string;
  bodyWeight?: '300' | '400' | '500' | '600' | number | string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
  className?: string;
  style?: CSSProperties;
  sourceUrl?: string;
  onLoad?: () => void;
}

export function KageLandingPage({
  headingFont = 'Onest',
  bodyFont = 'Onest',
  headingWeight = '400',
  bodyWeight = '300',
  primaryColor = '#e0231c',
  headingSize = 46,
  bodySize = 17,
  headingLetterSpacing = -0.012,
  className = '',
  style,
  sourceUrl = '/landing-pages/kage.html',
  onLoad,
}: KageLandingPageProps) {
  const customization: CustomizationOptions = {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
  };

  return (
    <LandingPageFrame
      title="Kage — Where stillness reveals the unseen"
      sourceUrl={sourceUrl}
      customization={customization}
      className={className}
      style={style}
      onLoad={onLoad}
    />
  );
}
