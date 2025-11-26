import { Outlet, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useRegisterUserStore } from "../store/register-user.store";

export const AuthLayout = () => {
  const router = useRouter();
  const registerData = useRegisterUserStore((state) => state);

  useEffect(() => {
    return () => {
      // reset register data on layout unmount
      registerData.setRegisterData({});
      localStorage.removeItem("register-storage");
    }
  }, []);

  return (
    <div className="flex min-h-screen w-screen items-start justify-center pt-20 bg-qo-surface-200 px-4">
      <div className="w-full font-main max-w-[520px] rounded-4xl bg-white px-6 py-10 xs:w-auto">
        <div className="flex w-full items-center justify-start pb-10">
          <ArrowLeft
            onClick={() => router.history.back()}
            className="cursor-pointer"
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
