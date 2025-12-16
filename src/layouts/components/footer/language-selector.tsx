import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/src/components/shared/types/menu.types";
import { useDeviceStore } from "@/src/store/device.store";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const { deviceLanguage, setDeviceLanguage} = useDeviceStore();

  const languageOptions: MenuItem<"en-US" | "es-ES">[] = [
    { labelKey: "english", value: "en-US" },
    { labelKey: "spanish", value: "es-ES" },
  ];

  const handleLanguageChange = (lang: "en-US" | "es-ES") => {
    setDeviceLanguage(lang, true);
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer gap-2">
          <Globe />
          <p>{t(`global.label.${deviceLanguage}`)}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={deviceLanguage}>
          {languageOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              onSelect={() => handleLanguageChange(option.value)}
            >
              <div className="flex gap-5">
                <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full">
                  <span
                    className={`fi fi-${option.value === "en-US" ? "gb" : "es"}`}
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
