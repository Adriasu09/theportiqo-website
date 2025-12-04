import { useTranslation } from "react-i18next";
import gmail3D from "@assets/imgs/3d/gmail.png";
import { Button } from "@/components/ui/button";
import { useRegisterUserStore } from "@/src/store/register-user.store";
import { useAuth } from "@/src/contexts/AuthContext";

export const MailSentPage = () => {
  const { t } = useTranslation();
  const { resendConfirmationEmail } = useAuth();
  const registerData = useRegisterUserStore((state) => state);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center gap-6">
        <img src={gmail3D} width={"200px"} />

        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.mailSent.title")}
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <p className="text-center">{t("auth.mailSent.description")}</p>

        <Button
          onClick={() => resendConfirmationEmail(registerData.email ?? "")}
          variant={"tertiary"}
          className="text-qo-xs"
        >
          {t("global.button.resendCode")}
        </Button>
        {/* TODO:  open email */}
        <Button
          onClick={() => {}}
          className="onboarding-button"
        >
          {t("global.button.openEmail")}
        </Button>
      </div>
    </div>
  );
};
