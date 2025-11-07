import { LandingFooter, LandingNavbar } from "./components";

export const LandingLayout = () => {
  return (
    <div className="flex h-full w-full">
      <LandingNavbar />
      <div>Welcome to the Landing Layout</div>
      <LandingFooter />
    </div>
  );
};
