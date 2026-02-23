"use client";

import { useEffect, useRef } from "react";

export default function useLocalStorage(key: string, initialValue: string) {
  const value = useRef(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      value.current = storedValue;
    }
    localStorage.setItem(key, value.current);
  }, [value]);

  return value;
}
