import useTranslation from "next-translate/useTranslation";
import React from "react";
import { CounterAnimator } from "./counter-animator";
import dynamic from "next/dynamic";
import { FactsSectionEntry } from "@/lib/contentful";

const FadeUp = dynamic(() => import("@/components/fade-up"), { ssr: false });

export default function FactsSection({
  content,
}: {
  content: FactsSectionEntry;
}) {
  return (
    <section>
      <div className="lg:pb-40 pt-40 container mx-auto">
        <FadeUp>
          <h3 className="font-bold ltr:tracking-widest uppercase text-center md:text-3xl lg:text-5xl">
            {content.fields.title}
          </h3>
        </FadeUp>

        <div className="grid grid-cols-2 gap-6 md:gap-2 md:flex justify-evenly py-20">
          {content.fields.numbers.map(
            (
              {
                // @ts-ignore
                fields,
              },
              idx
            ) => {
              return (
                <FadeUp className="text-center" key={idx}>
                  <p
                    dir="rtl"
                    className="font-bold text-6xl 2xl:text-[5.625rem]"
                  >
                    <span className="font-bold text-secondary text-3xl lg:text-5xl">
                      +
                    </span>
                    <CounterAnimator target={fields.number} />
                    {fields.letter}
                  </p>

                  <h5 className="text-secondary text-xl lg:text-4xl">
                    {fields.title}
                  </h5>
                </FadeUp>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
