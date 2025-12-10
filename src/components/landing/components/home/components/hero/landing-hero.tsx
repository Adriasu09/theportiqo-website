import { Carousel } from "./carousel";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { WaitingListDialog } from "../waiting-list-dialog";
import { CAROUSEL_ITEMS } from "@/src/components/landing/constants/landing.constants";

export const LandingHero = () => {
  const { t } = useTranslation();
  return (
    <div className="grid w-full grid-cols-1 gap-4 bg-qo-surface-300 px-6 py-20 transition-all lg:grid-cols-2">
      <div className="order-2 lg:order-1 flex w-full justify-center lg:justify-end">
        <div className="flex h-full max-w-xl flex-col items-start justify-center gap-4">
          <Badge variant={"outline"}>{t("landing.hero.badge")}</Badge>

          <h1 className="font-accent text-qo-h2 lg:text-qo-h1">
            {t("landing.hero.title")}
          </h1>

          <p className="w-full">{t("landing.hero.description")}</p>

          <div className="h- flex w-full flex-wrap items-center justify-start gap-2">
            <WaitingListDialog type="primary" labelKey="beTheFirst" />
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 flex flex-col items-center justify-center gap-2 lg:items-start">
        <Carousel items={CAROUSEL_ITEMS} />
      </div>
    </div>
  );
};
