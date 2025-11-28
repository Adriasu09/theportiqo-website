import { Outlet, useLocation, useRouter } from "@tanstack/react-router";
import { ArrowLeft, X } from "lucide-react";
import { useEffect } from "react";
import { useRegisterUserStore } from "../store/register-user.store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLOSABLE_AUTH_ROUTES } from "./constants/auth.constants";

export const AuthLayout = () => {
  const router = useRouter();
  const registerData = useRegisterUserStore((state) => state);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const location = useLocation();

  useEffect(() => {
    return () => {
      // reset register data on layout unmount
      registerData.setRegisterData({});
      localStorage.removeItem("register-storage");
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex min-h-screen w-screen items-start justify-center bg-qo-surface-200 px-4 pt-20">
        <div className="w-full max-w-[520px] rounded-4xl bg-white px-6 py-10 font-main xs:w-auto">
          <div className="flex w-full items-center justify-between pb-10">
            <ArrowLeft
              onClick={() => router.history.back()}
              className="cursor-pointer"
            />

            {CLOSABLE_AUTH_ROUTES.includes(location.pathname) && (
              <X
                onClick={() => router.navigate({ to: "/auth/continue-later" })}
                className="cursor-pointer"
              />
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
