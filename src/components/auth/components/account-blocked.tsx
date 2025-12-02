import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import lock3D from "@assets/imgs/3d/lock.png";
import { Button } from "@/components/ui/button";

export const AccountBlockedPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <div className="flex w-full flex-col items-center gap-6">
        <img src={lock3D} width={"200px"} />

        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.accountBlocked.title")}
        </h1>
      </div>

      <p className="w-full text-center">{t("auth.accountBlocked.description")}</p>

      <Button
        onClick={() => navigate({ to: "/auth/login" })}
        className="onboarding-button"
      >
        {t("global.button.back")}
      </Button>
    </div>
  );
};
