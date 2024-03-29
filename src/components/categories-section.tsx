import React from "react";
import { Heading } from "./ui/heading";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Arrow from "./ui/arrow";
import dynamic from "next/dynamic";
import { CategoriesSectionEntry } from "@/lib/contentful";

const FadeUp = dynamic(() => import("@/components/fade-up"), { ssr: false });

export default function CategoriesSection({
  content,
}: {
  content: CategoriesSectionEntry;
}) {
  return (
    <section id="categories" className="container pb-20 lg:pb-28">
      <FadeUp>
        <Heading>{content.fields.title}</Heading>
      </FadeUp>

      <div className="flex flex-wrap gap-4 max-w-4xl mx-auto lg:gap-8 mt-16">
        {content.fields.categories?.map(
          (
            {
              // @ts-ignore
              fields: { name, image },
            },
            idx
          ) => (
            <FadeUp
              key={idx}
              className="flex-auto flex px-5 rounded-[1.5rem] gap-4 py-6 bg-primary text-primary-foreground"
              transition={{ delay: idx * 0.2 }}
            >
              <Image
                src={
                  image?.fields.file?.url
                    ? "https:" + image.fields.file?.url
                    : "/images/hero-section.svg"
                }
                alt={name}
                width={60}
                height={60}
              />
              <div>
                <span className="inline-block w-8 h-1 bg-primary-foreground"></span>
                <div className="text-xl font-bold uppercase">{name}</div>
              </div>
            </FadeUp>
          )
        )}
      </div>

      <Arrow width={80} height={80} className="mt-32 animate-ping-pong-y" />
    </section>
  );
}
