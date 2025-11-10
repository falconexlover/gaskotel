import { Phone } from "lucide-react";

interface HeaderTopPanelProps {
  phoneNumber?: string;
  showLanguageSwitcher?: boolean;
}

export function HeaderTopPanel({ 
  phoneNumber = "+7 (495) 221-66-77", 
  showLanguageSwitcher = true 
}: HeaderTopPanelProps) {
  return (
    <div className="bg-gaskotel-primary text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>{phoneNumber}</span>
          </div>
          <span>Многоканальный телефон</span>
        </div>
        {showLanguageSwitcher && (
          <div className="flex items-center space-x-4">
            <span className="cursor-pointer hover:underline">Русский</span>
            <span className="text-gray-300">|</span>
            <span className="cursor-pointer hover:underline">English</span>
          </div>
        )}
      </div>
    </div>
  );
}