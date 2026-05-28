import type { ReactNode } from "react";
import BorderGlow from "./BorderGlow";

export type LinkCardVariant = "site" | "whatsapp" | "portfolio";

type LinkCardProps = {
  href: string;
  subtitle: string;
  image?: string;
  variant: LinkCardVariant;
  className?: string;
};

const glowByVariant: Record<
  LinkCardVariant,
  {
    glowColor: string;
    backgroundColor: string;
    colors: string[];
    borderRadius: number;
  }
> = {
  site: {
    glowColor: "48 78 88",
    backgroundColor: "#1a0d10",
    colors: ["#5c3a42", "#4a2f35", "#3d252b"],
    borderRadius: 32
  },
  whatsapp: {
    glowColor: "142 72 52",
    backgroundColor: "transparent",
    colors: ["#25d366", "#16a34a", "#052e16"],
    borderRadius: 32
  },
  portfolio: {
    glowColor: "48 78 88",
    backgroundColor: "#1a0d10",
    colors: ["#5c3a42", "#4a2f35", "#3d252b"],
    borderRadius: 32
  }
};

function CardTitle({ variant }: { variant: LinkCardVariant }) {
  if (variant === "site") {
    return (
      <h3 className="text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-tight tracking-tight text-white">
        Site Oficial <span className="text-[#F2DA2A]">Urbano</span>
      </h3>
    );
  }

  if (variant === "whatsapp") {
    return (
      <h3 className="text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-tight tracking-tight text-[#25D366]">
        Whatsapp
      </h3>
    );
  }

  return (
    <h3 className="text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-tight tracking-tight text-white">
      Portfólio
    </h3>
  );
}

export function LinkCard({ href, subtitle, image, variant, className }: LinkCardProps) {
  const glow = glowByVariant[variant];
  const isExternal = href.startsWith("http");

  let cardInner: ReactNode;

  if (variant === "whatsapp") {
    cardInner = (
      <a
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noreferrer" : undefined}
        className="relative flex h-full min-h-[148px] w-full flex-col justify-end overflow-hidden rounded-[inherit] p-6 transition-[transform,box-shadow] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] group-hover:shadow-[inset_0_0_0_1px_rgba(37,211,102,0.45),0_0_42px_rgba(37,211,102,0.38),0_0_72px_rgba(37,211,102,0.18)] md:min-h-[168px]"
      >
        <div
          className="pointer-events-none absolute inset-0 size-full rounded-[inherit] transition-opacity duration-500 ease-out group-hover:opacity-85"
          style={{
            backgroundColor: "#060807",
            backgroundImage: [
              "radial-gradient(ellipse 140% 110% at 0% 0%, rgba(37, 211, 102, 0.38) 0%, rgba(22, 163, 74, 0.14) 42%, rgba(6, 8, 7, 0.95) 72%)",
              "radial-gradient(ellipse 100% 90% at 100% 100%, rgba(0, 0, 0, 0.55) 0%, rgba(6, 8, 7, 0) 55%)",
              "linear-gradient(165deg, #0b1410 0%, #070908 45%, #040504 100%)"
            ].join(", ")
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 size-full rounded-[inherit] opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 130% 105% at 0% 0%, rgba(37, 211, 102, 0.62) 0%, rgba(34, 197, 94, 0.28) 38%, rgba(6, 8, 7, 0) 72%)",
              "radial-gradient(ellipse 90% 80% at 100% 100%, rgba(0, 0, 0, 0.35) 0%, transparent 60%)"
            ].join(", ")
          }}
        />
        <div className="pointer-events-none absolute -inset-8 rounded-[inherit] bg-[radial-gradient(circle_at_20%_15%,rgba(37,211,102,0.35)_0%,transparent_55%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-[1] transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
          <h3 className="text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-tight tracking-tight text-[#25D366] transition-[color,text-shadow] duration-500 group-hover:text-[#4ade80] group-hover:[text-shadow:0_0_24px_rgba(74,222,128,0.55)]">
            Whatsapp
          </h3>
          <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-[#d4cdc4] transition-colors duration-500 group-hover:text-[#eef8f0]">
            {subtitle}
          </p>
        </div>
      </a>
    );
  } else {
    const imagePosition = variant === "site" ? "object-[center_22%]" : "object-center";

    cardInner = (
      <a
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noreferrer" : undefined}
        className="group relative block h-full min-h-[210px] overflow-hidden rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2DA2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#231114] md:min-h-0"
      >
        {image ? (
          <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className={`h-full w-full object-cover ${imagePosition} blur-[2px] brightness-[0.74] saturate-[0.93] transition-[transform_1.6s_cubic-bezier(0.22,1,0.36,1),filter_900ms_cubic-bezier(0.25,0.1,0.25,1)] will-change-[filter,transform] group-hover:scale-[1.012] group-hover:blur-0 group-hover:brightness-[0.8] group-hover:saturate-[0.95]`}
            />
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black/28 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-black/18" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(to_top,rgba(8,4,5,0.9)_0%,rgba(8,4,5,0.52)_42%,rgba(8,4,5,0.18)_100%)] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-80" />

        <div className="relative flex min-h-[210px] flex-col justify-end p-6 md:min-h-full">
          <CardTitle variant={variant} />
          <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-[#e4dbd0]">{subtitle}</p>
        </div>
      </a>
    );
  }

  return (
    <BorderGlow
      className={`group h-full overflow-hidden ${variant === "whatsapp" ? "transition-transform duration-500 ease-out hover:scale-[1.018]" : ""} ${className ?? ""}`}
      edgeSensitivity={30}
      glowColor={glow.glowColor}
      backgroundColor={glow.backgroundColor}
      borderRadius={glow.borderRadius}
      glowRadius={40}
      glowIntensity={variant === "whatsapp" ? 1.35 : 0.75}
      coneSpread={25}
      animated={false}
      colors={glow.colors}
      fillOpacity={variant === "whatsapp" ? 0.55 : 0.35}
      enableEdgeGlow={variant !== "whatsapp"}
    >
      {cardInner}
    </BorderGlow>
  );
}
