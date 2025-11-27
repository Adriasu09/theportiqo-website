import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { otpSchema } from "../schemas/login.schema";

export const EnterCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { verifyOtp } = useAuth();

  const otpForm = useAppForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onChange: otpSchema,
    },
    onSubmit: async ({ value }) => {
      // Verify OTP
    },
  })

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.enterCode.title")}
      </h1>

      <p className="w-full text-center">{t("auth.enterCode.description")}</p>

      <Button
        onClick={() => navigate({ to: "/auth/enter-code" })}
        type="submit"
        className="onboarding-button"
      >
        {t("global.button.continue")}
      </Button>
    </div>
  );
};
