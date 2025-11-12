import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Benefits } from "./components/benefits/benefits";
import { LandingHero } from "./components/hero/landing-hero";
import { Partners } from "./components/partners";
import { PortfolioThemes } from "./components/portfolio-themes";
import { FAQ } from "./components/faq";

export const LandingPage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-28">
      <LandingHero />

      <Partners />

      <PortfolioThemes />

      <Benefits />

      <FAQ />
    </div>
  );
};
