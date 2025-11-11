import { Button } from "@/components/ui/button";
import { LandingHero } from "./components/landingHero";
import { PARTNERS_LOGOS } from "./constants/landing.constants";
import { Partners } from "./components/partners";

export const LandingPage = () => {
  return (
    <div className="flex w-full flex-col gap-28">
      <LandingHero />

      <Partners />
    </div>
  );
};
