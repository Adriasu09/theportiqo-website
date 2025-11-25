import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BenefitCard } from "../../models/landing.models";
import "./benefits-card.css";

export const BenefitsCard = ({
  titleKey,
  justify = "end",
  descriptionKey,
  isAccented = false,
  className = "",
}: BenefitCard) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const title = t(`landing.benefits.${titleKey}`);
  const words = title.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing after the first animation
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.7, // Triggers when 70% of the component is visible
        rootMargin: "0px 0px -50px 0px", // Adjust to trigger slightly earlier
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className={`flex items-center justify-${justify} ${className}`}>
      <div
        ref={cardRef}
        className={`flex w-full max-w-[380px] flex-col items-start justify-end gap-2 rounded-2xl p-4 md:min-h-96 ${isAccented && "min-h-96 bg-qo-brand-100"}`}
      >
        <h2
          className={`font-accent text-qo-h3 whitespace-pre-line ${isAccented && "text-qo-brand-500"}`}
        >
          {isAccented
            ? words.map((word, index) => (
                <span
                  key={index}
                  className={`mr-[0.25em] inline-block ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{
                    animationDelay: isVisible ? `${index * 0.1}s` : "0s",
                    animationFillMode: "both",
                  }}
                >
                  {word}
                </span>
              ))
            : title}
        </h2>
        {descriptionKey && <p>{t(`landing.benefits.${descriptionKey}`)}</p>}
      </div>
    </div>
  );
};
