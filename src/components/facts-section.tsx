import useTranslation from "next-translate/useTranslation";
import React from "react";
import { CounterAnimator } from "./counter-animator";
import dynamic from "next/dynamic";

const FadeUp = dynamic(() => import("@/components/fade-up"), { ssr: false });

export default function FactsSection() {
  const { t } = useTranslation("common");

  return (
    <section>
      <div className="lg:pb-40 pt-40 container mx-auto">
        <FadeUp>
          <h3 className="font-bold ltr:tracking-widest uppercase text-center md:text-3xl lg:text-5xl">
            {t("Facts About Our Company")}
          </h3>
        </FadeUp>

        <div className="grid grid-cols-2 gap-6 md:gap-2 md:flex justify-evenly py-20">
          {(t("facts", null, { returnObjects: true }) as any[]).map(
            ({ value, type, duration }) => {
              const [number, letter] = `${value}`.split(" ");
              return (
                <FadeUp className="text-center" key={type + value}>
                  <p
                    dir="rtl"
                    className="font-bold text-6xl 2xl:text-[5.625rem]"
                  >
                    <span className="font-bold text-secondary text-3xl lg:text-5xl">
                      +
                    </span>
                    <CounterAnimator duration={duration} target={+number} />
                    {letter}
                  </p>

                  <h5 className="text-secondary text-xl lg:text-4xl">{type}</h5>
                </FadeUp>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
