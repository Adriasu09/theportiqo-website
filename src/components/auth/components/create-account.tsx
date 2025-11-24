import { Badge } from "@/components/ui/badge";
import { ACCOUNT_DEFAULT_VALUES } from "../constants/create-acount.constants";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useAppForm } from "../../shared/form/form-hooks";
import { useTranslation } from "react-i18next";
import { AccountSchema } from "../schemas/account.schema";
import { useRegisterUserStore } from "@/src/store/register-user.store";
import { useNavigate } from "@tanstack/react-router";
import { getInitialFormValues } from "../utils/register-form.utils";

export const CreateAccountPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const registerData = useRegisterUserStore((state) => state);

  const accountForm = useAppForm({
    defaultValues: getInitialFormValues(ACCOUNT_DEFAULT_VALUES),
    validators: {
      onSubmit: AccountSchema,
    },
    onSubmit: ({ value }) => {
      registerData.setRegisterData(value);
      navigate({ to: "/auth/enter-address" });
      console.log("Form submitted with values:", value);
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center gap-8">
        <Badge variant="pop">1/3</Badge>
        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.createAccount.title")}
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          accountForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <accountForm.AppField
            name="firstName"
            children={(field) => <field.Input label={t("global.label.firstName")} />}
          />

          <accountForm.AppField
            name="lastName"
            children={(field) => (
              <field.Input label={t("global.label.lastName")} />
            )}
          />

          <accountForm.AppField
            name="email"
            children={(field) => (
              <field.Input type="email" label={t("global.label.email")} />
            )}
          />

          <accountForm.AppField
            name="phone"
            children={(field) => (
              <field.Input type="number" label={t("global.label.phone")} />
            )}
          />

          <accountForm.AppField
            name="documentNumber"
            children={(field) => (
              <field.Input label={t("global.label.documentNumber")} />
            )}
          />
        </FieldGroup>

        <div className="flex w-full flex-col gap-2">
          <accountForm.AppField
            name="acceptCommunication"
            children={(field) => (
              <field.Checkbox label={t("global.label.acceptCommunication")} />
            )}
          />

          <accountForm.AppField
            name="acceptTerms"
            children={(field) => (
              <field.Checkbox label={t("global.label.acceptTerms")} />
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {t("global.button.continue")}
        </Button>
      </form>
    </div>
  );
};
