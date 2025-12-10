import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PortiqoLogo from "@/src/assets/imgs/logos/portiqo/portiqo-white.svg";
import { useTranslation } from "react-i18next";
import { FOOTER_SECTIONS } from "../../constants/footer.constants";
import { FooterSection, SectionChild } from "../../types/footer.types";
import { useNavigate } from "@tanstack/react-router";
import { LanguageSelector } from "./language-selector";

export const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFooterItemClick = (item: SectionChild) => {
    if (item.action) {
      item.action();
    } else if (item.url) {
      navigate({ to: item.url });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-18 bg-qo-gray-900 px-10 py-16 text-white md:px-28">
      <div className="flex w-full flex-col justify-between gap-8 min-[950px]:flex-row min-[950px]:gap-22 min-[1194px]:px-32">
        <div className="flex h-full flex-1 items-start justify-center gap-4 min-[950px]:justify-start">
          <div className="flex gap-2">
            <span className="fi fi-es"></span>
            <p>{t(`global.country.spain`)}</p>
          </div>

          <LanguageSelector />
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
              {section.children.map((child: SectionChild) => (
                <p
                  key={child.labelKey}
                  onClick={() => handleFooterItemClick(child)}
                  className="cursor-pointer hover:underline"
                >
                  {t(`footer.${section.titleKey}.${child.labelKey}`)}
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
                  {section.children.map((child: SectionChild) => (
                    <p
                      onClick={() => handleFooterItemClick(child)}
                      key={child.labelKey}
                      className="cursor-pointer hover:underline"
                    >
                      {t(`footer.${section.titleKey}.${child.labelKey}`)}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <img
        src={PortiqoLogo}
        alt="Portiqo Logo"
        className="w-full max-w-[1200px]"
      />
    </div>
  );
};
