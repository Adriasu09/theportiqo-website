import { LandingHero } from "./components/landingHero";
import { Partners } from "./components/partners";
import { PortfolioThemses } from "./components/portfolioThemes";

export const LandingPage = () => {
  return (
    <div className="flex w-full flex-col gap-28">
      <LandingHero />

      <Partners />

      <PortfolioThemses />
    </div>
  );
};
