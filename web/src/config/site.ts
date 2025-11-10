export const site = {
  name: "Жуковский Машиностроительный Завод ЖМЗ",
  url: "https://gaskotel.ru",
  contacts: {
    phoneDisplay: "+7 (495) 221-66-88",
    phoneHref: "+74952216688",
    email: "zmz@gaskotel.ru",
    address: "140184, Московская область, г. Жуковский, ул. Заводская, д. 3",
    mapUrl: "https://yandex.ru/maps/",
  },
  social: {
    telegram: "https://t.me/",
    vk: "https://vk.com/",
    youtube: "https://www.youtube.com/",
    whatsapp: "https://wa.me/",
  },
  legal: {
    inn: "",
    ogrn: "",
  },
} as const;

export type SiteConfig = typeof site;
