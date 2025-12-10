import { FooterSection } from "../types/footer.types";

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    titleKey: "support",
    children: [
      {
        labelKey: "contact",
        action: () => {
          window.location.href = "mailto:alguien@example.com";
        }
      },
    ],
  },
  {
    titleKey: "legal",
    children: [
      { labelKey: "privacyPolicity", url: "/landing/privacy-policity" },
      { labelKey: "commercialCommunication", url: "/landing/commercials" },
    ],
  },
];
