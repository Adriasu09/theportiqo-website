import { Outlet } from "@tanstack/react-router";
import { LandingFooter, LandingNavbar } from "./components";

export const LandingLayout = () => {
  return (
    <div className="flex h-screen w-full flex-col justify-between bg-qo-brand-25 font-manrope-regular">
      <LandingNavbar />

      <div className="flex-1 w-full">
        <Outlet />
      </div>

      <LandingFooter />
    </div>
  );
};
