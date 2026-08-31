import { KageLandingPage } from './effects/kage-landing-page/KageLandingPage';

export default function App() {
  return (
    <div className="relative w-screen min-h-screen bg-[#05070a] text-white overflow-hidden select-none font-sans">
      <main className="w-full h-full min-h-screen">
        <KageLandingPage
          headingFont="Onest"
          bodyFont="Onest"
          headingWeight="400"
          bodyWeight="300"
          primaryColor="#e0231c"
          headingSize={46}
          bodySize={17}
          headingLetterSpacing={-0.012}
          className="w-full h-full min-h-screen"
        />
      </main>
    </div>
  );
}

