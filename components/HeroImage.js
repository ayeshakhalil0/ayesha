import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { hero } from "@/config/site";

export default function HeroImage() {
  // Optimized poster (WebP, resized) instead of the raw 2.5 MB PNG, preloaded so it paints first
  const { props: poster } = getImageProps({ src: hero.image.src, alt: "", width: 1586, height: 992 });
  preload(poster.src, { as: "image", fetchPriority: "high" });

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster.src}
      aria-label={hero.image.alt}
      className="absolute inset-0 h-full w-full object-cover mt-5"
    >
      <source src={hero.video.src} type={hero.video.type} />
    </video>
  );
}
