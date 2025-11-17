import { Outlet, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const AuthLayout = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-qo-surface-100 px-4">
      <div className="w-full max-w-[500px] rounded-4xl bg-white px-10 py-10 xs:w-auto">
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
