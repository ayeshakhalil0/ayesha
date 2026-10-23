import { preload } from "react-dom";
import { hero } from "@/config/site";

export default function HeroImage() {
  const { src, type, poster } = hero.video;
  // Tiny static poster, preloaded so it paints with the first HTML.
  preload(poster, { as: "image", fetchPriority: "high" });

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-label={hero.image.alt}
      className="absolute inset-0 h-full w-full object-cover mt-5"
    >
      <source src={src} type={type} />
    </video>
  );
}
