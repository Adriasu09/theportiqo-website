import { useState } from "react";
import { CarouselItem } from "../models/carouset.models";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  items: CarouselItem[];
};

export const Carousel = ({ items }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { t } = useTranslation();

  const goPreviousSlide = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goNextSlide = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-4">
        <ChevronLeft
          className={`${currentIndex === 0 && "opacity-25"} cursor-pointer`}
          onClick={goPreviousSlide}
        />

        <div className="h-[300px] w-[300px] flex sm:h-[500px] sm:w-[500px] overflow-hidden">
          {items.map((item: CarouselItem) => (
            <video
              key={item.titleKey}
              src={item.url}
              autoPlay
              loop
              muted
              playsInline
              style={{
                translate: `${-100 * currentIndex}%`,
                transition: "translate 300ms ease-in-out",
              }}
            />
          ))}
        </div>

        <ChevronRight
          className={`${currentIndex >= items.length - 1 && "opacity-25"} cursor-pointer`}
          onClick={goNextSlide}
        />
      </div>

      <p>{t(`global.label.${items[currentIndex].titleKey}`)}</p>
    </div>
  );
};
