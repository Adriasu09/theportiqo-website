import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handelSingOut = () => {
    signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-start">
      <h1 className="font-accent text-qo-h3">{`Welcome, ${user?.email}`}</h1>
      <Button variant={"default"} className="w-32" onClick={handelSingOut}>
        Logout
        <LogOut />
      </Button>
    </div>
  );
};