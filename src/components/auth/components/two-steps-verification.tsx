import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const TwoStepsVerificationPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.twoStepsVerification.title")}
      </h1>

      <p className="w-full text-center">
        {t("auth.twoStepsVerification.description")}
      </p>

      <Button type="submit" className="onboarding-button">
        {t("global.button.continue")}
      </Button>
    </div>
  );
};
