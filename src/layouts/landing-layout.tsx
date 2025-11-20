import { Outlet } from "@tanstack/react-router";
import { Footer, LandingNavbar } from "./components";
import { useAuth } from "../contexts/AuthContext";
import { GoogleOneTap } from "../components/shared/GoogleOneTap";

export const LandingLayout = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-qo-surface-100 font-main text-qo-base">
      {!user && <GoogleOneTap />}
      <LandingNavbar />

      <div className="w-full flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
