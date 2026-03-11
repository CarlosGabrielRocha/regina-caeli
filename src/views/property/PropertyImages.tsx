"use client";

import { useState } from "react";
import Image from "next/image";
import FullScreenCarousel from "../../components/FullScreenCarousel";
import { Button } from "../../components/ui/button";
import { Maximize2 } from "lucide-react";
import Text from "../../components/Text";

interface PropertyImagesProps {
  images: string[];
  title: string;
}

export default function PropertyImages({ images, title }: PropertyImagesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openCarousel = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative group">
        <div className="flex mx-auto flex-row lg:flex-col gap-2 md:gap-5 lg:gap-10 max-w-250 max-md:min-h-fit md:h-130 overflow-auto no-scrollbar">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative h-60 sm:h-80 md:h-110 xl:h-90 2xl:h-110 3xl:h-145 w-10/12 md:w-9/12 lg:w-full shrink-0 cursor-pointer group shadow-lg"
              onClick={() => openCarousel(index)}
            >
              <Image
                src={src}
                alt={`${title} - image ${index + 1}`}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={() => openCarousel(0)}
          className="absolute top-2 right-2 z-10 bg-black/40 hover:bg-black/60 shadow-lg 3xl:p-4"
          variant="default"
        >
          <Maximize2 className="size-4 3xl:size-8" />
        </Button>
      </div>

      <FullScreenCarousel
        images={images}
        initialIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
