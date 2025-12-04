import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from "../types/landing.types";
import { FAQ_LIST } from "../constants/landing.constants";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full max-w-[1000px] flex-col items-center gap-6 px-4">
      <h2 className="font-accent text-qo-h2 text-center">{t("landing.faq.title")}</h2>

      <div className="w-full rounded-2xl bg-white p-6">
        <Accordion
          type="single"
          className="w-full"
          defaultValue="item-1"
          collapsible
        >
          {FAQ_LIST.map((faq: FAQItem, index: number) => (
            <AccordionItem value={`${index}`} key={faq.questionKey}>
              <AccordionTrigger>
                <div className="text-qo-h5">
                  {t(`landing.faq.${faq.questionKey}`)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="whitespace-pre-line">
                  {t(`landing.faq.${faq.answerKey}`)}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
