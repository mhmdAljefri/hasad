import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt">;

export default function Arrow(props: Props) {
  return <Image {...props} src="/images/arrow-bottom.png" alt="arrow" />;
}
