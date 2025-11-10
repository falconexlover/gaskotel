import { Search } from "lucide-react";

interface HeaderSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function HeaderSearch({ 
  onSearch, 
  placeholder = "Поиск товаров..." 
}: HeaderSearchProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    if (onSearch) {
      onSearch(target.search.value);
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            name="search"
            type="text"
            placeholder={placeholder}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gaskotel-secondary focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </form>
    </div>
  );
}