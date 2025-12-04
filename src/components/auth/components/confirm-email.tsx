import { useTranslation } from "react-i18next";
import tick3D from "@assets/imgs/3d/tick.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

type Props = {
  token: string;
};

export const ConfirmEmailPage = ({ token }: Props) => {
  const { t } = useTranslation();
  const { confirmEmail, processTokenFromBackend } = useAuth();
  const navigate = useNavigate();

  const [emailConfirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    const validateEmail = async (token: string) => {
      await confirmEmail(token)
        .then(() => {
          setEmailConfirmed(true);
          processTokenFromBackend({ token });
        })
        .catch((error) => {
          console.error("Email confirmation failed:", error);
        });
    };

    validateEmail(token);
  }, [token]);

  const handleContinue = () => {
    if (emailConfirmed) {
      navigate({ to: "/auth/personal-data" });
    }
  };

  return (
    <div className="auth-container">
      <div className="flex w-full flex-col items-center gap-6">
        <img src={tick3D} width={"200px"} />

        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.confirmEmail.title")}
        </h1>
      </div>

      <p className="w-full text-center">{t("auth.confirmEmail.description")}</p>

      <Button onClick={handleContinue} className="onboarding-button">
        {t("global.button.continue")}
      </Button>
    </div>
  );
};
