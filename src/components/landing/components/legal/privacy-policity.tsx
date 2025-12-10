import { LegalHero } from "./components/legal-hero";
import { LegalSectionList } from "./components/legal-section-list";
import { PRIVACY_POLICITY_SECTION_KEYS } from "./constants/legal.constants";

export const PrivacyPolicityPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-20 pb-20">
      <LegalHero titlekey="privacyPolicity.title" />

      <LegalSectionList
        page="privacyPolicity"
        sectionKeys={PRIVACY_POLICITY_SECTION_KEYS}
      />
    </div>
  );
};
