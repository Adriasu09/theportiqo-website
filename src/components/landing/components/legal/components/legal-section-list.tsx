import { useTranslation } from "react-i18next";

type Props = {
  page: "terms" | "commercials";
  sectionKeys: string[];
};

export const LegalSectionList = ({ page, sectionKeys }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {sectionKeys.map((key: string) => (
        <section key={key} className="flex w-full justify-center">
          <div className="flex w-[800px] flex-col gap-4">
            <h2 className="font-accent text-qo-h4 uppercase">
              {t(`landing.legal.${page}.${key}.title`)}
            </h2>
            <p className="whitespace-pre-line">
              {t(`landing.legal.${page}.${key}.description`)}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};
