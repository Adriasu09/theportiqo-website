import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./benefits-card.css";
import { BenefitCard } from "@/src/components/landing/types/landing.types";

export const BenefitsCard = ({
  titleKey,
  justify = "end",
  descriptionKey,
  isAccented = false,
  className = "",
}: BenefitCard) => {
  const { t } = useTranslation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const title = t(`landing.benefits.${titleKey}`);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate when card enters viewport (starts at bottom of screen)
      const startTrigger = windowHeight;
      const endTrigger = windowHeight * 0.3; // Ends when card is 30% from top

      // Progress from 0 to 1 as card moves up
      const scrollRange = startTrigger - endTrigger;
      const currentPosition = rect.bottom;
      const rawProgress = Math.max(
        0,
        Math.min(1, (startTrigger - currentPosition) / scrollRange)
      );

      // Speed up the animation by multiplying the progress
      const progress = Math.min(1, rawProgress * 1.7);

      setScrollProgress(progress);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center ${justify === "start" ? "justify-start" : "justify-end"} ${className}`}
    >
      <div
        ref={cardRef}
        className={`flex w-full max-w-[380px] flex-col items-start justify-end gap-2 rounded-qo-lg p-4 md:min-h-96 ${isAccented && "min-h-96 bg-qo-brand-100"} ${isAccented && "relative overflow-hidden"}`}
      >
        <h2
          className={`font-accent whitespace-pre-line ${isAccented ? "text-accent-4xl md:text-accent-2xl text-qo-brand-500" : "text-accent-2xl"}`}
          style={
            isAccented
              ? {
                  transform: `translateY(${-360 * (1 - scrollProgress)}px)`,
                  opacity: scrollProgress,
                  transition: "none",
                }
              : undefined
          }
        >
          {title}
        </h2>
        {descriptionKey && <p>{t(`landing.benefits.${descriptionKey}`)}</p>}
      </div>
    </div>
  );
};
