import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PasswordValidationIndicatorProps {
  password: string;
}

export const PasswordValidationIndicator = ({
  password,
}: PasswordValidationIndicatorProps) => {
  const { t } = useTranslation();

  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const getColor = (valid: boolean) =>
    valid ? "text-qo-success-500" : "text-qo-gray-400";

  const getCircleColor = (valid: boolean) =>
    valid ? "bg-qo-success-500" : "bg-qo-gray-300";

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Length */}
      <p
        className={`flex items-center gap-2 ${getColor(validations.length)}`}
      >
        <span
          className={`flex items-center justify-center rounded-full p-1 ${getCircleColor(validations.length)}`}
        >
          <Check className="size-4 text-white" />
        </span>
        {t("auth.createPassword.validation.length")}
      </p>

      {/* Uppercase */}
      <p
        className={`flex items-center gap-2 ${getColor(validations.uppercase)}`}
      >
        <span
          className={`flex items-center justify-center rounded-full p-1 ${getCircleColor(validations.uppercase)}`}
        >
          <Check className="size-4 text-white" />
        </span>
        {t("auth.createPassword.validation.case")}
      </p>

      {/* Number */}
      <p className={`flex items-center gap-2 ${getColor(validations.number)}`}>
        <span
          className={`flex items-center justify-center rounded-full p-1 ${getCircleColor(validations.number)}`}
        >
          <Check className="size-4 text-white" />
        </span>
        {t("auth.createPassword.validation.number")}
      </p>
    </div>
  );
};
