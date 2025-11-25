import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { LoginFormSchema } from "../schemas/login.schema";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";
import googleLogo from "@assets/imgs/logos/googleLogo.png";
import appleLogo from "@assets/imgs/logos/appleLogo.svg";

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
          <Link to="/" className="font-bold cursor-pointer">{t("global.button.forgotPassword")}</Link>
        </FieldGroup>

        <div className="flex w-full flex-col items-center gap-4">
          <Button type="submit" className="w-[320px]">
            {t("global.button.enter")}
          </Button>

          <p>{t("global.label.or")}</p>

          <div className="flex w-full items-center justify-center gap-4">
            <Button variant={"oneTap"} size={"icon"} className="w-10">
              <img
                src={googleLogo}
                alt="Google Logo"
                height="25px"
                width="25px"
              />
            </Button>

            <Button variant={"oneTap"} size={"icon"} className="w-10">
              <img
                src={appleLogo}
                alt="Apple Logo"
                height="16px"
                width="16px"
              />
            </Button>
          </div>

          <div className="flex gap-2 items-center">
            <p>{t("auth.login.noAccount")}</p>
            <Link to="/auth/three-steps" className="font-bold text-qo-brand-500 cursor-pointer">
              {t("auth.login.register")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
