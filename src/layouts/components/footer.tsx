import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PortiqoLogo } from "@/src/assets/imgs/logos/portiqo";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FOOTER_SECTIONS } from "../constants/footer.constants";
import { FooterSection } from "../models/footer.models";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 bg-qo-gray-900 px-4 pt-8 text-white">
      <div className="flex w-full flex-col justify-between gap-8 min-[950px]:flex-row min-[950px]:gap-22 min-[950px]:px-32">
        <div className="flex h-full flex-1 items-start justify-center gap-4 min-[950px]:justify-start">
          <div className="flex gap-2">
            <span className="fi fi-es"></span>
            <p>Spain</p>
          </div>

          <div className="flex gap-2">
            <Globe />
            <p>Global</p>
          </div>
        </div>

        <div className="flex gap-22 max-[950px]:hidden">
          {FOOTER_SECTIONS.map((section: FooterSection, index: number) => (
            <div
              key={index}
              className="flex h-full flex-col items-start justify-start gap-4"
            >
              <h5 className="text-white/60">
                {t(`footer.${section.titleKey}.title`)}
              </h5>
              {section.linkKeys.map((linkKey: string) => (
                <p key={linkKey}>
                  {t(`footer.${section.titleKey}.${linkKey}`)}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center min-[950px]:hidden">
          <Accordion type="multiple" className="w-full">
            {FOOTER_SECTIONS.map((section: FooterSection, index: number) => (
              <AccordionItem key={index} value={`${index}`}>
                <AccordionTrigger>
                  {t(`footer.${section.titleKey}.title`)}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {section.linkKeys.map((linkKey: string) => (
                    <p key={linkKey}>
                      {t(`footer.${section.titleKey}.${linkKey}`)}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <PortiqoLogo className="w-full max-w-[1400px]" />
    </div>
  );
};
