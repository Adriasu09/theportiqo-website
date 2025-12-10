import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/src/components/shared/types/menu.types";
import { useUserPreferencesStore } from "@/src/store/user-preferences.store";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useUserPreferencesStore();

  const languageOptions: MenuItem<"en" | "es">[] = [
    { labelKey: "english", value: "en" },
    { labelKey: "spanish", value: "es" },
  ];

  const handleLanguageChange = (lang: "en" | "es") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
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
  );
};
