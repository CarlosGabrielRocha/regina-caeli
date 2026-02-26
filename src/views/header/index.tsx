import { Menu } from "lucide-react";
import Title from "../../components/Title";
import Divisor from "../../components/divisor";
import A from "../../components/A";
import ProfileButton from "../../components/buttons/ProfileButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between w-full px-5 py-3 2xl:py-4 bg-primary transition-all duration-300 shadow-sm">
        <A href="/">
          <Title size="sm">Regina Caeli</Title>
        </A>
        <nav className="hidden md:flex items-center gap-5 h-10">
          <A href="/#highlights">Destaques</A>
          <Divisor />
          <A href="/#about">Sobre Nós</A>
          <Divisor />
          <A href="/#launch">Lançamento</A>
          <Divisor />
          <A href="/#contact">Contato</A>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ProfileButton />

          {/* Mobile Menu Button */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Menu"
                className="md:hidden hover:translate-y-0.5 transition-all"
              >
                <Menu />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={10}
              className="flex flex-col gap-1 rounded-sm bg-tertiary py-3 px-2 md:hidden"
            >
              <DropdownMenuItem className="font-light px-2">
                <A href="/#highlights" size="medium">
                  Destaques
                </A>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-px bg-white/20" />
              <DropdownMenuItem className="font-light px-2">
                <A href="/#about" size="medium">
                  Sobre Nós
                </A>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-px bg-white/20" />
              <DropdownMenuItem className="font-light px-2">
                <A href="/#launch" size="medium">
                  Lançamento
                </A>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-px bg-white/20" />
              <DropdownMenuItem className="font-light px-2">
                <A href="/#contact" size="medium">
                  Contato
                </A>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
