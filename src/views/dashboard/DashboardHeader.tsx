"use client";

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
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between w-full px-5 py-3 2xl:py-4 bg-primary transition-all duration-300 shadow-sm">
        <A href="/">
          <Title size="sm">Dayse Rocha</Title>
        </A>
        <nav className="hidden md:flex items-center gap-5 h-10">
          <A
            href="/dashboard/agent"
            className={
              isActive("/dashboard/agent") ? "text-highlight font-bold" : ""
            }
          >
            Painel
          </A>
          <Divisor />
          <A
            href="/dashboard/contact-requests"
            className={
              isActive("/dashboard/contact-requests")
                ? "text-highlight font-bold"
                : ""
            }
          >
            Solicitações
          </A>
          <Divisor />
          <A
            href="/dashboard/properties"
            className={
              isActive("/dashboard/properties")
                ? "text-highlight font-bold"
                : ""
            }
          >
            Propriedades
          </A>
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
              className="flex flex-col gap-1 rounded-sm bg-tertiary py-3 px-2 md:hidden z-50 border border-white/20 shadow-lg"
            >
              <DropdownMenuItem className="font-light px-2 outline-none">
                <A href="/dashboard/agent" size="medium">
                  Painel
                </A>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-px bg-white/20" />
              <DropdownMenuItem className="font-light px-2 outline-none">
                <A href="/dashboard/contact-requests" size="medium">
                  Solicitações
                </A>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-px bg-white/20" />
              <DropdownMenuItem className="font-light px-2 outline-none">
                <A href="/dashboard/properties" size="medium">
                  Propriedades
                </A>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
