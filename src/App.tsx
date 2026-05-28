import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LinkCard } from "./components/LinkCard";
import { LineWavesBackground } from "./components/LineWavesBackground";

const links = [
  {
    href: "https://urbanoengenharia.com.br",
    variant: "site" as const,
    subtitle: "Conheça os serviços e diferenciais da Urbano Engenharia",
    image: "/img-site-principal.webp",
    gridClass: "md:col-span-1 md:row-span-2 md:min-h-[440px]"
  },
  {
    href: "https://wa.me/554430376009",
    variant: "whatsapp" as const,
    subtitle: "Fale com a equipe comercial e receba orientação técnica",
    gridClass: "md:col-span-1"
  },
  {
    href: "/portfolio",
    variant: "portfolio" as const,
    subtitle: "Veja os projetos executados e resultados entregues",
    image: "/img-portfolio.webp",
    gridClass: "md:col-span-1"
  }
];

function App() {
  return (
    <div className="relative min-h-screen text-[#FFFCE0]">
      <LineWavesBackground />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[900px] flex-col justify-center px-5 py-10 sm:px-6 sm:py-12 md:max-w-[860px] lg:max-w-[900px]">
        <Header />

        <section className="mt-8 grid animate-fade-up grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-[minmax(200px,1fr)_minmax(200px,1fr)] md:gap-4 [animation-delay:100ms]">
          {links.map((link) => (
            <LinkCard
              key={link.variant}
              href={link.href}
              variant={link.variant}
              subtitle={link.subtitle}
              image={link.image}
              className={link.gridClass}
            />
          ))}
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default App;
