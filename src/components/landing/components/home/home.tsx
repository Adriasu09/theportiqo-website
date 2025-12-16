import { Benefits } from "./components/benefits/benefits";
import { LandingHero } from "./components/hero/landing-hero";
import { Partners } from "./components/partners";
import { PortfolioThemes } from "./components/portfolio-themes";

export const LandingHomePage = () => {

  return (
    <div className="flex w-full flex-col items-center gap-4 md:gap-20 pb-28">
      <LandingHero />

      <Partners />

      <PortfolioThemes />

      <Benefits />
    </div>
  );
};
