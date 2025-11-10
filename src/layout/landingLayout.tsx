import { LandingFooter, LandingNavbar } from "./components";
import { useTranslation } from "react-i18next";

export const LandingLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <LandingNavbar />
      <div className="text-9xl">
        <p className="font-clash-display-regular">Invierte como un experto</p>
        <p className="font-clash-display-medium">Invierte como un experto</p>
        <p className="font-clash-display-bold">Invierte como un experto</p>

        <p className="font-manrope-regular">Saber que mis inversiones</p>
        <p className="font-manrope-medium">Saber que mis inversiones</p>
        <p className="font-manrope-bold">Saber que mis inversiones</p>
        <p className="font-manrope-bold">{t("test")}</p>
      </div>
      <LandingFooter />
    </div>
  );
};
