import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import gmail3D from "@assets/imgs/3d/gmail.png";
import { Button } from "@/components/ui/button";

export const MailSentPage = () => {

  const { t } = useTranslation();


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

        <Button variant={"tertiary"} className="text-qo-xs">
          {t("global.button.resendCode")}
        </Button>
      </div>
    </div>
  );
};
