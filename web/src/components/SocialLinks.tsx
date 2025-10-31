import { site } from "@/config/site";
import { TelegramIcon, VKIcon, YouTubeIcon, WhatsAppIcon } from "@/components/icons/Social";

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={site.social.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="inline-flex items-center gap-2 text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">
        <TelegramIcon /> <span className="sr-only">Telegram</span>
      </a>
      <a href={site.social.vk} target="_blank" rel="noopener noreferrer" aria-label="VK" className="inline-flex items-center gap-2 text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">
        <VKIcon /> <span className="sr-only">VK</span>
      </a>
      <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="inline-flex items-center gap-2 text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">
        <YouTubeIcon /> <span className="sr-only">YouTube</span>
      </a>
      <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex items-center gap-2 text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">
        <WhatsAppIcon /> <span className="sr-only">WhatsApp</span>
      </a>
    </div>
  );
}


