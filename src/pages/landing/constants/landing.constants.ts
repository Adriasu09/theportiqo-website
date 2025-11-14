import { BenefitCard, CarouselItem, FAQItem } from "../models/landing.models";
import houseAnimation from "@assets/videos/house-animated.webm";
import robotAnimation from "@assets/videos/robot-animated.webm";
import windmillAnimation from "@assets/videos/windmill-animated.webm";
import blackrockLogo from "@assets/imgs/logos/blackrock.png";
import fidelityLogo from "@assets/imgs/logos/fidelity.png";
import vanguardLogo from "@assets/imgs/logos/vanguard.png";

export const PARTNERS_LOGOS: { url: string; height: number }[] = [
  { url: blackrockLogo, height: 8 },
  { url: fidelityLogo, height: 10 },
  { url: vanguardLogo, height: 10 },
];

export const CAROUSEL_ITEMS: CarouselItem[] = [
  { url: houseAnimation, titleKey: "realState" },
  { url: robotAnimation, titleKey: "technology" },
  { url: windmillAnimation, titleKey: "renewableEnergies" },
];

export const BENEFITS_LIST: BenefitCard[] = [
  {
    titleKey: "backedByExperts",
    descriptionKey: "backedByExpertsDescription",
  },
  {
    titleKey: "experience",
    isAccented: true,
  },
  {
    titleKey: "profitability",
    isAccented: true,
  },
  {
    titleKey: "maximumProfitability",
    descriptionKey: "maximumProfitabilityDescription",
  },
  {
    titleKey: "everythingClear",
    descriptionKey: "everythingClearDescription",
  },
  {
    titleKey: "fees",
    isAccented: true,
  },
];

//TODO: define answers
export const FAQ_LIST: FAQItem[] = [
  {
    questionKey: "isSafe",
    answerKey: "",
  },
  {
    questionKey: "canWithdrawAnytime",
    answerKey: "",
  },
  {
    questionKey: "minimumInvestment",
    answerKey: "",
  },
  {
    questionKey: "fees",
    answerKey: "",
  }
];
