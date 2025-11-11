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

export const LandingNavbar = () => {
  const { t } = useTranslation();
  const menuItems: string[] = ["product", "simulator", "company"];

  return (
    <div className="fixed top-0 right-0 left-0 flex h-20 w-full items-center justify-between bg-cover px-6">
      <div className="flex items-center gap-6">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="min-[1440px]:hidden cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-white w-full">
            <SheetHeader>
              <SheetTitle className="font-oswald text-2xl font-black">
                QO
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-start gap-4 p-4">
              {menuItems.map((item: string) => (
                <p key={item} className="cursor-pointer font-bold text-3xl">
                  {t(`global.menu.${item}`)}
                </p>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="font-oswald text-2xl font-black">QO</div>
      </div>

      <div className="hidden justify-between gap-52 rounded-full px-8 py-4 backdrop-blur-sm min-[1440px]:flex">
        {menuItems.map((item: string) => (
          <p key={item} className="cursor-pointer">
            {t(`global.menu.${item}`)}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size={"default"}>
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
