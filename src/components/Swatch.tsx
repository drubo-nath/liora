import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Swatch — product visual. Renders the product photo when available,
 * otherwise falls back to layered gradient art with film grain.
 */
export default function Swatch({
  tones,
  className,
  variant = "card",
  imageUrl,
}: {
  tones: [string, string];
  className?: string;
  variant?: "card" | "hero" | "thumb";
  imageUrl?: string | null;
}) {
  const [a, b] = tones;

  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden bg-sand", className)}>
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn("grain relative overflow-hidden bg-sand", className)}
      style={{
        background: `linear-gradient(155deg, ${a} 0%, ${b} 100%)`,
      }}
    >
      {/* soft light bloom */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 22% 12%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 52%)`,
        }}
      />
      {/* deep shadow pool */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(110% 100% at 82% 92%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 55%)`,
        }}
      />
      {/* gloss arc */}
      <div
        className="absolute rounded-full"
        style={{
          width: variant === "hero" ? "46%" : "58%",
          aspectRatio: "1 / 2.1",
          left: variant === "hero" ? "16%" : "12%",
          top: "8%",
          transform: "rotate(18deg)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.06) 55%, rgba(255,255,255,0) 100%)",
          filter: "blur(6px)",
        }}
      />
      {/* nail silhouettes for hero variant */}
      {variant === "hero" && (
        <div className="absolute inset-0 flex items-end justify-center gap-[7%] pb-[10%]">
          {[0.82, 1, 0.92, 0.74].map((h, i) => (
            <div
              key={i}
              className="grain relative overflow-hidden rounded-t-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]"
              style={{
                width: "13%",
                height: `${h * 62}%`,
                background: `linear-gradient(160deg, ${a} 10%, ${b} 90%)`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(90% 40% at 30% 12%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
