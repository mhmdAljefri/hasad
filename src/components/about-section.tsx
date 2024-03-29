import Arrow from "./ui/arrow";
import { cn } from "@/lib/utils";
import useTranslation from "next-translate/useTranslation";
import { Heading } from "./ui/heading";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { AboutSectionEntry } from "@/lib/contentful";

export default function AboutSection({
  content,
}: {
  content: AboutSectionEntry;
}) {
  return (
    <section id="about" className="py-12">
      <div className="container">
        <div className="flex justify-end animate-ping-pong-y">
          <Arrow width={80} height={80} className="sm:mt-32 me-8 sm:me-0" />
        </div>
        <Heading className="mb-8 max-w-72 lg:mb-16 uppercase">
          {content.fields.title}
        </Heading>

        <MobileView content={content} />
      </div>
    </section>
  );
}

function MobileView({ content }: { content: AboutSectionEntry }) {
  const { lang } = useTranslation("common");

  return (
    <Carousel opts={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
      <CarouselContent>
        {content.fields?.aboutCards?.map(
          (
            {
              // @ts-ignore
              fields: { title, content, icon },
            },
            idx
          ) => (
            <CarouselItem className="md:basis-1/2 xl:basis-1/3 my-4" key={idx}>
              <div className="p-[5vw] bg-slate-50 shadow-lg rounded-3xl">
                <Image
                  width={60}
                  height={60}
                  src={"https:" + icon?.fields.file?.url}
                  alt={title}
                />
                <h3 className="text-2xl text-secondary font-bold my-4">
                  {title}
                </h3>
                <p className={cn("text-justify mt-8 pb-16")}>{content}</p>
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>

      <CarouselPrevious className="md:hidden" />
      <CarouselNext className="md:hidden" />
    </Carousel>
  );
}

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
