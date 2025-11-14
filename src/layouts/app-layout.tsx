import { Outlet } from "@tanstack/react-router";
import { AppNavbar, Footer } from "./components";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-qo-brand-25 font-main">
      <AppNavbar />

      <div className="w-full flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
