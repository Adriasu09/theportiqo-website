import { useTranslation } from "react-i18next";
import { BenefitCard } from "../../models/landing.models";

export const BenefitsCard = ({
  titleKey,
  justify = "end",
  descriptionKey,
  isAccented = false,
}: BenefitCard) => {
  const { t } = useTranslation();

  return (
    <div className={`flex items-center justify-${justify}`}>
      <div
        className={`flex min-h-96 w-full max-w-[380px] flex-col items-start justify-end gap-2 rounded-2xl p-4 ${isAccented && "bg-qo-brand-100"}`}
      >
        <h2
          className={`font-accent text-qo-h3 whitespace-pre-line ${isAccented && "text-qo-brand-500"}`}
        >
          {t(`landing.benefits.${titleKey}`)}
        </h2>
        {descriptionKey && <p>{t(`landing.benefits.${descriptionKey}`)}</p>}
      </div>
    </div>
  );
};
