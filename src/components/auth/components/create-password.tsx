import { useTranslation } from "react-i18next";
import { PASSWORD_DEFAULT_VALUES } from "../constants/register.constants";
import { useAppForm } from "../../shared/form/form-hooks";
import { PasswordSchema, RegisterFormType } from "../schemas/register.schema";
import { FieldGroup } from "@/components/ui/field";
import { useRegisterUserStore } from "@/src/store/register-user.store";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const CreatePasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const registerData = useRegisterUserStore((state) => state);
  const { register } = useAuth();

  const passwordValidations = {
    length: (pw: string) => pw.length >= 8,
    uppercase: (pw: string) => /[A-Z]/.test(pw),
    number: (pw: string) => /[0-9]/.test(pw),
  };

  const passwordForm = useAppForm({
    defaultValues: PASSWORD_DEFAULT_VALUES,
    validators: {
      onChange: PasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await register({
        ...registerData,
        password: value.password,
      } as RegisterFormType)
        .then(() => {
          navigate({ to: "/auth/mail-sent" });
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.createPassword.title")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          passwordForm.handleSubmit();
        }}
        className="flex w-full max-w-[400px] flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <passwordForm.AppField
            name="password"
            children={(field) => (
              <field.Input
                type="password"
                label={t("global.label.password")}
                showErrorMessage={false}
              />
            )}
          />

          <passwordForm.AppField
            name="passwordConfirmation"
            children={(field) => (
              <field.Input
                type="password"
                label={t("global.label.passwordConfirmation")}
                showErrorMessage={false}
              />
            )}
          />
        </FieldGroup>

        <passwordForm.Subscribe selector={(state) => [state.values.password]}>
          {([password]) => {
            const isLengthValid = passwordValidations.length(password ?? "");
            const hasUppercase = passwordValidations.uppercase(password ?? "");
            const hasNumber = passwordValidations.number(password ?? "");

            const getColor = (valid: boolean) =>
              valid ? "text-qo-success-500" : "text-qo-gray-400";

            const getCircleColor = (valid: boolean) =>
              valid ? "bg-qo-success-500" : "bg-qo-gray-300";

            return (
              <div className="flex w-full flex-col gap-4">
                {/* Length */}
                <p
                  className={`flex items-center gap-2 ${getColor(isLengthValid)}`}
                >
                  <span
                    className={`flex items-center justify-center rounded-full p-1 ${getCircleColor(isLengthValid)}`}
                  >
                    <Check className="size-4 text-white" />
                  </span>
                  {t("auth.createPassword.validation.length")}
                </p>

                {/* Uppercase */}
                <p
                  className={`flex items-center gap-2 ${getColor(hasUppercase)}`}
                >
                  <span
                    className={`flex items-center justify-center rounded-full p-1 ${getCircleColor(hasUppercase)}`}
                  >
                    <Check className="size-4 text-white" />
                  </span>
                  {t("auth.createPassword.validation.case")}
                </p>

                {/* Number */}
                <p className={`flex items-center gap-2 ${getColor(hasNumber)}`}>
                  <span
                    className={`flex items-center justify-center rounded-full p-1 ${getCircleColor(hasNumber)}`}
                  >
                    <Check className="size-4 text-white" />
                  </span>
                  {t("auth.createPassword.validation.number")}
                </p>
              </div>
            );
          }}
        </passwordForm.Subscribe>

        <passwordForm.Subscribe
          selector={(state) => [state.canSubmit, state.isDirty]}
          children={([canSubmit, isDirty]) => (
            <Button
              type="submit"
              className="onboarding-button"
              disabled={!canSubmit || !isDirty}
            >
              {t("global.button.continue")}
            </Button>
          )}
        />
      </form>
    </div>
  );
};
