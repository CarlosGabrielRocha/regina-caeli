import Paralax from "../../components/Paralax";
import Title from "../../components/Title";
import InfoCard from "../../components/InfoCard";

export default function Presentation() {
  return (
    <section
      id="about"
      className="space-y-13 md:space-y-20 h-fit py-10 px-2 bg-linear-to-b from-background via-black/40 via-80% to-background to-100%"
    >
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 h-fit py-10 md:py-25">
        <Title size="lg" className="mb-10 max-w-8/12 md:max-w-7/12 text-center">
          Realize o sonho de conquistar a sua residência própria.
        </Title>
        <Paralax src="images/family.png" />
      </div>
      <div className="flex flex-col items-center justify-center gap-7 md:gap-13 h-fit">
        <Title size="lg" className="mb-10 md:max-w-7/12 text-center">
          Sobre Nós
        </Title>
        <p className="md:max-w-9/12 text-center text-sm md:text-md lg:text-lg 2xl:text-xl">
          Somos uma promotora de imóveis que conecta clientes a construtoras
          parceiras e corretores qualificados, sempre com foco em facilitar todo
          o processo de compra. Nosso compromisso é conquistar a confiança do
          cliente, oferecendo orientação clara, atendimento próximo e soluções
          que realmente atendam às suas necessidades. Trabalhamos de forma
          simples, transparente e facilitada, reduzindo burocracias e tornando a
          experiência mais segura e tranquila, do primeiro contato até a escolha
          do imóvel ideal. Mais do que promover imóveis, ajudamos pessoas a
          realizar seus objetivos com confiança.
        </p>
        <div className="flex max-md:flex-col flex-wrap items-center justify-center gap-7 md:gap-20 2xl:gap-15 max-w-9/12 w-full pt-20">
          <InfoCard
            iconSrc="/icons/handshake-icon.svg"
            iconAlt="Aperto de mãos"
            title="Entrada Facilitada"
            description="Condições especiais com possibilidade de entrada facilitada ou até zero de entrada, conforme o perfil. Tudo de forma simples, transparente e sem burocracia."
            variant="highlight"
          />
          <InfoCard
            iconSrc="/icons/house-icon.svg"
            iconAlt="Casa"
            title="Parceiros"
            description="Trabalhamos com construtoras e corretores parceiros de confiança, garantindo mais segurança, qualidade e as melhores oportunidades para você."
          />
          <InfoCard
            iconSrc="/icons/heart-icon.svg"
            iconAlt="Coração"
            title="Suporte Completo"
            description="Acompanhamos você em todas as etapas da compra, do primeiro contato à entrega das chaves, com atendimento próximo, claro e sem complicações."
          />
        </div>
      </div>
    </section>
  );
}
