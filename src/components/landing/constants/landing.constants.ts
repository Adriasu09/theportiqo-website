import { BenefitCard, CarouselItem, FAQItem } from "../types/landing.types";
import houseAnimationGif from "@assets/videos/house-animated.gif";
import houseAnimationVideo from "@assets/videos/house-animated.webm";
import robotAnimationGif from "@assets/videos/robot-animated.gif";
import robotAnimationVideo from "@assets/videos/robot-animated.webm";
import windmillAnimationGif from "@assets/videos/windmill-animated.gif";
import windmillAnimationVideo from "@assets/videos/windmill-animated.webm";
import blackrockLogo from "@assets/imgs/logos/blackrock.png";
import fidelityLogo from "@assets/imgs/logos/fidelity.png";
import vanguardLogo from "@assets/imgs/logos/vanguard.png";

export const PARTNERS_LOGOS: { url: string; height: number }[] = [
  { url: blackrockLogo, height: 8 },
  { url: fidelityLogo, height: 10 },
  { url: vanguardLogo, height: 10 },
];

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    urlGif: houseAnimationGif,
    urlVideo: houseAnimationVideo,
    titleKey: "realState",
  },
  {
    urlGif: robotAnimationGif,
    urlVideo: robotAnimationVideo,
    titleKey: "technology",
  },
  {
    urlGif: windmillAnimationGif,
    urlVideo: windmillAnimationVideo,
    titleKey: "renewableEnergies",
  },
];

export const BENEFITS_LIST: BenefitCard[] = [
  {
    titleKey: "backedByExperts",
    descriptionKey: "backedByExpertsDescription",
    className: "order-1 md:order-none",
  },
  {
    titleKey: "experience",
    isAccented: true,
    className: "order-2 md:order-none",
  },
  {
    titleKey: "profitability",
    isAccented: true,
    className: "order-4 md:order-none",
  },
  {
    titleKey: "maximumProfitability",
    descriptionKey: "maximumProfitabilityDescription",
    className: "order-3 md:order-none",
  },
  {
    titleKey: "everythingClear",
    descriptionKey: "everythingClearDescription",
    className: "order-5 md:order-none",
  },
  {
    titleKey: "fees",
    isAccented: true,
    className: "order-6 md:order-none",
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    questionKey: "howDoIJoin",
    answerKey: "howDoIJoinRes",
  },
  {
    questionKey: "investmentFund",
    answerKey: "investmentFundRes",
  },
  {
    questionKey: "howMuch",
    answerKey: "howMuchRes",
  },
  {
    questionKey: "isEasyToTransferMoney",
    answerKey: "isEasyToTransferMoneyRes",
  },
  {
    questionKey: "whenCanIRecoverMyMoney",
    answerKey: "whenCanIRecoverMyMoneyRes",
  },
  {
    questionKey: "whyIsItBetter",
    answerKey: "whyIsItBetterRes",
  },
  {
    questionKey: "commissions",
    answerKey: "commissionsRes",
  },
];
