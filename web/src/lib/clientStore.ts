"use client";
import { useEffect, useState } from "react";

function useLocalStorageSet(key: string) {
  const [setState, setSetState] = useState<Set<string>>(new Set());
  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (raw) setSetState(new Set(JSON.parse(raw)));
  }, [key]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(Array.from(setState)));
    }
  }, [key, setState]);
  function toggle(value: string) {
    setSetState((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }
  return { values: setState, toggle } as const;
}

export function useFavorites() {
  return useLocalStorageSet("favorites");
}

export function useCompare() {
  return useLocalStorageSet("compare");
}


