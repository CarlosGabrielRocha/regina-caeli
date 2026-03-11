"use client";

import { useState } from "react";
import Text from "../../components/Text";
import Tutorial from "../../components/Tutorial";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PropertyDescriptionProps {
  description: string[];
}

export default function PropertyDescription({
  description,
}: PropertyDescriptionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-1 p-4">
      <div
        className="flex justify-end cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300",
            isOpen
              ? "bg-secondary-light/10 text-secondary-light border border-secondary-light/20"
              : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10",
          )}
        >
          <span className="text-xs 2xl:text-sm 3xl:text-lg font-medium uppercase tracking-wider">
            {isOpen ? "Fechar" : "Ler descrição"}
          </span>
          {isOpen ? (
            <ChevronUp className="size-4 2xl:size-5 3xl:size-6" />
          ) : (
            <ChevronDown className="size-4 2xl:size-5 3xl:size-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Tutorial>Role para ler mais</Tutorial>
            <div className="flex flex-col gap-4 p-4 rounded-md bg-tertiary border border-white/5 mt-2">
              <Text type="h2" size="big" className="font-semibold">
                Detalhes do imóvel
              </Text>
              {description.map((item, index) => {
                const id = `long-description-${index}`;
                return (
                  <Text key={id} className="2xl:text-lg 3xl:text-2xl">
                    {item}
                  </Text>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
