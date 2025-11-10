import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/\+?\d[\d\s\-\(\)]{8,}/, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email"),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
});

export const leadFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/\+?\d[\d\s\-\(\)]{8,}/, "Введите корректный номер телефона"),
});

export const subscribeFormSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

export const serviceRequestFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/\+?\d[\d\s\-\(\)]{8,}/, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional(),
  message: z.string().optional(),
});

export const reviewFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email").optional(),
  message: z.string().min(10, "Отзыв должен содержать минимум 10 символов"),
  rating: z.number().min(1).max(5).optional(),
});




