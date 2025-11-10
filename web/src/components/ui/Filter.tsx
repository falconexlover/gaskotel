"use client";
import { useState } from "react";
import { Icons } from "@/components/icons/Icons";
import { ButtonOutline } from "./Button";

interface FilterProps {
  options: { value: string; label: string; count?: number }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  title: string;
}

export function Filter({ options, selected, onChange, title }: FilterProps) {
  const [open, setOpen] = useState(true);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800/60"
      >
        <span className="flex items-center gap-2">
          <Icons.Filter className="h-4 w-4" />
          {title}
        </span>
        <Icons.ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
          <div className="space-y-2">
            {options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-[var(--primary-50)] text-[var(--primary-700)] dark:bg-[var(--primary-900)]/30 dark:text-[var(--primary-400)]"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {option.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {selected.length > 0 && (
            <ButtonOutline
              size="sm"
              className="mt-3 w-full"
              onClick={() => onChange([])}
            >
              Сбросить
            </ButtonOutline>
          )}
        </div>
      )}
    </div>
  );
}


