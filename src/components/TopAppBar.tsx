import React from 'react';
import { Menu, ShoppingBag } from 'lucide-react';

interface TopAppBarProps {
  cartCount: number;
  onNavigate: (tab: 'Home' | 'Search' | 'Cart' | 'Profile') => void;
  onOpenMenu?: () => void;
  activeTab: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  cartCount,
  onNavigate,
  onOpenMenu,
  activeTab,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#e5e1da]/40 z-50 px-4 flex items-center justify-between transition-all duration-300">
      <button 
        onClick={onOpenMenu}
        aria-label="Toggle Menu"
        className="p-2 -ml-2 text-[#041627] hover:opacity-80 active:scale-95 transition-all"
      >
        <Menu className="w-6 h-6 stroke-[1.5]" />
      </button>

      <button 
        onClick={() => onNavigate('Home')}
        className="text-[#041627] font-semibold text-2xl tracking-tight hover:opacity-90 transition-opacity font-sans"
      >
        Serene
      </button>

      <button
        onClick={() => onNavigate('Cart')}
        className="p-2 -mr-2 text-[#041627] hover:opacity-80 active:scale-95 transition-all relative"
        aria-label="Open Shopping Bag"
      >
        <ShoppingBag className={`w-6 h-6 stroke-[1.5] ${activeTab === 'Cart' ? 'fill-[#041627]/10' : ''}`} />
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#f9f9f9]" />
        )}
      </button>
    </header>
  );
};
