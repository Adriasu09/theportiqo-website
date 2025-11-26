import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { LoginFormSchema } from "../schemas/login.schema";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";
import googleLogo from "@assets/imgs/logos/googleLogo.png";
import { useGoogleLogin } from "@react-oauth/google";
import { getFingerprint } from "../utils/fingerprint.utils";

export const LoginPage = () => {
  const { t } = useTranslation();
  const { login, isAuthenticated, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      await signInWithGoogle(credentialResponse.access_token).catch((error) => {
        console.error("Internal login Failed:", error);
      });
    },
    onError: (error) => console.error("Google login Failed:", error),
  });

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
      onChange: LoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO send device fingerprint along with login request
      const deviceId = await getFingerprint();

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
          <Link to="/auth/forgot-password" className="cursor-pointer font-bold">
            {t("global.button.forgotPassword")}
          </Link>
        </FieldGroup>

        <div className="flex w-full flex-col items-center gap-4">
          <loginForm.Subscribe
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

          <p>{t("global.label.or")}</p>

          <div className="flex w-full items-center justify-center gap-4">
            {/* TODO: Implement google login */}
            <Button
              onClick={() => loginGoogle()}
              type="button"
              variant={"oneTap"}
              size={"icon"}
              className="w-10"
            >
              <img
                src={googleLogo}
                alt="Google Logo"
                height="25px"
                width="25px"
              />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <p>{t("auth.login.noAccount")}</p>
            <Link
              to="/auth/three-steps"
              className="cursor-pointer font-bold text-qo-brand-500"
            >
              {t("auth.login.register")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
