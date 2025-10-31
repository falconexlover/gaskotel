import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & { asChild?: false };

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center gap-2 rounded-md bg-[var(--primary-600)] px-5 py-2.5 text-white shadow-sm transition-[background-color,transform,box-shadow] duration-200 hover:bg-[var(--primary-700)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] active:bg-[var(--primary-800)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed " +
        className
      }
    />
  );
}

export function ButtonSecondary({ className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center gap-2 rounded-md border border-[var(--primary-300)] bg-white px-5 py-2.5 text-[var(--primary-700)] shadow-sm transition-[background-color,transform,border-color] duration-200 hover:bg-[var(--primary-50)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] active:bg-[var(--primary-100)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-900 dark:text-[var(--primary-300)] dark:border-zinc-700 " +
        className
      }
    />
  );
}

export function ButtonOutline({ className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-transparent px-5 py-2.5 text-zinc-800 transition-[background-color,transform,border-color] duration-200 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] active:bg-zinc-100 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800/60 " +
        className
      }
    />
  );
}

export function ButtonGhost({ className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-4 py-2 text-[var(--primary-700)] transition-[background-color,transform] duration-200 hover:bg-[color-mix(in_srgb,theme(colors.blue.600)_12%,transparent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] active:bg-[color-mix(in_srgb,theme(colors.blue.700)_14%,transparent)] active:translate-y-px disabled:opacity-50 dark:text-[var(--primary-300)] " +
        className
      }
    />
  );
}


