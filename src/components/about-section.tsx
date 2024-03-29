import Arrow from "./ui/arrow";
import { cn } from "@/lib/utils";
import useTranslation from "next-translate/useTranslation";
import { Heading } from "./ui/heading";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { AboutSectionEntry, getEntryField } from "@/lib/contentful";

export default function AboutSection({
  content,
}: {
  content: AboutSectionEntry;
}) {
  const { width } = useWindowSize();

  const isBigScreen = width && width >= 768;

  return (
    <section id="about" className="py-12">
      <div className="container">
        <div className="flex justify-end animate-ping-pong-y">
          <Arrow width={80} height={80} className="sm:mt-32 me-8 sm:me-0" />
        </div>
        <Heading className="mb-8 max-w-72 lg:mb-16 uppercase">
          {content.fields.title}
        </Heading>

        {isBigScreen ? (
          <BigView content={content} />
        ) : (
          <MobileView content={content} />
        )}
      </div>
    </section>
  );
}

function MobileView({ content }: { content: AboutSectionEntry }) {
  const { lang } = useTranslation("common");

  return (
    <Carousel opts={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
      <CarouselContent className="gap-2">
        {content.fields?.aboutCards?.map(
          (
            {
              // @ts-ignore
              fields: { title, content, icon },
            },
            idx
          ) => (
            <CarouselItem key={idx}>
              <div className="p-[5vw] bg-primary rounded-3xl">
                <Image
                  width={60}
                  height={60}
                  src={"https:" + icon?.fields.file?.url}
                  alt={title}
                />
                <h3 className="text-secondary text-2xl font-bold my-4">
                  {title}
                </h3>
                <p
                  className={cn(
                    "text-primary-foreground text-justify mt-8 pb-16"
                  )}
                >
                  {content}
                </p>
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

function BigView({ content }: { content: AboutSectionEntry }) {
  const { t } = useTranslation("common");
  const [active, setActive] = useState(0);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative gap-4 px-12 flex">
        {content.fields?.aboutCards?.map(
          (
            {
              // @ts-ignore
              fields: { title, content, icon },
            },
            idx
          ) => {
            const isActive = idx === active;

            return (
              <m.div
                key={idx}
                layout
                animate={{
                  zIndex: isActive
                    ? content.fields?.aboutCards?.length
                    : active > idx
                    ? idx
                    : content.fields?.aboutCards?.length - idx,
                  width: isActive ? "70%" : "15%",
                }}
                transition={{ duration: 1, ...spring }}
                onMouseEnter={() => setActive(idx)}
                // onMouseLeave={() => setActive(0)}
                className={cn("p-14 rounded-3xl h-96 mb-28 overflow-hidden", {
                  "flex relative pe-4 bg-primary": isActive,
                  "bg-secondary flex justify-center shadow-lg": idx !== active,
                })}
              >
                {isActive && (
                  <m.div
                    initial={{ width: "0%", opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    className="overflow-hidden"
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="px-8">
                      <Image
                        width={60}
                        height={60}
                        src={"https:" + icon?.fields.file.url}
                        alt={title}
                      />
                      <h3 className="text-secondary text-3xl uppercase font-bold my-4">
                        {t(title)}
                      </h3>
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <p
                          className={cn(
                            "text-primary-foreground line-clamp-3 text-justify mt-8"
                          )}
                        >
                          {t("ceoWord")}
                        </p>
                      </m.div>
                    </div>
                  </m.div>
                )}

                <button
                  className={cn(
                    "text-primary-foreground cursor-pointer -rotate-90 z-10 top-0 bottom-0 end-0 flex items-center",
                    { "h-full text-primary-foreground ": !isActive }
                  )}
                >
                  <h3 className="font-bold text-xl md:text-2xl lg:text-4xl text-nowrap text-center">
                    {t(title)}
                  </h3>
                </button>
              </m.div>
            );
          }
        )}
      </div>
    </LazyMotion>
  );
}
