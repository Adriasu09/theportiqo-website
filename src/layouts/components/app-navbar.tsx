import { PortiqoLogo } from "@/src/assets/imgs/logos/portiqo";
import { Menu, User } from "lucide-react";

export const AppNavbar = () => {
  return (
    <div className="flex h-20 w-full justify-between p-6">
      <PortiqoLogo />

      <div className="flex items-center gap-4">
        <User />
        <Menu className="cursor-pointer" />
      </div>
    </div>
  );
};
