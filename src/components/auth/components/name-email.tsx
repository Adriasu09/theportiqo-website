import { ACCOUNT_DEFAULT_VALUES } from "../constants/register.constants";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useAppForm } from "../../shared/form/form-hooks";
import { useTranslation } from "react-i18next";
import { NameEmailSchema } from "../schemas/register.schema";
import { useNavigate } from "@tanstack/react-router";
import { getInitialFormValues } from "../utils/register-form.utils";
import { useRegisterUserStore } from "@/src/store/register-user.store";

export const NameEmailPage = () => {
  const { t } = useTranslation();

  const registerData = useRegisterUserStore((state) => state);

  const navigate = useNavigate();

  const nameEmailForm = useAppForm({
    defaultValues: getInitialFormValues(ACCOUNT_DEFAULT_VALUES),
    validators: {
      onChange: NameEmailSchema,
      onSubmit: NameEmailSchema,
    },
    onSubmit: async ({ value }) => {
      registerData.setRegisterData(value);
      navigate({ to: "/auth/create-password" });
    },
  });

  return (
    <div className="auth-container">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.nameEmail.title")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          nameEmailForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <nameEmailForm.AppField
            name="firstName"
            children={(field) => (
              <field.Input label={t("global.label.firstName")} />
            )}
          />

          <nameEmailForm.AppField
            name="lastName"
            children={(field) => (
              <field.Input label={t("global.label.lastName")} />
            )}
          />

          <nameEmailForm.AppField
            name="email"
            children={(field) => (
              <field.Input type="email" label={t("global.label.email")} />
            )}
          />
        </FieldGroup>

        <div className="flex w-full flex-col gap-2">
          <nameEmailForm.AppField
            name="acceptCommunication"
            children={(field) => (
              <field.Checkbox label={t("global.label.acceptCommunication")} />
            )}
          />

          <nameEmailForm.AppField
            name="acceptTerms"
            children={(field) => (
              <field.Checkbox label={t("global.label.acceptTerms")} />
            )}
          />
        </div>

        <nameEmailForm.Subscribe
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
      </form>
    </div>
  );
};
