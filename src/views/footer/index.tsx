import A from "../../components/A";
import IconButton from "../../components/buttons/IconButton";
import Text from "../../components/Text";

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary mt-auto">
      <div className="h-10 w-full bg-secondary border-b border-white/70" />
      <div className="flex flex-col gap-10 px-10 pt-8">
        <div className="flex flex-col gap-3">
          <Text type="h1" size="medium" className="font-bold">
            Fale Conosco:
          </Text>
          <div className="flex justify-between gap-5 md:flex-row flex-col">
            <div className="space-y-1">
              <Text type="p" size="medium">
                +55 (81) 98608-8201
              </Text>
              <Text type="p" size="medium">
                contato@dayserocha.com
              </Text>
            </div>
            <div className="space-x-6">
              <A href="#">
                <IconButton src="/icons/whatsapp-icon.svg" alt="Whatsapp" />
              </A>
              <A href="#">
                <IconButton src="/icons/instagram-icon.svg" alt="Instagram" />
              </A>
              <A href="#">
                <IconButton src="/icons/email-icon.svg" alt="Email" />
              </A>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Text type="h1" size="medium" className="font-bold">
            Endereço:
          </Text>
          <address className="not-italic">
            <Text type="p" size="medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quod.
            </Text>
          </address>
        </div>
        <Text
          type="p"
          size="small"
          className="font-semibold text-white/70 mt-9"
        >
          Dayse Rocha - Todos os direitos reservados © 2026
        </Text>
        <div className="border-t border-white/70 py-4">
          <a href="https://carlosgabrieldev.vercel.app" target="_blank" className="flex space-x-2 justify-end items-center">
            <p className="zcool text-xl md:text-2xl">CG</p>
            <Text type="span">Carlos Gabriel Desenvolvedor</Text>
          </a>
        </div>
      </div>
    </footer>
  );
}
