import portiqoLogo from "@/src/assets/imgs/logos/portiqo/portiqo-black.svg";
import { Menu, User } from "lucide-react";

export const AppNavbar = () => {
  return (
    <div className="bg flex h-20 w-full justify-between p-6">
      <img src={portiqoLogo} alt="Portiqo Logo" className="w-18" />

      <div className="flex items-center gap-4">
        <User />
        <Menu className="cursor-pointer" />
      </div>
    </div>
  );
};
