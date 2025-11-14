import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ArrowRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "@tanstack/react-router";
import { MenuItem } from "../models/menu.models";
import { LANDING_MENU } from "../constants/menu.constants";

export const LandingNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 right-0 left-0 z-10 flex h-20 w-full items-center justify-between bg-cover px-6 backdrop-blur-xl min-[1440px]:backdrop-blur-none">
      <div className="flex items-center gap-6">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="cursor-pointer min-[1440px]:hidden" />
          </SheetTrigger>
          <SheetContent side="left" className="w-full bg-white">
            <SheetHeader>
              <SheetTitle className="font-oswald text-2xl font-black">
                QO
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-start gap-4 p-4">
              {LANDING_MENU.map((item: MenuItem) => (
                <Link
                  to={item.route}
                  key={item.key}
                  className="[&.active]:text-qo-brand-500"
                >
                  <p className="cursor-pointer text-3xl font-bold">
                    {t(`global.menu.${item.key}`)}
                  </p>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="font-oswald text-2xl font-black">
          <Link to="/landing/home">QO</Link>
        </div>
      </div>

      <div className="hidden justify-between gap-52 rounded-full px-8 py-4 backdrop-blur-xl min-[1440px]:flex">
        {LANDING_MENU.map((item: MenuItem) => (
          <Link to={item.route} key={item.key}>
            <p className="cursor-pointer">{t(`global.menu.${item.key}`)}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size={"default"} onClick={() => navigate({ to: "/auth/three-steps" })}>
          {t("global.button.becomeClient")}
          <ArrowRight />
        </Button>

        <div className="max-[480px]:hidden">
          <Button variant="outline">{t("global.button.clients")}</Button>
        </div>
      </div>
    </div>
  );
};
