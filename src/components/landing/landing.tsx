import { Benefits } from "./components/benefits/benefits";
import { LandingHero } from "./components/hero/landing-hero";
import { Partners } from "./components/partners";
import { PortfolioThemes } from "./components/portfolio-themes";
import { FAQ } from "./components/faq";
import { useAuth } from "@/src/contexts/AuthContext";
import { GoogleOneTap } from "../shared/GoogleOneTap";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const LandingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/app/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex w-full flex-col items-center gap-28 pb-28">
      {!user && <GoogleOneTap />}

      <LandingHero />

      <Partners />

      <PortfolioThemes />

      <Benefits />

      <FAQ />
    </div>
  );
};
