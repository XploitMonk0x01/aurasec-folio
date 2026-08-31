import { KageLandingPage } from "./effects/kage-landing-page/KageLandingPage";
import "./effects/kage-landing-page/styles.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="Onest"
        bodyFont="Onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
