import { Button } from "@/components/ui/button";
import rocket from "@assets/imgs/3d/rocket.png";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import googleLogo from "@assets/imgs/logos/googleLogo.png";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export const ThreeStepsPage = () => {
  const { t } = useTranslation();
  const { loginGoogle } = useGoogleAuth();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/app/dashboard" });
    }
  }, [user]);

  return (
    <div className="auth-container">
      <div className="flex w-full items-center justify-center">
        <img src={rocket} width={"160px"} />
      </div>

      <div className="flex h-full w-full flex-col justify-center gap-6">
        <h1 className="w-full text-center font-accent text-qo-h3">
          {t("auth.threeSteps.title")}
        </h1>

        <p className="py-6 text-center">{t("auth.threeSteps.description")}</p>

        <div className="w-full flex flex-col items-center justify-center gap-4">
          <Button
            className="onboarding-button"
            onClick={() => navigate({ to: "/auth/name-email" })}
          >
            {t("global.button.continue")}
          </Button>

          <Button
            onClick={() => loginGoogle()}
            type="button"
            variant={"oneTap"}
            size={"icon"}
            className="w-10"
          >
            <img
              src={googleLogo}
              alt="Google Logo"
              height="25px"
              width="25px"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
