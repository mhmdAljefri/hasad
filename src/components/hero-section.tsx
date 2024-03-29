import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "./ui/carousel";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useWindowSize } from "@uidotdev/usehooks";

export default function HeroSection() {
  const { lang } = useTranslation("common");
  const { width } = useWindowSize();

  return (
    <section className="relative">
      <Carousel
        opts={{
          direction: lang === "ar" ? "rtl" : "ltr",
          loop: true,
        }}
      >
        <CarouselContent className="rtl:-me-4 ltr:-ms-4">
          <CarouselItem className="relative aspect-video w-full flex">
            <Image
              priority
              src="/hero-section/1.png"
              className="object-cover w-full h-full"
              width={width || 500}
              height={width || 500}
              alt="hero"
            />
          </CarouselItem>
          <CarouselItem className="relative aspect-video w-full flex">
            <Image
              src="/hero-section/2.png"
              className="object-cover w-full h-full"
              width={width || 500}
              height={width || 500}
              alt="hero"
            />
          </CarouselItem>
        </CarouselContent>
        <div className="absolute z-10 bottom-0 w-full">
          <div className="container flex justify-end mb-2 md:mb-8">
            <CarouselDots />
          </div>
        </div>
      </Carousel>
    </section>
  );
}
