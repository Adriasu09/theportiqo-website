import { useTranslation } from "react-i18next";
import { CAROUSEL_ITEMS } from "../../../constants/landing.constants";

export const PortfolioThemes = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-4">
      <h2 className="text-center font-accent text-qo-h5 md:text-qo-h3">
        {t("landing.ourPortfolio.title")}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
    </div>
  );
};
