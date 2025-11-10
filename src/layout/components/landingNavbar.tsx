import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ArrowRight, Menu } from "lucide-react";

export const LandingNavbar = () => {
  const { t } = useTranslation();
  const menuItems: string[] = ["product", "simulator", "company"];

  return (
    <div className="fixed top-0 right-0 left-0 flex h-20 w-full items-center justify-between bg-cover px-6">
      <div className="flex gap-16 items-center">
        <Menu className="min-[1440px]:hidden" />
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

        <Button variant="outline">{t("global.button.clients")}</Button>
      </div>
    </div>
  );
};
