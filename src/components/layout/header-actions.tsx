import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderActionsProps {
  cartCount?: number;
  showCart?: boolean;
  showAccount?: boolean;
}

export function HeaderActions({ 
  cartCount = 0, 
  showCart = true, 
  showAccount = true 
}: HeaderActionsProps) {
  return (
    <div className="flex items-center space-x-4">
      {showCart && (
        <Link href="/cart" className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gaskotel-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>
      )}

      {showAccount && (
        <Link href="/account">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </div>
  );
}