import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { LoginFormSchema } from "../schemas/login.schema";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import googleLogo from "@assets/imgs/logos/googleLogo.png";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/app/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const loginForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      await login(value.email, value.password);
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.login.title")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <FieldGroup>
          <loginForm.AppField
            name="email"
            children={(field) => (
              <field.Input type="email" label={t("global.label.email")} />
            )}
          />

          <loginForm.AppField
            name="password"
            children={(field) => (
              <field.Input type="password" label={t("global.label.password")} />
            )}
          />
        </FieldGroup>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <Button type="submit" variant={"secondary"} className="w-full">
              {t("global.button.enter")}
            </Button>

            <Button variant={"ghost"} className="w-full">
              <img
                src={googleLogo}
                alt="Google Logo"
                height="25px"
                width="25px"
                className="mr-2 inline-block"
              />
              {t("global.button.continueWithGoogle")}
            </Button>
          </div>

          <div className="flex w-full flex-col">
            <Button
              onClick={() => navigate({ to: "/auth/three-steps" })}
              variant={"link"}
              size={"link"}
              className="w-full text-center"
            >
              {t("global.button.createAccount")}
            </Button>

            <Button
              variant={"link"}
              size={"link"}
              className="w-full text-center"
            >
              {t("global.button.forgotPassword")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
