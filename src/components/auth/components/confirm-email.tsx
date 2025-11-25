import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import gmail3D from "@assets/imgs/3d/gmail.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const ConfirmEmailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContinue = () => {
    //* Temporarily redirect to home after confirming the registration flow
    navigate({ to: "/landing/home" });

    // Reset account store and localStorage
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center gap-6">
        <Badge variant="pop">3/3</Badge>

        <img src={gmail3D} width={"200px"} />

        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.confirmEmail.title")}
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <p className="text-center">{t("auth.confirmEmail.description")}</p>

        <Button variant={"tertiary"} className="text-qo-xs">
          {t("global.button.resendCode")}
        </Button>

        <Button className="onboarding-button" onClick={handleContinue}>
          {t("global.button.continue")}
        </Button>
      </div>
    </div>
  );
};
