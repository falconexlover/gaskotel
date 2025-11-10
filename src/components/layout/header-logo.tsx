import Link from "next/link";

interface HeaderLogoProps {
  logoText?: string;
  companyName?: string;
  companyDescription?: string;
}

export function HeaderLogo({ 
  logoText = "ЖМЗ", 
  companyName = "Жуковский машиностроительный завод", 
  companyDescription = "Современное отопительное оборудование"
}: HeaderLogoProps) {
  return (
    <Link href="/" className="group flex items-center gap-4">
      <div className="relative inline-flex items-center overflow-hidden rounded-2xl px-5 py-3 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
        <span className="absolute inset-0 bg-gradient-to-r from-gaskotel-secondary via-gaskotel-accent to-gaskotel-warm opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute inset-0 bg-white/10 mix-blend-overlay" />
        <h1 className="relative text-3xl font-black uppercase tracking-[0.25em] text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-105">
          {logoText}
        </h1>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gaskotel-primary/80">
          {companyName}
        </span>
        <p className="text-xs text-gray-500">
          {companyDescription}
        </p>
      </div>
    </Link>
  );
}