import React from 'react';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#f9f9f9]/95 backdrop-blur-md border-t border-[#e5e1da]/40 shadow-[0_-4px_20px_rgba(26,43,60,0.03)] z-40 flex justify-around items-center px-4 pb-safe">
      <button
        onClick={() => onTabChange('Home')}
        className={`flex flex-col items-center justify-center w-16 h-12 transition-all duration-200 active:scale-90 ${
          activeTab === 'Home' 
            ? 'text-[#041627] font-semibold' 
            : 'text-[#605e59] opacity-60 hover:opacity-100'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'Home' ? 'fill-[#041627]/10 stroke-[2]' : 'stroke-[1.5]'}`} />
        <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Home</span>
      </button>

      <button
        onClick={() => onTabChange('Search')}
        className={`flex flex-col items-center justify-center w-16 h-12 transition-all duration-200 active:scale-90 ${
          activeTab === 'Search' 
            ? 'text-[#041627] font-semibold' 
            : 'text-[#605e59] opacity-60 hover:opacity-100'
        }`}
      >
        <Search className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Search</span>
      </button>

      <button
        onClick={() => onTabChange('Cart')}
        className={`flex flex-col items-center justify-center w-16 h-12 transition-all duration-200 active:scale-90 relative ${
          activeTab === 'Cart' 
            ? 'text-[#041627] font-semibold' 
            : 'text-[#605e59] opacity-60 hover:opacity-100'
        }`}
      >
        <ShoppingCart className={`w-5 h-5 ${activeTab === 'Cart' ? 'fill-[#041627]/10 stroke-[2]' : 'stroke-[1.5]'}`} />
        {cartCount > 0 && (
          <span className="absolute top-2 right-4 min-w-[14px] h-[14px] flex items-center justify-center bg-[#ba1a1a] text-white text-[8px] font-bold rounded-full px-1">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Cart</span>
      </button>

      <button
        onClick={() => onTabChange('Profile')}
        className={`flex flex-col items-center justify-center w-16 h-12 transition-all duration-200 active:scale-90 ${
          activeTab === 'Profile' 
            ? 'text-[#041627] font-semibold' 
            : 'text-[#605e59] opacity-60 hover:opacity-100'
        }`}
      >
        <User className="w-5 h-5 stroke-[1.5]" />
        <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Profile</span>
      </button>
    </nav>
  );
};
