import { LandingHero } from "./components/landingHero";

export const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <LandingHero />

      <div className="w-full flex flex-col gap-4">
        <h2 className="font-accent"></h2>

      </div>
    </div>
  );
};
