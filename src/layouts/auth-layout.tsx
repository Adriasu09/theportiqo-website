import { Outlet } from "@tanstack/react-router";

export const AuthLayout = () => {
  return (
    <div className="bg-qp-brand-25 flex h-screen w-screen items-center justify-center">
      <Outlet />
    </div>
  );
};
