export interface CarouselItem {
  url: string;
  titleKey: string;
}

export interface BenefitCard {
  titleKey: string;
  justify?: "start" | "end";
  descriptionKey?: string;
  isAccented?: boolean;
}