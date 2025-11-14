import { Outlet } from "@tanstack/react-router";
import { Footer, LandingNavbar } from "./components";

export const LandingLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-qo-brand-25 font-main">
      <LandingNavbar />

      <div className="flex-1 w-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
