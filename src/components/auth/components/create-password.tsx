import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { PASSWORD_DEFAULT_VALUES } from "../constants/create-acount.constants";
import { useAppForm } from "../../shared/form/form-hooks";
import { AccountFormType, PasswordSchema } from "../schemas/account.schema";
import { FieldGroup } from "@/components/ui/field";
import { useRegisterUserStore } from "@/src/store/register-user.store";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export const CreatePasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const registerData = useRegisterUserStore((state) => state);
  const { register } = useAuth();

  const passwordForm = useAppForm({
    defaultValues: PASSWORD_DEFAULT_VALUES,
    validators: {
      onSubmit: PasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await register({ ...registerData, ...value } as AccountFormType);
      navigate({ to: "/auth/confirm-email" });
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center gap-8">
        <Badge variant="pop">3/3</Badge>
        <h1 className="text-center font-accent text-qo-h3">
          {t("auth.createPassword.title")}
        </h1>
      </div>

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
              <field.Input type="password" label={t("global.label.password")} />
            )}
          />

          <passwordForm.AppField
            name="passwordConfirmation"
            children={(field) => (
              <field.Input
                type="password"
                label={t("global.label.passwordConfirmation")}
              />
            )}
          />
        </FieldGroup>

        <Button type="submit" variant={"secondary"} className="w-full">
          {t("global.button.continue")}
        </Button>
      </form>
    </div>
  );
};
