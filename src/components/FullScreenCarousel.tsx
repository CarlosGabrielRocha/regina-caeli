"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface FullScreenCarouselProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenCarousel({
  images,
  initialIndex,
  isOpen,
  onClose,
}: FullScreenCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.reInit({ startIndex: initialIndex });
    }
  }, [emblaApi, isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        scrollPrev();
      }
      if (event.key === "ArrowRight") {
        scrollNext();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, scrollPrev, scrollNext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate__animated animate__fadeIn animate__faster">
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-60 text-white/50 hover:text-white transition-colors"
      >
        <X size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="overflow-hidden w-full h-full flex items-center"
          ref={emblaRef}
        >
          <div className="flex w-full h-full touch-pan-y">
            {images.map((src, index) => (
              <div
                className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center p-4 sm:p-10"
                key={index}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={src}
                    alt={`Image ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="object-contain max-h-[90vh] max-w-full"
                    quality={100}
                    priority={index === initialIndex}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute max-md:hidden left-20 lg:left-5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 p-2 transition-opacity z-60"
          onClick={scrollPrev}
        >
          <div className="relative size-9 md:size-12">
            <Image
              src="/icons/carousel-leftarrow-icon.svg"
              alt="Previous"
              fill
              sizes="(max-width: 768px) 3rem, 4rem"
            />
          </div>
        </button>
        <button
          className="absolute max-md:hidden right-20 lg:right-5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 p-2 transition-opacity z-60"
          onClick={scrollNext}
        >
          <div className="relative size-9 md:size-12">
            <Image
              src="/icons/carousel-rightarrow-icon.svg"
              alt="Next"
              fill
              sizes="(max-width: 768px) 3rem, 4rem"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
