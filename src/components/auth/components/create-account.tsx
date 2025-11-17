import { Badge } from "@/components/ui/badge";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "../constants/create-acount.constants";
import { AccountFormSchema } from "../schemas/account.schema";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useAppForm } from "../../shared/form/form-hooks";
import { useTranslation } from "react-i18next";

export const CreateAccountPage = () => {
  const { t } = useTranslation();

  const accountSchema = AccountFormSchema.pick({
    name: true,
    lastName: true,
    email: true,
    phone: true,
    documentNumber: true,
    acceptCommunication: true,
    acceptTerms: true,
  });
  const accountForm = useAppForm({
    defaultValues: CREATE_ACCOUNT_DEFAULT_VALUES,
    validators: {
      onSubmit: accountSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted with values:", value);
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center gap-8">
        <Badge variant="pop">1/3</Badge>
        <h1 className="font-accent text-qo-h3">Create Account</h1>
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
            name="name"
            children={(field) => <field.Input label={t("global.label.name")} />}
          />

          <accountForm.AppField
            name="lastName"
            children={(field) => <field.Input label={t("global.label.lastName")} />}
          />

          <accountForm.AppField
            name="email"
            children={(field) => <field.Input type="email" label={t("global.label.email")} />}
          />

          <accountForm.AppField
            name="phone"
            children={(field) => <field.Input type="number" label={t("global.label.phone")} />}
          />

          <accountForm.AppField
            name="documentNumber"
            children={(field) => <field.Input label={t("global.label.documentNumber")} />}
          />
        </FieldGroup>

        <FieldSet>
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
        </FieldSet>

        <Button type="submit" variant={"secondary"} className="w-full">
          {t("global.button.continue")}
        </Button>
      </form>
    </div>
  );
};
