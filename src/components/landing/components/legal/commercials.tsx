import { LegalHero } from "./components/legal-hero";
import { COMMERCIAL_SECTION_KEYS } from "./constants/legal.constants";
import { LegalSectionList } from "./components/legal-section-list";

export const CommercialsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-20 pb-20">
      <LegalHero titlekey="commercials.title" />

      <LegalSectionList
        page="commercials"
        sectionKeys={COMMERCIAL_SECTION_KEYS}
      />
    </div>
  );
};
