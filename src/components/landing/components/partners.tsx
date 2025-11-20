import { Button } from "@/components/ui/button";
import { PARTNERS_LOGOS } from "../constants/landing.constants";
import { useTranslation } from "react-i18next";

export const Partners = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4">
      <h2 className="text-center font-accent text-qo-h3">
        {t("landing.partners.title")}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-8 py-2">
        {PARTNERS_LOGOS.map((item: { url: string; height: number }) => (
          <img
            key={item.url}
            src={item.url}
            alt="partner-logo"
            className={`h-${item.height} w-auto object-contain`}
          />
        ))}
      </div>

      <p className="text-center">{t("landing.partners.comment")}</p>

      <Button variant={"secondary"}>
        {t("global.button.startInvestingNow")}
      </Button>
    </div>
  );
};
