import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import camera3D from "@assets/imgs/3d/camera.png";

export const BestFacePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // TODO: Temporaly redirecting to dashboard, implement Sumsub pages

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <div className="flex w-full flex-col items-center gap-6">
        <img src={camera3D} width={"200px"} />

        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.bestFace.title")}
        </h1>
      </div>

      <p className="w-full text-center">{t("auth.bestFace.description")}</p>

      <Button
        onClick={() => navigate({ to: "/app/dashboard" })}
        className="onboarding-button"
      >
        {t("global.button.continue")}
      </Button>
    </div>
  );
};
