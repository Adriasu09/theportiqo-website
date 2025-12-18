import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CarouselItem } from "@/src/components/landing/types/landing.types";

type Props = {
  items: CarouselItem[];
};

export const Carousel = ({ items }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

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

  // Touch events for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const distance = e.touches[0].clientX - startX;
    setDragDistance(distance);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = 50; // minimum pixels to change slide

    if (dragDistance > threshold) {
      // Dragged to the right -> previous slide
      goPreviousSlide();
    } else if (dragDistance < -threshold) {
      // Dragged to the left -> next slide
      goNextSlide();
    }

    setIsDragging(false);
    setDragDistance(0);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Detect horizontal scroll (deltaX) or vertical scroll with shift
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();

        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;

        if (delta > 0) {
          // Scroll to the right -> next slide
          goNextSlide();
        } else if (delta < 0) {
          // Scroll to the left -> previous slide
          goPreviousSlide();
        }
      }
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentIndex, items.length]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      ref={carouselRef}
    >
      <div className="flex items-center justify-center gap-4">
        <ChevronLeft
          className={`${currentIndex === 0 && "opacity-25"} hidden cursor-pointer lg:block`}
          onClick={goPreviousSlide}
        />

        <div
          className="flex aspect-square w-full max-w-[500px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item: CarouselItem) => (
            <video
              key={item.titleKey}
              poster={item.urlGif}
              autoPlay
              loop
              muted
              playsInline
              style={{
                translate: `${-100 * currentIndex + (isDragging ? dragDistance / 5 : 0)}%`,
                transition: isDragging ? "none" : "translate 300ms ease-in-out",
                pointerEvents: "none", // prevent video interaction during drag
              }}
            >
              <source src={item.urlVideo} type="video/mp4" />
            </video>
          ))}
        </div>

        <ChevronRight
          className={`${currentIndex >= items.length - 1 && "opacity-25"} hidden cursor-pointer lg:block`}
          onClick={goNextSlide}
        />
      </div>

      <div className="flex w-full items-center justify-center gap-2 lg:hidden">
        {items.map((_, index) => (
          <div
            key={index}
            className={` ${index === currentIndex ? "w-6 bg-qo-gray-500" : "w-2 bg-qo-gray-300"} h-2 rounded-full transition-all`}
          ></div>
        ))}
      </div>
      <p className="hidden lg:block">
        {t(`global.label.${items[currentIndex].titleKey}`)}
      </p>
    </div>
  );
};
