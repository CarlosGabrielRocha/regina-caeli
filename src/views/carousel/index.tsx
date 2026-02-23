"use client";

import useEmblaCarousel from "embla-carousel-react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 10000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.reset();
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.reset();
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.plugins().autoplay?.reset();
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div
      className={`${styles.embla} rounded-br-[6rem] rounded-bl-[6rem] md:rounded-br-[11rem] md:rounded-bl-[11rem]`}
    >
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          <div className={styles.embla__slide}>
            <Image
              fill
              src="/images/apartament-placeholder1.jpg"
              alt="placeholder"
              priority
              sizes="100vw"
              quality={100}
              className="contrast-125 saturate-110 brightness-100 object-cover"
            />
          </div>
          <div className={styles.embla__slide}>
            <Image
              fill
              src="/images/apartament-placeholder2.jpg"
              alt="placeholder"
              sizes="100vw"
              quality={100}
              className="contrast-125 saturate-110 brightness-100 object-cover"
            />
          </div>
          <div className={styles.embla__slide}>
            <Image
              fill
              src="/images/apartament-placeholder3.jpg"
              alt="placeholder"
              sizes="100vw"
              quality={100}
              className="contrast-125 saturate-110 brightness-100 object-cover"
            />
          </div>
        </div>
      </div>

      <button
        className={`${styles.arrow_btn} ${styles.arrow_prev}`}
        onClick={scrollPrev}
      >
        <div className="relative size-9 md:size-12 2xl:size-15">
          <Image
            src="/icons/carousel-leftarrow-icon.svg"
            alt="arrow-left"
            fill
            sizes="3rem"
          />
        </div>
      </button>

      <button
        className={`${styles.arrow_btn} ${styles.arrow_next}`}
        onClick={scrollNext}
      >
        <div className="relative size-9 md:size-12 2xl:size-15">
          <Image
            src="/icons/carousel-rightarrow-icon.svg"
            alt="arrow-right"
            fill
            sizes="3rem"
          />
        </div>
      </button>

      <div className={styles.dots_container}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === selectedIndex ? styles.dot_active : ""
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
