import DistributionSection from "@/components/distribution-section";
import GoalsSection from "@/components/goals-section";
import { IBM_Plex_Sans_Arabic as Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";
import { BrandsSection } from "@/components/brands-section";
import CategoriesSection from "@/components/categories-section";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import Arrow from "@/components/ui/arrow";
import FactsSection from "@/components/facts-section";
import { NextSeo } from "next-seo";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  AboutSectionEntry,
  BrandsSectionEntry,
  CategoriesSectionEntry,
  DistributionNetworksEntry,
  GoalsSectionEntry,
  SystemsSectionEntry,
  getAboutSection,
  getBrandsSection,
  getCategoriesSection,
  getDistributionNetworksSection,
  getGoalsSection,
  getSystemsSection,
} from "@/lib/contentful";

const FadeUp = dynamic(() => import("@/components/fade-up"), { ssr: false });

const inter = Sans({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const getStaticProps: GetStaticProps<{
  aboutSectionContent: AboutSectionEntry;
  goalsSectionContent: GoalsSectionEntry;
  systemsSectionContent: SystemsSectionEntry;
  distributionNetworksSectionContent: DistributionNetworksEntry;
  brandsSectionContent: BrandsSectionEntry;
  categoriesSectionContent: CategoriesSectionEntry;
}> = async ({ locale = "ar" }) => {
  const [
    aboutSectionContent,
    goalsSectionContent,
    systemsSectionContent,
    distributionNetworksSectionContent,
    brandsSectionContent,
    categoriesSectionContent,
  ] = await Promise.all([
    getAboutSection(locale),
    getGoalsSection(locale),
    getSystemsSection(locale),
    getDistributionNetworksSection(locale),
    getBrandsSection(locale),
    getCategoriesSection(locale),
  ]);

  return {
    props: {
      aboutSectionContent,
      goalsSectionContent,
      systemsSectionContent,
      distributionNetworksSectionContent,
      brandsSectionContent,
      categoriesSectionContent,
    },
  };
};

export default function Home({
  aboutSectionContent,
  goalsSectionContent,
  systemsSectionContent,
  distributionNetworksSectionContent,
  brandsSectionContent,
  categoriesSectionContent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, lang } = useTranslation("common");

  const openingInView = useInView({
    threshold: 0,
    rootMargin: "-150px",
  });

  const closingInView = useInView({
    threshold: 0,
  });

  return (
    <>
      <NextSeo
        title={lang === "ar" ? "شركة عبدالله باوزير" : "Abduallah Bawazir"}
        description={lang === "ar" ? "" : ""}
      />
      <main className={inter.className}>
        <Header />
        <HeroSection />
        <AboutSection content={aboutSectionContent} />
        <div ref={openingInView.ref}>
          <GoalsSection
            content={goalsSectionContent}
            showSmoke={openingInView.inView && !closingInView.inView}
          />
        </div>

        <div ref={closingInView.ref}>
          {[
            {
              title: "How can we help you",
              image: "/images/people-1.png",
              path: "/",
            },
            {
              title: "Workflow methods",
              image: "/images/people-2.png",
              path: "/",
            },
          ].map(({ title, image, path }, idx) => (
            <section
              key={title}
              className={cn(
                "flex container flex-col-reverse sm:flex-row-reverse",
                { "sm:flex-row": idx % 2 === 0 }
              )}
            >
              <div className="sm:w-1/2 flex justify-center px-4 items-center gap-2">
                <FadeUp>
                  <div className="bg-primary text-primary-foreground flex justify-center w-full p-5 sm:py-16 lg:py-32 py-10 rounded-3xl">
                    <Link
                      href={path}
                      className="text-2xl sm:text-3xl md:text-4xl lg:leading-[4.4rem] lg:px-20 lg:ms-4 lg:text-6xl block font-bold"
                    >
                      {t(title)}
                      <Image
                        alt="arrow"
                        className="inline-block ms-4 rtl:rotate-180"
                        src="/images/svg-03.svg"
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                </FadeUp>
              </div>

              <FadeUp className="sm:flex-auto sm:mx-8 lg:mx-12 aspect-square relative">
                <Image
                  src={image}
                  alt="people"
                  fill
                  className="object-contain mx-auto"
                />
              </FadeUp>
            </section>
          ))}
        </div>

        <section id="systems" className="relative py-40">
          <Image
            src="/tech/bg.png"
            fill
            alt="hero"
            className="object-contain z-0 object-left-bottom"
          />

          <div className="relative container z-10">
            <FadeUp>
              <Heading>{systemsSectionContent.fields.title}</Heading>
            </FadeUp>

            <p className="relative z-10 mt-12 2xl:max-w-5xl lg:text-xl !leading-[2rem] text-justify lg:px-8 mx-auto">
              <FadeUp>{systemsSectionContent.fields.content}</FadeUp>

              <FadeUp>
                <span className="flex text-secondary justify-center my-8">
                  <Link
                    className="flex items-center uppercase lg:text-2xl ltr:tracking-widest gap-2"
                    href="/"
                  >
                    {t("See More")}
                    <Arrow
                      width={20}
                      height={20}
                      className="rotate-90 ltr:-rotate-90"
                    />
                  </Link>
                </span>
              </FadeUp>
            </p>
          </div>

          <div className="container flex justify-end animate-ping-pong-y">
            <Arrow width={80} height={80} className="mt-16" />
          </div>
        </section>

        <DistributionSection content={distributionNetworksSectionContent} />

        <CategoriesSection content={categoriesSectionContent} />

        <BrandsSection content={brandsSectionContent} />

        <FactsSection />

        {/* <section>
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-20 overflow-hidden pb-20">
            <div className="flex flex-col gap-11 items-end">
              <Image
                src="/images/pattern-long.jpg"
                className="w-auto h-20 2xl:h-32"
                alt="pattern"
                width={807}
                height={172}
              />
              <div className="animate-ping-pong">
                <Arrow
                  width={56}
                  height={56}
                  className="rotate-90 w-10 md:w-14"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <FadeUp>
                <h3 className="text-6xl 2xl:text-[5.625rem] font-bold">
                  {t("Company Owner")}
                </h3>
                <p className="text-secondary text-xl xl:text-4xl mt-4">
                  {t("CEO")}
                </p>
              </FadeUp>
              <FadeUp transition={{ delay: 0.2 }}>
                <p className="text-lg max-w-md">{t("ceoWord")}</p>
              </FadeUp>
            </div>
          </div>
        </section> */}

        <footer className="bg-primary border-t-4 border-t-secondary text-primary-foreground py-6">
          <div className="container ">
            <div className="flex flex-col-reverse justify-center items-center text-center sm:text-start sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h4 className="font-bold mb-2 mt-8">{t("Contact us")}</h4>
                <span className="inline-block w-6 h-0.5 bg-secondary"></span>

                <div className="flex stroke-primary items-center gap-3">
                  {[
                    { image: "/social/x.png", link: "" },
                    { image: "/social/instagram.png", link: "" },
                    { image: "/social/linkedin.png", link: "" },
                    { image: "/social/facebook.png", link: "" },
                    { image: "/social/tiktok.png", link: "" },
                  ].map(({ image, link }, idx) => (
                    <a
                      href={link}
                      target="_blank"
                      className="bg-secondary w-8 h-8 rounded-full flex justify-center items-center"
                      key={idx}
                    >
                      <Image
                        className="invert object-contain"
                        src={image}
                        alt={link}
                        width={15}
                        height={15}
                      />
                    </a>
                  ))}
                </div>

                <a
                  href="mail:sales@abawazir.com"
                  className="uppercase mt-4 inline-block"
                >
                  sales@abawazir.com
                </a>
              </div>
              <a
                className="relative text-xs ltr:tracking-widest"
                href="mailto:sales@AbawazIr.com"
              >
                <Image
                  src="/logo.png"
                  className="w-32 sm:w-40 lg:w-80"
                  width={350}
                  height={200}
                  alt="logo"
                />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
