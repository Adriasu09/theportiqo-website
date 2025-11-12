import { Benefits } from "./components/benefits";
import { LandingHero } from "./components/landing-hero";
import { Partners } from "./components/partners";
import { PortfolioThemes } from "./components/portfolio-themes";

export const LandingPage = () => {
  return (
    <div className="flex w-full flex-col gap-28">
      <LandingHero />

      <Partners />

      <PortfolioThemes />

      <Benefits />
    </div>
  );
};
