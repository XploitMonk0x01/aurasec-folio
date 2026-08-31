import { useState, useEffect } from 'react';
import { KageLandingPage } from './effects/kage-landing-page/KageLandingPage';
import { Navigation, type DeviceMode, type Preset } from './components/Navigation';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { DeviceFrame } from './components/DeviceFrame';
import { InfoModal } from './components/InfoModal';
import { CodeModal } from './components/CodeModal';

const ATMOSPHERIC_PRESETS: Preset[] = [
  {
    id: 'original',
    name: 'Kyoto Night',
    jp: '静寂',
    primaryColor: '#e0231c',
    headingFont: 'Onest',
    bodyFont: 'Onest',
    headingWeight: '400',
    bodyWeight: '300',
    headingSize: 46,
    bodySize: 17,
    headingLetterSpacing: -0.012,
  },
  {
    id: 'vermilion-ember',
    name: 'Vermilion Ember',
    jp: '朱火',
    primaryColor: '#ff5a3c',
    headingFont: 'Instrument Serif',
    bodyFont: 'Onest',
    headingWeight: '400',
    bodyWeight: '300',
    headingSize: 52,
    bodySize: 17,
    headingLetterSpacing: -0.01,
  },
  {
    id: 'imperial-gold',
    name: 'Imperial Gold',
    jp: '金閣',
    primaryColor: '#c9a24a',
    headingFont: 'Newsreader',
    bodyFont: 'Geist',
    headingWeight: '500',
    bodyWeight: '300',
    headingSize: 48,
    bodySize: 16,
    headingLetterSpacing: 0,
  },
  {
    id: 'bamboo-mist',
    name: 'Bamboo Mist',
    jp: '竹林',
    primaryColor: '#2db87a',
    headingFont: 'Geist',
    bodyFont: 'Geist',
    headingWeight: '600',
    bodyWeight: '300',
    headingSize: 42,
    bodySize: 16,
    headingLetterSpacing: -0.02,
  },
];

export default function App() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('fullscreen');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  // Active theme tokens
  const [activePresetId, setActivePresetId] = useState('original');
  const [primaryColor, setPrimaryColor] = useState('#e0231c');
  const [headingFont, setHeadingFont] = useState('Onest');
  const [bodyFont, setBodyFont] = useState('Onest');
  const [headingWeight, setHeadingWeight] = useState('400');
  const [bodyWeight, setBodyWeight] = useState('300');
  const [headingSize, setHeadingSize] = useState(46);
  const [bodySize, setBodySize] = useState(17);
  const [headingLetterSpacing, setHeadingLetterSpacing] = useState(-0.012);

  const handleSelectPreset = (preset: Preset) => {
    setActivePresetId(preset.id);
    setPrimaryColor(preset.primaryColor);
    setHeadingFont(preset.headingFont);
    setBodyFont(preset.bodyFont);
    setHeadingWeight(preset.headingWeight);
    setBodyWeight(preset.bodyWeight);
    setHeadingSize(preset.headingSize);
    setBodySize(preset.bodySize);
    setHeadingLetterSpacing(preset.headingLetterSpacing);
  };

  const handleReset = () => {
    const original = ATMOSPHERIC_PRESETS[0];
    handleSelectPreset(original);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  return (
    <div className="relative w-screen min-h-screen bg-[#05070a] text-white overflow-hidden select-none font-sans">
      {/* Studio Navigation Bar — hidden for portfolio mode */}

      {/* Main Experience Viewport */}
      <main className="w-full h-full min-h-screen">
        <DeviceFrame mode={deviceMode}>
          <KageLandingPage
            headingFont={headingFont}
            bodyFont={bodyFont}
            headingWeight={headingWeight}
            bodyWeight={bodyWeight}
            primaryColor={primaryColor}
            headingSize={headingSize}
            bodySize={bodySize}
            headingLetterSpacing={headingLetterSpacing}
            className="w-full h-full min-h-screen"
          />
        </DeviceFrame>
      </main>

      {/* Slide-out Customizer Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        headingFont={headingFont}
        setHeadingFont={setHeadingFont}
        bodyFont={bodyFont}
        setBodyFont={setBodyFont}
        headingWeight={headingWeight}
        setHeadingWeight={setHeadingWeight}
        bodyWeight={bodyWeight}
        setBodyWeight={setBodyWeight}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        headingSize={headingSize}
        setHeadingSize={setHeadingSize}
        bodySize={bodySize}
        setBodySize={setBodySize}
        headingLetterSpacing={headingLetterSpacing}
        setHeadingLetterSpacing={setHeadingLetterSpacing}
        onReset={handleReset}
        presets={ATMOSPHERIC_PRESETS}
        onSelectPreset={handleSelectPreset}
        activePresetId={activePresetId}
      />

      {/* Code Export Modal */}
      <CodeModal
        isOpen={isCodeOpen}
        onClose={() => setIsCodeOpen(false)}
        headingFont={headingFont}
        bodyFont={bodyFont}
        headingWeight={headingWeight}
        bodyWeight={bodyWeight}
        primaryColor={primaryColor}
        headingSize={headingSize}
        bodySize={bodySize}
        headingLetterSpacing={headingLetterSpacing}
      />

      {/* Technical Spec & Architecture Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
