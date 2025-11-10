import { LandingFooter, LandingNavbar } from "./components";

export const LandingLayout = () => {
  return (
    <div className="flex h-screen w-full flex-col justify-end bg-qo-brand-25 font-manrope-regular">
      <LandingNavbar />
      <LandingFooter />
    </div>
  );
};
