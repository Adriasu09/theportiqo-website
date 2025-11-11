import { Button } from "@/components/ui/button";
import { PARTNERS_LOGOS } from "../constants/landing.constants";

export const Partners = () => {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h2 className="font-accent text-5xl">
        Invest with the peace of mind of global banking
      </h2>

      <div className="flex items-center gap-8 py-2">
        {PARTNERS_LOGOS.map((item: { url: string; height: number }) => (
          <img
            key={item.url}
            src={item.url}
            alt="partner-logo"
            className={`h-${item.height} w-auto object-contain`}
          />
        ))}
      </div>

      <p>
        "Knowing that my investments are backed by global leaders gives me
        complete confidence to keep growing."— Ana M.,
      </p>

      <Button variant={"secondary"}>Start investing right now</Button>
    </div>
  );
};
