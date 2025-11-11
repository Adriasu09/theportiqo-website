import { useTranslation } from "react-i18next";
import { CAROUSEL_ITEMS } from "../constants/landing.constants";
import gmail3D from "@assets/imgs/gmail.png";
import { Button } from "@/components/ui/button";

export const PortfolioThemses = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
      <h2 className="heading2 text-center">{t("landing.ourPortfolio.title")}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

      <div className="flex justify-center flex-wrap gap-4">
        <div className="justify-center flex max-w-[530px] flex-col gap-4">
          <p>{t("landing.ourPortfolio.requirements")}</p>

          <h2 className="heading2">
            {t("landing.ourPortfolio.wantToKnowMore")}
          </h2>

          <p>{t("landing.ourPortfolio.getAccess")}</p>
        </div>

        
        <div className="flex bg-[#f5f5f5] p-8 rounded-2xl flex-col items-center justify-center gap-2">
          <img src={gmail3D} width={"200px"} />
          <p>{t("landing.ourPortfolio.gmailAccount")}</p>
        </div>
      </div>

      <Button variant={"outline"}>{t("global.button.goToPortfolioSimulator")}</Button>
    </div>
  );
};
