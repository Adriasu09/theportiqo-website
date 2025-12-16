import { Carousel } from "./carousel";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { WaitingListDialog } from "../waiting-list-dialog";
import { CAROUSEL_ITEMS } from "@/src/components/landing/constants/landing.constants";

export const LandingHero = () => {
  const { t } = useTranslation();
  return (
    <div className="grid w-full grid-cols-1 gap-4 bg-qo-surface-300 px-0 py-20 transition-all md:grid-cols-2 md:px-6">
      <div className="order-2 flex w-full justify-center px-6 md:order-1 md:justify-end md:px-0">
        <div className="flex h-full max-w-xl flex-col items-start justify-center gap-4">
          <Badge className="hidden md:block" variant={"outline"}>{t("landing.hero.badge")}</Badge>

          <h1 className="text-center font-accent text-accent-3xl md:text-left lg:text-accent-4xl">
            {t("landing.hero.title")}
          </h1>

          <p className="w-full text-center md:text-left">
            {t("landing.hero.description")}
          </p>

          <div className="h- flex w-full flex-wrap items-center justify-center gap-2 md:justify-start">
            <WaitingListDialog type="primary" labelKey="beTheFirst" />
          </div>
        </div>
      </div>

      <div className="order-1 flex flex-col items-center justify-center gap-2 md:order-2 md:items-start">
        <Carousel items={CAROUSEL_ITEMS} />
      </div>
    </div>
  );
};
