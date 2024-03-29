import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import useTranslation from "next-translate/useTranslation";
import { Heading } from "./ui/heading";
import Arrow from "./ui/arrow";
import dynamic from "next/dynamic";
import { DistributionNetworksEntry } from "@/lib/contentful";

const FadeUp = dynamic(() => import("@/components/fade-up"), { ssr: false });

export default function DistributionSection({
  content,
}: {
  content: DistributionNetworksEntry;
}) {
  const { t, lang } = useTranslation("common");

  return (
    <section id="dist" className="py-40">
      <div className="container">
        <div className="grid lg:flex items-center gap-8">
          <FadeUp>
            <Heading>{t("DISTRIBUTION NETWORK")}</Heading>
          </FadeUp>
          <FadeUp>
            <p className="lg:max-w-sm">{t("ceoWord")}</p>
          </FadeUp>
        </div>
      </div>

      <div className="overflow-auto">
        <div dir="rtl" className="flex gap-2 mt-16 animate-carousel-reverse">
          {[
            ...content.fields.networks,
            ...content.fields.networks,
            ...content.fields.networks,
            ...content.fields.networks,
          ].map(
            (
              {
                // @ts-ignore
                fields: { title, image },
              },
              index
            ) => (
              <div
                key={index}
                className="p-2 basis-1/2 md:basis-1/4 lg:basis-1/4 shrink-0"
              >
                <Card className="border-0 shadow-none">
                  <CardHeader className="py-2 px-0">
                    <div className="flex gap-1 text-xl uppercase font-semibold items-center">
                      {title}
                      <Arrow
                        width={20}
                        height={20}
                        className="text-secondary rotate-90"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex aspect-video relative items-center justify-center">
                    <Image
                      src={
                        image?.fields.file?.url
                          ? "https:" + image.fields.file?.url
                          : "/images/hero-section.svg"
                      }
                      className="rounded-xl object-cover"
                      fill
                      priority
                      alt={title[(lang || "ar") as "ar" | "en"]}
                    />
                  </CardContent>
                </Card>
              </div>
            )
          )}
        </div>
      </div>

      <div className="container flex justify-end">
        <Arrow width={80} height={80} className="mt-16 animate-ping-pong-y" />
      </div>
    </section>
  );
}
