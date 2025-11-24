import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { ADDRESS_DEFAULT_VALUES } from "../constants/create-acount.constants";
import { AddressSchema } from "../schemas/account.schema";
import { useAppForm } from "../../shared/form/form-hooks";
import { useRegisterUserStore } from "@/src/store/register-user.store";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { getInitialFormValues } from "../utils/register-form.utils";

export const EnterAddressPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const registerData = useRegisterUserStore((state) => state);

  const addressForm = useAppForm({
    defaultValues: getInitialFormValues(ADDRESS_DEFAULT_VALUES),
    validators: {
      onSubmit: AddressSchema,
    },
    onSubmit: ({ value }) => {
      registerData.setRegisterData(value);
      navigate({ to: "/auth/create-password" });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center gap-8">
        <Badge variant="pop">2/3</Badge>
        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.address.title")}
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addressForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <addressForm.AppField
            name="address"
            children={(field) => (
              <field.Input label={t("global.label.address")} />
            )}
          />

          <addressForm.AppField
            name="postalCode"
            children={(field) => (
              <field.Input label={t("global.label.postalCode")} />
            )}
          />

          <addressForm.AppField
            name="city"
            children={(field) => <field.Input label={t("global.label.city")} />}
          />

          <addressForm.AppField
            name="province"
            children={(field) => (
              <field.Input label={t("global.label.province")} />
            )}
          />

          <addressForm.AppField
            name="country"
            children={(field) => (
              <field.Input label={t("global.label.country")} />
            )}
          />
        </FieldGroup>

        <Button type="submit" className="w-full">
          {t("global.button.continue")}
        </Button>
      </form>
    </div>
  );
};
