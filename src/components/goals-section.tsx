"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { Heading } from "./ui/heading";
import Arrow from "./ui/arrow";
import { useQueue } from "@uidotdev/usehooks";
import { GoalsSectionEntry } from "@/lib/contentful";

const FadeUp = dynamic(() => import("./fade-up"), { ssr: false });
const DialogDrawer = dynamic(() => import("./dialog-drawer"), { ssr: false });

export default function GoalsSection({
  showSmoke = false,
  content,
}: {
  showSmoke?: boolean;
  content: GoalsSectionEntry;
}) {
  const { t } = useTranslation("common");
  const goals = t("goals", null, { returnObjects: true }) as {
    body: string;
    title: string;
    icon: string;
  }[];

  const [openedCardIndex, setOpenedCardIndex] = useState<
    null | (typeof goals)[0]
  >(null);

  return (
    <div className="relative">
      {showSmoke && (
        <div className="fixed z-10 w-full left-0 right-0 bottom-0 bg-gradient-to-t from-white from-0% via-white via-50% h-36"></div>
      )}
      <section className="flex relative flex-col sm:flex-row gap-4 container">
        <div className="sm:w-1/2">
          <div className="sticky top-28 start-0 justify-center flex flex-col gap-4">
            <FadeUp>
              <Heading className="xl:!text-9xl p-0 py-6" rotateLine={false}>
                {content.fields.title}
              </Heading>
            </FadeUp>
            <FadeUp>
              <p className="max-w-md text-lg text-justify">
                {content.fields.description}
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="py-10 sm:py-48 sm:w-1/2 flex items-end flex-col gap-4">
          {content.fields.goals?.map(
            (
              {
                // @ts-ignore
                fields: { content, icon, title },
              },
              index
            ) => (
              <FadeUp key={index} transition={{ delay: 0.2 * index }}>
                <Card className="shadow-md sm:max-w-sm px-4 pb-4 rounded-2xl border-gray-100">
                  <CardHeader>
                    <div className="flex justify-end">
                      <Image
                        alt={title}
                        width={120}
                        height={120}
                        src={"https:" + icon?.fields.file.url}
                        className="w-20 lg:w-28"
                      />
                    </div>
                    <h3 className="text-secondary text-xl md:text-2xl font-semibold">
                      {title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-6 text-justify">{content}</p>
                  </CardContent>
                  <CardFooter
                    className="text-secondary uppercase mt-8 ltr:tracking-widest"
                    onClick={() =>
                      setOpenedCardIndex({ body: content, icon, title })
                    }
                  >
                    <div className="flex justify-end gap-4 w-full">
                      {t("For More")}
                      <Arrow
                        width={18}
                        height={18}
                        className="rotate-90 aspect-square object-contain ltr:-rotate-90"
                      />
                    </div>
                  </CardFooter>
                </Card>
              </FadeUp>
            )
          )}

          <DialogDrawer
            body={openedCardIndex?.body}
            title={openedCardIndex?.title}
            open={openedCardIndex !== null}
            onOpenChange={(state) => !state && setOpenedCardIndex(null)}
          />
        </div>
      </section>
    </div>
  );
}
