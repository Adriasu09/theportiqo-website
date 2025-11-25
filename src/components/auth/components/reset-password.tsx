import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { PasswordSchema } from "../schemas/account.schema";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

interface ResetPasswordPageProps {
  token?: string;
}

export const ResetPasswordPage = ({ token }: ResetPasswordPageProps) => {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const resetPasswordForm = useAppForm({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    validators: {
      onChange: PasswordSchema,
    },
    onSubmit: async ({ value }) => {
      if (token) {
        try {
          await resetPassword(token, value.password);
          navigate({ to: "/auth/password-changed" });

        } catch (error) {
          console.error("Failed to reset password:", error);
        }
      }
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.resetPassword.title")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetPasswordForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <resetPasswordForm.AppField
            name="password"
            children={(field) => (
              <field.Input type="password" label={t("global.label.password")} />
            )}
          />

          <resetPasswordForm.AppField
            name="passwordConfirmation"
            children={(field) => (
              <field.Input
                type="password"
                label={t("global.label.passwordConfirmation")}
              />
            )}
          />
        </FieldGroup>

        <resetPasswordForm.Subscribe
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
