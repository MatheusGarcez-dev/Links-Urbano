export function Footer() {
  return (
    <footer className="relative animate-fade-up mt-8 pb-14 text-center [animation-delay:180ms] md:pb-4">
      <p className="mx-auto max-w-[620px] px-2 text-xs leading-relaxed text-[#b8aca0] sm:text-sm">
        Atendimento de segunda a sexta, das 8h as 18h. Base em Maringa-PR com atuacao regional. Entre em contato
        para avaliacao tecnica e orcamento do seu projeto.
      </p>
      <img
        src="/Logo-icon-amarelo.webp"
        alt=""
        aria-hidden="true"
        className="mx-auto mt-8 h-10 w-10 object-contain opacity-95 md:absolute md:bottom-0 md:left-0 md:mx-0 md:mt-0"
      />
    </footer>
  );
}
