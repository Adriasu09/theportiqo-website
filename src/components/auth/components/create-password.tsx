import { useTranslation } from "react-i18next";
import { PASSWORD_DEFAULT_VALUES } from "../constants/register.constants";
import { useAppForm } from "../../shared/form/form-hooks";
import { PasswordSchema, RegisterFormType } from "../schemas/register.schema";
import { FieldGroup } from "@/components/ui/field";
import { useRegisterUserStore } from "@/src/store/register-user.store";
import { Button } from "@/components/ui/button";
import { ApiError, useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { ERROR_CODES } from "../../shared/constants/error.constants";
import { PasswordValidationIndicator } from "../../shared/form/passwordValidationIndicator";

export const CreatePasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const registerData = useRegisterUserStore((state) => state);
  const { register } = useAuth();

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
          if (error instanceof ApiError) {
            error.code === ERROR_CODES.USER_EMAIL_ALREADY_EXISTS &&
              navigate({ to: "/auth/existing-account" });
            return;
          }
          console.error("Registration failed:", error);
        });
    },
  });

  return (
    <div className="auth-container">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.createPassword.title")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          passwordForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
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
          {([password]) => (
            <PasswordValidationIndicator password={password ?? ""} />
          )}
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
