import { useTranslation } from "react-i18next";

type Props = {
  titlekey: string;
};

export const LegalHero = ({ titlekey }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-[760px] w-full items-center justify-start bg-qo-surface-300 px-32 py-20">
      <h1 className="font-accent text-qo-h1 max-w-[720px]">{t(`landing.legal.${titlekey}`)}</h1>
    </div>
  );
};
