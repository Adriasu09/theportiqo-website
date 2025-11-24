import { Button } from "@/components/ui/button";
import rocket from "@assets/imgs/3d/rocket.png";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const ThreeStepsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="align-center flex max-w-[520px] flex-col gap-4">
      <div className="flex w-full items-center justify-center">
        <img src={rocket} width={"160px"} />
      </div>

      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.threeSteps.title")}
      </h1>

      <p className="py-6">{t("auth.threeSteps.description")}</p>

      <Button onClick={() => navigate({ to: "/auth/create-account" })}>
        {t("global.button.continue")}
      </Button>
    </div>
  );
};
