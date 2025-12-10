import { Benefits } from "./components/benefits/benefits";
import { LandingHero } from "./components/hero/landing-hero";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Partners } from "./components/partners";
import { PortfolioThemes } from "./components/portfolio-themes";

export const LandingHomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/app/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex w-full flex-col items-center gap-4 md:gap-20 pb-28">
      <LandingHero />

      <Partners />

      <PortfolioThemes />

      <Benefits />
    </div>
  );
};
