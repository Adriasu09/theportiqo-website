import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { OtpFormSchema, OtpFormType } from "../schemas/login.schema";
import { FieldGroup } from "@/components/ui/field";
import { getFingerprint } from "../utils/fingerprint.utils";
import { useEffect } from "react";

type Props = {
  email?: string;
};

export const EnterCodePage = ({ email }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { verifyOtp, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/app/dashboard" });
    }
  }, [user]);

  const otpForm = useAppForm({
    defaultValues: {
      email: email,
      otp_code: "",
      remember_device: false,
      device_fingerprint: "",
    } as OtpFormType,
    validators: {
      onChange: OtpFormSchema,
    },
    onSubmit: async ({ value }) => {
      const deviceId = await getFingerprint();
      await verifyOtp({ ...value, device_fingerprint: deviceId });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.enterCode.title")}
      </h1>

      <p className="w-full text-center">
        {t("auth.enterCode.description", { email: email ?? ".." })}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          otpForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <otpForm.AppField
            name="otp_code"
            children={(field) => (
              <field.Input label={t("global.label.otpCode")} />
            )}
          />

          <otpForm.AppField
            name="remember_device"
            children={(field) => (
              <field.Checkbox label={t("global.label.rememberDevice")} />
            )}
          />
        </FieldGroup>

        <div className="flex w-full flex-col items-center gap-6">
          <Button
            type="button"
            variant={"tertiary"}
            className="onboarding-button"
          >
            {t("global.button.resendCode")}
          </Button>

          <otpForm.Subscribe
            selector={(state) => [state.canSubmit, state.isDirty]}
            children={([canSubmit, isDirty]) => (
              <Button
                type="submit"
                className="onboarding-button"
                disabled={!canSubmit || !isDirty}
              >
                {t("global.button.enter")}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
};
