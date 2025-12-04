import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import atSign3D from "@assets/imgs/3d/atSign.png";
import { useNavigate } from "@tanstack/react-router";

export const ExistingAccountPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="flex w-full flex-col items-center gap-6">
        <img src={atSign3D} width={"200px"} />

        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.existingAccount.title")}
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <p className="text-center">{t("auth.existingAccount.description")}</p>

        <Button
          onClick={() => navigate({ to: "/auth/forgot-password" })}
          variant={"tertiary"}
          className="text-qo-xs"
        >
          {t("global.button.forgotPassword")}
        </Button>

        <Button
          className="onboarding-button"
          onClick={() => navigate({ to: "/auth/login" })}
        >
          {t("global.button.login")}
        </Button>
      </div>
    </div>
  );
};
