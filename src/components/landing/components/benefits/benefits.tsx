import { BENEFITS_LIST } from "../../constants/landing.constants";
import { BenefitCard } from "../../models/landing.models";
import { BenefitsCard } from "./benefits-card";

export const Benefits = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
      {BENEFITS_LIST.map((benefit: BenefitCard, index: number) => (
        <BenefitsCard
          key={benefit.titleKey}
          titleKey={benefit.titleKey}
          justify={index % 2 === 0 ? "end" : "start"}
          descriptionKey={benefit.descriptionKey}
          isAccented={benefit.isAccented}
        />
      ))}
    </div>
  );
};
