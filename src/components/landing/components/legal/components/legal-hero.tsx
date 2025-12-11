import { useTranslation } from "react-i18next";

type Props = {
  titlekey: string;
};

export const LegalHero = ({ titlekey }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-[760px] w-full items-center justify-start bg-qo-surface-300 px-2 py-20 md:px-32">
      <h1 className="max-w-[720px] font-accent text-accent-3xl sm:text-accent-4xl">
        {t(`landing.legal.${titlekey}`)}
      </h1>
    </div>
  );
};
