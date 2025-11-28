import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { PERSONAL_DATA_DEFAULT_VALUES } from "../constants/register.constants";
import { PersonalDataSchema } from "../schemas/register.schema";
import { FieldGroup } from "@/components/ui/field";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export const PersonalDataPage = () => {
  const { t } = useTranslation();
  const { updatePersonalInfo } = useAuth();
  const navigate = useNavigate();

  const personalDataForm = useAppForm({
    defaultValues: PERSONAL_DATA_DEFAULT_VALUES,
    validators: {
      onChange: PersonalDataSchema,
    },
    onSubmit: async ({ value }) => {
      await updatePersonalInfo(value)
        .then(() => {
          navigate({ to: "/auth/enter-address" });
        })
        .catch((error) => {
          console.error("Saving personal data failed:", error);
        });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.personalData.title")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          personalDataForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <personalDataForm.AppField
            name="phone"
            children={(field) => (
              <field.Input label={t("global.label.phone")} />
            )}
          />

          <personalDataForm.AppField
            name="documentType"
            children={(field) => (
              <field.Input label={t("global.label.documentType")} />
            )}
          />

          <personalDataForm.AppField
            name="documentNumber"
            children={(field) => (
              <field.Input label={t("global.label.documentNumber")} />
            )}
          />
        </FieldGroup>

        <personalDataForm.Subscribe
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
