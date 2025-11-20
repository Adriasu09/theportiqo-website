import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "../contexts/AuthContext";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type routerContext = {
  auth: AuthContextType;
};

const RootLayout = () => (
  <>
    <Outlet />
    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRouteWithContext<routerContext>()({
  component: RootLayout,
});
