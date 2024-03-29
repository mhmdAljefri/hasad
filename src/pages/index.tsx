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
  FactsSectionEntry,
  GoalsSectionEntry,
  HeroSectionEntry,
  SystemsSectionEntry,
  getAboutSection,
  getBrandsSection,
  getCategoriesSection,
  getDistributionNetworksSection,
  getFactsSection,
  getGoalsSection,
  getHeroSection,
  getSystemsSection,
} from "@/lib/contentful";
import ContactForm from "@/components/contact-form";

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
  heroSectionContent: HeroSectionEntry;
  factsSectionContent: FactsSectionEntry;
}> = async ({ locale = "ar" }) => {
  const [
    aboutSectionContent,
    goalsSectionContent,
    systemsSectionContent,
    distributionNetworksSectionContent,
    brandsSectionContent,
    categoriesSectionContent,
    heroSectionContent,
    factsSectionContent,
  ] = await Promise.all([
    getAboutSection(locale),
    getGoalsSection(locale),
    getSystemsSection(locale),
    getDistributionNetworksSection(locale),
    getBrandsSection(locale),
    getCategoriesSection(locale),
    getHeroSection(locale),
    getFactsSection(locale),
  ]);

  return {
    props: {
      aboutSectionContent,
      goalsSectionContent,
      systemsSectionContent,
      distributionNetworksSectionContent,
      brandsSectionContent,
      categoriesSectionContent,
      heroSectionContent,
      factsSectionContent,
    },
    revalidate: 60 * 5,
  };
};

export default function Home({
  aboutSectionContent,
  goalsSectionContent,
  brandsSectionContent,
  heroSectionContent,
  factsSectionContent,
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
        title={lang === "ar" ? "شركة حصاد القابضة" : "Hasad Holding Company"}
        description={lang === "ar" ? "" : ""}
      />
      <main className={inter.className}>
        <Header />
        <HeroSection content={heroSectionContent} />
        <AboutSection content={aboutSectionContent} />
        <div ref={openingInView.ref}>
          <GoalsSection
            content={goalsSectionContent}
            showSmoke={openingInView.inView && !closingInView.inView}
          />
        </div>

        <BrandsSection content={brandsSectionContent} />

        <FactsSection content={factsSectionContent} />

        <footer className="bg-primary border-t-4 border-t-secondary text-primary-foreground py-6">
          <div className="container ">
            <ContactForm />
            <div className="flex mt-4 flex-col-reverse justify-center items-center text-center sm:text-start sm:flex-row sm:justify-between sm:items-center">
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
                  href="mail:sales@hasad.com"
                  className="uppercase mt-4 inline-block"
                >
                  sales@hasad.com
                </a>
              </div>
              <a
                className="relative text-xs ltr:tracking-widest"
                href="mailto:sales@hasad.com"
              >
                <Image
                  src="/logo-white.png"
                  width={80}
                  height={50}
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
