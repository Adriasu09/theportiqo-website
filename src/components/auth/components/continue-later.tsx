import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import star3D from "@assets/imgs/3d/star.png";

export const continueLaterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="flex w-full flex-col items-center gap-6">
        <img src={star3D} width={"200px"} />

        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.continueLater.title")}
        </h1>
      </div>

      <p className="w-full text-center">{t("auth.continueLater.description")}</p>
      <Button
        onClick={() => navigate({ to: "/app/dashboard" })}
        className="onboarding-button"
      >
        {t("global.button.accessPortiqo")}
      </Button>
    </div>
  );
};
