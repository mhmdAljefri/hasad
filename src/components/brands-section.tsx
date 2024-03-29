import { Heading } from "./ui/heading";
import Image from "next/image";
import Arrow from "./ui/arrow";
import dynamic from "next/dynamic";
import { BrandsSectionEntry } from "@/lib/contentful";

const FadeUp = dynamic(() => import("@/components/fade-up"), { ssr: false });

export function BrandsSection({ content }: { content: BrandsSectionEntry }) {
  const brands = content.fields.brands;

  const carouselSlides = [...brands, ...brands, ...brands];

  return (
    <section className="overflow-hidden pb-8 lg:pt-28">
      <FadeUp className="flex justify-center mb-8">
        <Heading centered className="text-center max-w-md capitalize">
          {content.fields.title}
        </Heading>
      </FadeUp>

      <div className="container">
        <p className="max-w-3xl mx-auto mb-20 text-center">
          {content.fields.content}
        </p>
      </div>

      <div dir="rtl" className="animate-carousel flex lg:gap-1 lg:mb-2">
        {carouselSlides.map(
          (
            {
              // @ts-ignore
              fields: { image },
            },
            idx
          ) => (
            <div className="relative basis-1/4 shrink-0 lg:basis-1/6" key={idx}>
              <Image
                className="object-contain w-full"
                src={
                  image?.fields.file?.url
                    ? "https:" + image.fields.file?.url
                    : "/images/hero-section.svg"
                }
                width={200}
                height={200}
                alt="brand"
              />
            </div>
          )
        )}
      </div>
      <div dir="rtl" className="animate-carousel-reverse flex lg:gap-1">
        {carouselSlides.map(
          (
            {
              // @ts-ignore
              fields: { image },
            },
            idx
          ) => (
            <div
              className="relative aspect-square basis-1/4 shrink-0 lg:basis-1/6"
              key={idx}
            >
              <Image
                className="object-contain w-full"
                src={
                  image?.fields.file?.url
                    ? "https:" + image.fields.file?.url
                    : "/images/hero-section.svg"
                }
                width={200}
                height={200}
                priority
                alt="brand"
              />
            </div>
          )
        )}
      </div>

      <div className="container flex justify-end animate-ping-pong-y">
        <Arrow width={80} height={80} className="mt-32" />
      </div>
    </section>
  );
}
