import { Outlet } from "@tanstack/react-router";
import { Footer, LandingNavbar } from "./components";

export const LandingLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-qo-surface-100 font-main text-qo-base">
      <LandingNavbar />

      <div className="flex-1 w-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
