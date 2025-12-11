import { Outlet } from "@tanstack/react-router";
import { Footer, LandingNavbar } from "./components";

export const LandingLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-qo-surface-100 font-main text-main-md">
      <LandingNavbar />

      <div className="w-full flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
