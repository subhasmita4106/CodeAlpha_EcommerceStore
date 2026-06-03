import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Heart, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  cartCount: number;
  onBack: () => void;
  onNavigateToCart: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  cartCount,
  onBack,
  onNavigateToCart,
  onAddToCart,
}) => {
  // Gallery index state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Customizer selections - default to first available
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '#F5F5F0');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);

  // Accordion open states
  const [openSection, setOpenSection] = useState<'specifications' | 'shipping' | null>(null);

  // Add-to-cart button state engine: 'idle' | 'loading' | 'success'
  const [addState, setAddState] = useState<'idle' | 'loading' | 'success'>('idle');

  const nameMapColor: Record<string, string> = {
    '#F5F5F0': 'Bone White',
    '#E5E1DA': 'Soft Clay',
    '#484742': 'Deep Charcoal',
    '#1C1C17': 'Carbon Slate',
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCartSubmit = () => {
    if (addState !== 'idle') return;

    setAddState('loading');
    
    // Simulate luxurious loading transition
    setTimeout(() => {
      onAddToCart(product, selectedColor, selectedSize);
      setAddState('success');

      // Tonal success reset
      setTimeout(() => {
        setAddState('idle');
      }, 2000);
    }, 850);
  };

  const toggleAccordion = (section: 'specifications' | 'shipping') => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] pb-32 animate-fade-in relative">
      
      {/* Detail Standalone Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#e5e1da]/40 z-50 px-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          aria-label="Back"
          className="p-2 -ml-2 text-[#041627] hover:opacity-80 active:scale-90 transition-all"
        >
          <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
        </button>

        <h1 className="text-xl font-bold text-[#041627] tracking-tight font-sans">
          Serene
        </h1>

        <button 
          onClick={onNavigateToCart}
          aria-label="View Cart"
          className="p-2 -mr-2 text-[#041627] hover:opacity-80 active:scale-90 transition-all relative"
        >
          <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#f9f9f9]" />
          )}
        </button>
      </header>

      {/* Main scrolling segment, offsetting header height */}
      <main className="pt-16 max-w-2xl mx-auto">
        
        {/* Gallery Section */}
        <section className="relative w-full aspect-[4/5] bg-[#eeeeee] overflow-hidden group">
          {/* Images Strip */}
          <div className="w-full h-full relative">
            <img 
              src={product.images[activeImageIndex]} 
              alt={`${product.name} layout detail view`} 
              className="w-full h-full object-cover transition-all duration-500 ease-out"
            />
          </div>

          {/* Swipe chevrons - visible on group hover & touch responsive */}
          {product.images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                aria-label="Previous view"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-[#041627] hover:bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextImage}
                aria-label="Next view"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/25 backdrop-blur-md text-[#041627] hover:bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots index list */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeImageIndex 
                        ? 'bg-[#041627] scale-125 opacity-100' 
                        : 'bg-[#041627] opacity-30'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Product Information Context Panel */}
        <div className="px-4 mt-6">
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-2xl font-semibold text-[#041627] tracking-tight max-w-[72%]">
              {product.name}
            </h2>
            <span className="text-xl font-semibold text-[#041627] whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest font-bold text-[#605e59] mb-6">
            {product.subtitle || 'SERIES 01 / PREMIUM'}
          </p>

          <p className="text-sm text-[#44474c] leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Interactive Customize Controls */}
          <div className="space-y-6">
            
            {/* Color Selection Dot Chips */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-widest font-bold text-[#1a1c1c]">
                  Finish
                </span>
                <span className="text-xs text-[#605e59] italic">
                  {nameMapColor[selectedColor] || selectedColor}
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                      style={{ backgroundColor: color }}
                      className={`w-10 h-10 rounded-full cursor-pointer transition-all-custom relative ${
                        isActive 
                          ? 'ring-2 ring-offset-2 ring-[#041627] scale-105 shadow-sm' 
                          : 'border border-[#cac6bf] hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Configuration chips */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-widest font-bold text-[#1a1c1c]">
                  Size
                </span>
                <button 
                  onClick={() => alert(`Standard sizing specifications apply. Default size chosen is ${selectedSize}.`)}
                  className="text-xs text-[#605e59] underline hover:text-[#041627]"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
                        isActive
                          ? 'bg-[#041627] text-white border-[#041627] shadow-sm'
                          : 'bg-[#f3f3f3] text-[#605e59] border-[#c4c6cd]/50 hover:bg-[#e3dfd8]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Accordion Specification disclosure boards */}
          <div className="mt-10 border-t border-[#c4c6cd]/60 divide-y divide-[#c4c6cd]/60">
            
            {/* Spec details board */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('specifications')}
                  aria-expanded={openSection === 'specifications'}
                  className="w-full flex justify-between items-center text-left text-xs uppercase tracking-wider font-bold text-[#041627] hover:opacity-85"
                >
                  <span>Specifications</span>
                  <span className={`transform transition-transform duration-300 font-mono text-base ${
                    openSection === 'specifications' ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                
                {openSection === 'specifications' && (
                  <div className="mt-3 text-xs text-[#44474c] space-y-1.5 pl-1 animate-fade-in">
                    {product.specifications.map((spec, i) => (
                      <p key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#605e59]" />
                        {spec}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Logistics shipping board */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('shipping')}
                aria-expanded={openSection === 'shipping'}
                className="w-full flex justify-between items-center text-left text-xs uppercase tracking-wider font-bold text-[#041627] hover:opacity-85"
              >
                <span>Shipping &amp; Returns</span>
                <span className={`transform transition-transform duration-300 font-mono text-base ${
                  openSection === 'shipping' ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              {openSection === 'shipping' && (
                <div className="mt-3 text-xs text-[#44474c] leading-relaxed pl-1 animate-fade-in">
                  <p>
                    {product.shippingReturns || 'Free standard carbon-neutral ground shipping is applied automatically to all selection orders exceeding $150. Easy returns are eligible in primary brand package wrapper casings within 30 days.'}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Sticky footer layout */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#f9f9f9]/95 backdrop-blur-md border-t border-[#e5e1da]/40 py-2.5 px-4 shadow-[0_-4px_25px_rgba(26,43,60,0.04)] z-50">
        <div className="flex gap-2.5 h-14 items-center max-w-lg mx-auto">
          {/* Wishlist triggers heart feedback */}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Add to Wishlist"
            className={`flex items-center justify-center w-14 h-14 rounded-lg border border-[#c4c6cd]/50 active:scale-95 transition-all outline-none cursor-pointer ${
              isFavorite 
                ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6]' 
                : 'bg-[#eeeeee] text-[#041627] hover:bg-[#e3dfd8]'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#ba1a1a]' : 'stroke-[1.5]'}`} />
          </button>

          {/* Checkout/Add key trigger */}
          <button 
            disabled={addState !== 'idle'}
            onClick={handleAddToCartSubmit}
            className={`flex-1 h-14 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
              addState === 'success'
                ? 'bg-[#38260b] text-[#feddb5]'
                : addState === 'loading'
                ? 'bg-[#1a2b3c] text-white opacity-80'
                : 'bg-[#1a2b3c] text-white hover:bg-[#041627] shadow-sm'
            }`}
          >
            {addState === 'loading' && (
              <span className="w-4.5 h-4.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            )}
            {addState === 'success' && (
              <CheckCircle2 className="w-4.5 h-4.5 text-[#feddb5]" />
            )}
            {addState === 'idle' ? 'ADD TO CART' : addState === 'loading' ? 'ADDING...' : 'ADDED TO CART'}
          </button>
        </div>
      </footer>

    </div>
  );
};
