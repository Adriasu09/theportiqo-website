import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { getInitialFormValues } from "../utils/register-form.utils";
import { AddressFormType, AddressSchema } from "../schemas/register.schema";
import { ADDRESS_DEFAULT_VALUES } from "../constants/register.constants";
import { useAuth } from "@/src/contexts/AuthContext";
import { EU_COUNTRIES } from "../../shared/form/constants/form.constants";
import { Country } from "../../shared/form/models/form.models";
import { SelectItem } from "@/components/ui/select";

export const EnterAddressPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateAddress } = useAuth();

  const addressForm = useAppForm({
    defaultValues: getInitialFormValues(ADDRESS_DEFAULT_VALUES),
    validators: {
      onChange: AddressSchema,
    },
    onSubmit: async ({ value }) => {
      await updateAddress(value as AddressFormType)
        .then(() => {
          navigate({ to: "/auth/best-face" });
        })
        .catch((error) => {
          console.error("Saving address failed:", error);
        });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.address.title")}
      </h1>

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
              <field.Select label={t("global.label.country")}>
                {EU_COUNTRIES.map((country: Country) => (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {t(`global.country.${country.name}`)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          />
        </FieldGroup>

        <addressForm.Subscribe
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
