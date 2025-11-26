import { Button } from "@/components/ui/button";
import rocket from "@assets/imgs/3d/rocket.png";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const ThreeStepsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-[520px] flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-center">
        <img src={rocket} width={"160px"} />
      </div>

      <h1 className="w-full text-center font-accent text-qo-h3">
        {t("auth.threeSteps.title")}
      </h1>

      <p className="py-6 text-center">{t("auth.threeSteps.description")}</p>

      <Button
        className="onboarding-button"
        onClick={() => navigate({ to: "/auth/create-account" })}
      >
        {t("global.button.continue")}
      </Button>
    </div>
  );
};
