import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PortiqoLogo from "@/src/assets/imgs/logos/portiqo/portiqo-white.svg";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FOOTER_SECTIONS } from "../constants/footer.constants";
import { FooterSection } from "../types/footer.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserPreferencesStore } from "@/src/store/user-preferences.store";
import { MenuItem } from "@/src/components/shared/types/menu.types";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useUserPreferencesStore();

  const languageOptions: MenuItem<"en" | "es">[] = [
    { labelKey: "english", value: "en" },
    { labelKey: "spanish", value: "es" },
  ];

  const handleLanguageChange = (lang: "en" | "es") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-18 bg-qo-gray-900 px-28 py-16 text-white">
      <div className="flex w-full flex-col justify-between gap-8 min-[950px]:flex-row min-[950px]:gap-22 min-[1194px]:px-32">
        <div className="flex h-full flex-1 items-start justify-center gap-4 min-[950px]:justify-start">
          <div className="flex gap-2">
            <span className="fi fi-es"></span>
            <p>Spain</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer gap-2">
                <Globe />
                <p>{t(`global.label.${language}`)}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={language}>
                {languageOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleLanguageChange(option.value)}
                  >
                    <div className="flex gap-5">
                      <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full">
                        <span
                          className={`fi fi-${option.value === "en" ? "gb" : option.value}`}
                          style={{
                            width: "20px",
                            height: "20px",
                            transform: "scale(1.30)",
                          }}
                        ></span>
                      </div>
                      {t(`global.label.${option.labelKey}`)}
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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

      <img
        src={PortiqoLogo}
        alt="Portiqo Logo"
        className="w-full max-w-[1200px]"
      />
    </div>
  );
};
