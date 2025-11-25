import { useTranslation } from "react-i18next";

interface MailSentPageProps {
  email?: string;
}

export const MailSentPage = ({ email }: MailSentPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      <h1 className="text-center font-accent text-qo-h3">
        {t("auth.mailSent.title")}
      </h1>

      <p className="w-full text-center">
        {t("auth.mailSent.description", { email: email || "..." })}
      </p>
    </div>
  );
};
