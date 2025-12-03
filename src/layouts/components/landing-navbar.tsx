import { Link } from "@tanstack/react-router";
import { WaitingListDialog } from "@/src/components/landing/components/waiting-list-dialog";

export const LandingNavbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-10 flex h-20 w-full items-center justify-between bg-cover px-6 backdrop-blur-xl min-[1440px]:backdrop-blur-none">
      <div className="flex items-center gap-6">
        <div className="font-oswald text-2xl font-black">
          <Link to="/landing/home">QO</Link>
        </div>
      </div>

      <WaitingListDialog type="navbar" />
    </div>
  );
};
