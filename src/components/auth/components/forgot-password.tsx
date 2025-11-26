import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { ForgotPasswordFormSchema } from "../schemas/forgot-password.schema";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const forgotPasswordForm = useAppForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: ForgotPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      await forgotPassword(value.email);

      navigate({ to: "/auth/mail-sent", search: { email: value.email } });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.forgotPassword.title")}
      </h1>

      <p className="w-full text-center">
        {t("auth.forgotPassword.description")}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          forgotPasswordForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <forgotPasswordForm.AppField
            name="email"
            children={(field) => (
              <field.Input type="email" label={t("global.label.email")} />
            )}
          />
        </FieldGroup>

        <forgotPasswordForm.Subscribe
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
