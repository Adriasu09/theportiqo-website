export interface CarouselItem {
  urlGif: string;
  urlVideo: string;
  titleKey: string;
}

export interface BenefitCard {
  titleKey: string;
  justify?: "start" | "end";
  descriptionKey?: string;
  isAccented?: boolean;
  className?: string;
}

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}