
import HeroSection from '@/components/HeroSection';
import SocialLinks from '@/components/SocialLinks';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeroSection />
      <SocialLinks />
    </div>
  );
}

