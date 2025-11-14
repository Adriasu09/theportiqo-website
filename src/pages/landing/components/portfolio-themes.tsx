import { useTranslation } from "react-i18next";
import { CAROUSEL_ITEMS } from "../constants/landing.constants";
import gmail3D from "@assets/imgs/gmail.png";
import { Button } from "@/components/ui/button";

export const PortfolioThemes = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-4">
      <h2 className="text-center font-accent text-qo-h3">
        {t("landing.ourPortfolio.title")}
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {CAROUSEL_ITEMS.map((item) => (
          <div
            key={item.url}
            className="flex flex-col gap-2 rounded-2xl bg-[#f7efe4] p-6"
          >
            <video
              key={item.titleKey}
              src={item.url}
              autoPlay
              loop
              muted
              playsInline
              style={{
                height: "300px",
              }}
            />

            <p className="text-center">{t(`global.label.${item.titleKey}`)}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex max-w-[530px] flex-col justify-center gap-4">
          <p>{t("landing.ourPortfolio.requirements")}</p>

          <h2 className="font-accent text-qo-h3">
            {t("landing.ourPortfolio.wantToKnowMore")}
          </h2>

          <p>{t("landing.ourPortfolio.getAccess")}</p>
        </div>

        <div className="flex  md:w-auto flex-col items-center justify-center gap-2 rounded-2xl bg-[#f5f5f5] p-8">
          <img src={gmail3D} width={"200px"} />
          <p>{t("landing.ourPortfolio.gmailAccount")}</p>
        </div>
      </div>

      <Button variant={"outline"}>
        {t("global.button.goToPortfolioSimulator")}
      </Button>
    </div>
  );
};
