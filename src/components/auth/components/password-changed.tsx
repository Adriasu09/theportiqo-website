import { useTranslation } from "react-i18next";
import tick from "@assets/imgs/3d/tick.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const PasswordChangedPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.passwordChanged.title")}
      </h1>

      <img src={tick} alt="Password Changed" className="h-32 w-32" />

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <p className="w-full text-center">
          {t("auth.passwordChanged.description")}
        </p>

        <Button
          type="button"
          onClick={() => navigate({ to: "/auth/login" })}
          className="onboarding-button"
        >
          {t("global.button.backToLogin")}
        </Button>
      </div>
    </div>
  );
};
