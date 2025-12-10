import { useTranslation } from "react-i18next";

type Props = {
  page: "terms" | "commercials" | "privacyPolicy";
  sectionKeys: string[];
};

export const LegalSectionList = ({ page, sectionKeys }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-20 p-4">
      {sectionKeys.map((key: string) => (
        <section key={key} className="flex w-full justify-center">
          <div className="flex w-[800px] flex-col gap-4">
            <h2 className="font-accent text-qo-h6 uppercase sm:text-qo-h4">
              {t(`landing.legal.${page}.${key}.title`)}
            </h2>
            <p
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: t(`landing.legal.${page}.${key}.description`),
              }}
            ></p>
          </div>
        </section>
      ))}
    </div>
  );
};
