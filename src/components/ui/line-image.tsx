import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt">;

export default function LineImage(props: Props) {
  return <Image {...props} src="/images/line.png" alt="line" />;
}
