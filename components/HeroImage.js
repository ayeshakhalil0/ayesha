import Image from "next/image";
import { hero } from "@/config/site";

export default function HeroImage() {
  return (
    <Image
      src={hero.image.src}
      alt={hero.image.alt}
      fill
      loading="eager"
      fetchPriority="high"
      sizes="(min-width: 1024px) 80vw, 100vw"
      className="object-cover"
    />
  );
}
