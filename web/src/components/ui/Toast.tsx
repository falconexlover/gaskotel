"use client";
import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={true}
      richColors={true}
      closeButton
      toastOptions={{
        classNames: {
          success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100",
          error: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100",
          info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
          warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100",
        },
      }}
    />
  );
}


