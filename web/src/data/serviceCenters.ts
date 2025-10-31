export type ServiceCenter = {
  id: string;
  name: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  services: string[];
};

export const SERVICE_CENTERS: ServiceCenter[] = [
  { id: "sc-msk-1", name: "СЦ Москва №1", city: "Москва", address: "ул. Пример, 1", lat: 55.7558, lng: 37.6173, phone: "+7 (495) 000-00-01", services: ["Гарантия","ТО"] },
  { id: "sc-spb-1", name: "СЦ СПб №1", city: "Санкт-Петербург", address: "Невский пр., 10", lat: 59.9343, lng: 30.3351, phone: "+7 (812) 000-00-02", services: ["Гарантия"] },
  { id: "sc-nsk-1", name: "СЦ Новосибирск №1", city: "Новосибирск", address: "Красный пр., 5", lat: 55.0084, lng: 82.9357, phone: "+7 (383) 000-00-03", services: ["ТО"] },
];

export const ALL_CITIES = Array.from(new Set(SERVICE_CENTERS.map(c => c.city)));
export const ALL_SERVICES = Array.from(new Set(SERVICE_CENTERS.flatMap(c => c.services)));


