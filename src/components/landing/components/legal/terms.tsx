import { LegalHero } from "./components/legal-hero";
import { LEGAL_TERMS_SECTION_KEYS } from "./constants/legal.constants";
import { LegalSectionList } from "./components/legal-section-list";

export const TermsPage = () => {

  return (
    <div className="flex h-full w-full flex-col gap-20 pb-20">
      <LegalHero titlekey="terms.title" />

      <LegalSectionList page="terms" sectionKeys={LEGAL_TERMS_SECTION_KEYS} />
    </div>
  );
};
