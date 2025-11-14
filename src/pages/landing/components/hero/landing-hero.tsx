import { Button } from "@/components/ui/button";
import { Carousel } from "./carousel";
import { CAROUSEL_ITEMS } from "../../constants/landing.constants";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

export const LandingHero = () => {
  const { t } = useTranslation();
  return (
    <div className="grid w-full grid-cols-1 gap-4 bg-qo-surface-300 px-6 py-20 transition-all lg:grid-cols-2">
      <div className="flex w-full justify-center lg:justify-end">
        <div className="flex h-full max-w-xl flex-col items-start justify-center gap-4">
          <Badge variant={"outline"}>From 10,000 eur</Badge>

          <h1 className="font-accent text-qo-h1">{t("landing.hero.title")}</h1>

          <p className="w-full">
            {t("landing.hero.paragraph1")}
            <br />
            {t("landing.hero.paragraph2")}
          </p>

          <div className="flex w-full flex-wrap items-center justify-start gap-2">
            <Button variant={"secondary"}>
              {t("global.button.startInvesting")}
            </Button>
            <Button variant={"outline"}>{t("global.button.tryPortiqo")}</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 lg:items-start">
        <Carousel items={CAROUSEL_ITEMS} />
      </div>
    </div>
  );
};
