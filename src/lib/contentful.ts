import type {
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  Locale,
} from "contentful";
import { createClient } from "contentful";

type AboutCardSkeleton = {
  contentTypeId: "aboutSection";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.Text;
    icon: EntryFieldTypes.AssetLink;
  };
};

type BrandsSkeleton = {
  contentTypeId: "brands";
  fields: {
    name: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
  };
};

type BrandsSectionSkeleton = {
  contentTypeId: "brandsSection";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.Text;
    brands: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<BrandsSkeleton>>;
  };
};

type NetworksSkeleton = {
  contentTypeId: "aboutSection";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
  };
};

type DistributionNetworksSkeleton = {
  contentTypeId: "distributionSection";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.Text;
    networks: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<NetworksSkeleton>
    >;
  };
};

type SystemsSectionSkeleton = {
  contentTypeId: "systemsSection";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.Text;
  };
};

type GoalsSectionSkeleton = {
  contentTypeId: "goalsSection";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    goals: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<AboutCardSkeleton>>;
  };
};
type CategoriesSectionSkeleton = {
  contentTypeId: "categoriesSection";
  fields: {
    title: EntryFieldTypes.Text;
    categories: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<BrandsSkeleton>
    >;
  };
};

type AboutSectionSkeleton = {
  contentTypeId: "aboutSection";
  fields: {
    title: EntryFieldTypes.Text;
    aboutCards: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<AboutCardSkeleton>
    >;
  };
};

type EnabledLocales = "en-US" | "ar";
export const getEntryField = <
  EntrySkeleton extends EntrySkeletonType,
  Locale extends EnabledLocales
>(
  locale: Locale,
  entry: Entry<EntrySkeleton, undefined, Locale>,
  fieldName: keyof Entry<EntrySkeleton, undefined, Locale>["fields"]
) => entry.fields[fieldName];

const client = () =>
  createClient({
    space: "m2jc5m311l0i",
    accessToken: "XPh1-niIcIfa94WQx-LKzr12SWop1Kyz2veW2kjObt4",
  });

export const getAboutSection = (locale: string) =>
  client().getEntry<AboutSectionSkeleton>("22zQ502F0TQz1ryEhPvHnc", { locale });

export const getGoalsSection = (locale: string) =>
  client().getEntry<GoalsSectionSkeleton>("6YwZATpAmtBYYdr6qvbYjK", { locale });

export const getSystemsSection = (locale: string) =>
  client().getEntry<SystemsSectionSkeleton>("1VCy08w9UGVMIJEFbHIVn7", {
    locale,
  });

export const getDistributionNetworksSection = (locale: string) =>
  client().getEntry<DistributionNetworksSkeleton>("3U96TZ4H2MBfl94Klpl05G", {
    locale,
  });

export const getCategoriesSection = (locale: string) =>
  client().getEntry<CategoriesSectionSkeleton>("7tfHAlh48Sl1Mab1zRuuTI", {
    locale,
  });

export const getBrandsSection = (locale: string) =>
  client().getEntry<BrandsSectionSkeleton>("76oRppdEFYAIPznI4Z0tqN", {
    locale,
  });
export const getHeroSection = (locale: string) =>
  client().getEntry<{
    contentTypeId: "heroSectionSlider";
    fields: {
      images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    };
  }>("7ygqx42z2METRTFsCIsI0p", {
    locale,
  });
export const getFactsSection = (locale: string) =>
  client().getEntry<{
    contentTypeId: "numbersTalksAboutUs";
    fields: {
      title: EntryFieldTypes.Text;
      numbers: EntryFieldTypes.Array<
        EntryFieldTypes.EntryLink<{
          contentTypeId: "number";

          fields: {
            title: EntryFieldTypes.Text;
            number: EntryFieldTypes.Text;
          };
        }>
      >;
    };
  }>("RxvnlGDS6MipFuOiPZwY6", {
    locale,
  });

export type AboutSectionEntry = Awaited<ReturnType<typeof getAboutSection>>;
export type GoalsSectionEntry = Awaited<ReturnType<typeof getGoalsSection>>;
export type SystemsSectionEntry = Awaited<ReturnType<typeof getSystemsSection>>;
export type DistributionNetworksEntry = Awaited<
  ReturnType<typeof getDistributionNetworksSection>
>;
export type CategoriesSectionEntry = Awaited<
  ReturnType<typeof getCategoriesSection>
>;
export type BrandsSectionEntry = Awaited<ReturnType<typeof getBrandsSection>>;
export type HeroSectionEntry = Awaited<ReturnType<typeof getHeroSection>>;
export type FactsSectionEntry = Awaited<ReturnType<typeof getFactsSection>>;
