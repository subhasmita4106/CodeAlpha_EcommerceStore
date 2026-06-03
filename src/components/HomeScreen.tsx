import React, { useState } from 'react';
import { Plus, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface HomeScreenProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onProductClick,
  onAddToCart,
}) => {
  // Local state to manage which products were recently added from the quick button
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // prevent opening product details

    // Use first color and size if available, otherwise defaults
    const selectedColor = product.colors[0] || '#F5F5F0';
    const selectedSize = product.sizes[0] || 'Standard';

    onAddToCart(product, selectedColor, selectedSize);

    setJustAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setJustAdded((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // We filter out items that are specifically main grid arrivals (Serene Frames, Tempo Runner, Studio Carryall, Vessel No. 4)
  const newArrivals = products.filter(p => 
    p.id === 'serene-frames' || 
    p.id === 'tempo-runner' || 
    p.id === 'studio-carryall' || 
    p.id === 'vessel-no-4'
  );

  return (
    <div className="w-full pb-24 overflow-x-hidden animate-fade-in">
      {/* Featured Hero Product Banner */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-[#e5e2db]/30">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6-IDzXg3Uwz4w9K4-y_9wQznGIZDh5hvI3Ndc868DqhF82-ThOKnazfxTQrgROxwuf_HxPUwixVcBowMKt8LeL-AAymBM_WVtS_70CDkbwsW2_nxo3D649zxxin-SM7tlZOoIslRsV3opT332wIt3a9HIKyaAK9dt2xTp3QP13RWp1YNZigtCR6p4_S_MqE5teo70jTiVT9O-a78-8myr79p9-bCedzBEx0PfWCIMy-R-prQH4WrBPHaoALvKOkm07h6dWZuf53U"
          alt="Featured minimal design container" 
          className="w-full h-full object-cover"
        />
        {/* Subtle Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041627]/60 via-[#041627]/10 to-transparent flex flex-col justify-end p-6 pb-12">
          <p className="text-xs uppercase tracking-[0.15em] font-bold text-white/90 mb-1">Limited Edition</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-6 font-sans">
            The Essence Collection
          </h2>
          
          {/* Action button triggers viewing the flagship Minimalist Ceramic Vase details page */}
          <button 
            onClick={() => {
              const mainVase = products.find(p => p.id === 'ceramic-vase');
              if (mainVase) onProductClick(mainVase);
            }}
            className="w-max px-6 py-3 bg-[#041627] text-white hover:bg-[#1a2b3c] font-medium text-sm tracking-wide rounded-sm active:scale-95 transition-all duration-200"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* New Arrivals Grid Section */}
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-baseline mb-8">
          <h3 className="text-2xl font-semibold text-[#041627] tracking-tight">New Arrivals</h3>
          <button 
            onClick={() => {
              const firstItem = products[0];
              if (firstItem) onProductClick(firstItem);
            }}
            className="text-xs uppercase tracking-wider font-bold text-[#605e59] hover:text-[#041627] border-b border-[#c4c6cd] pb-0.5"
          >
            View All
          </button>
        </div>

        {/* 2-Column Responsive Gutter Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {newArrivals.map((product) => {
            const isAdded = justAdded[product.id];
            return (
              <div 
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group cursor-pointer select-none"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[3/4] bg-[#e3dfd8]/50 overflow-hidden rounded-lg mb-3">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Quick additive button with micro-interactions */}
                  <button 
                    onClick={(e) => handleQuickAdd(e, product)}
                    aria-label={`Add ${product.name} to cart`}
                    className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90 ${
                      isAdded 
                        ? 'bg-[#38260b] text-[#feddb5]' 
                        : 'bg-[#041627] text-white hover:bg-[#1a2b3c]'
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </button>
                </div>

                {/* Meta details */}
                <p className="text-sm text-[#605e59] mb-1 font-sans">{product.name}</p>
                <p className="text-base font-semibold text-[#041627]">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Promotional Bento Section */}
      <section className="px-4 pb-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Eco Curation */}
          <div className="md:col-span-2 bg-[#e6e2db] rounded-xl p-6 md:p-8 flex flex-col justify-center min-h-[220px]">
            <h4 className="text-2xl font-semibold text-[#041627] mb-2">Eco-Conscious Curation</h4>
            <p className="text-sm text-[#484742] max-w-[340px] mb-5 leading-relaxed">
              Sustainability is at the core of every Serene selection, optimizing tactile durability and minimizing chemical impact.
            </p>
            <button 
              onClick={() => {
                alert("Eco Curation Story: Each artisanal piece is sustainably sourced, handmade with chemical-free clay, raw organic linens, and FSC-certified materials, ensuring a premium life-long design shelf life.");
              }}
              className="text-xs uppercase tracking-widest font-bold text-[#041627] border-b border-[#041627] w-max pb-0.5"
            >
              Learn Our Story
            </button>
          </div>

          {/* Card 2: Join Serene+ Membership */}
          <div className="bg-[#041627] text-white rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[220px]">
            <div className="w-12 h-12 bg-[#feddb5]/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#feddb5] fill-[#feddb5]/20 animate-pulse" />
            </div>
            <p className="text-lg font-medium mb-1">Join Serene+</p>
            <p className="text-xs text-white/70 max-w-[200px] leading-relaxed mb-4">
              Get exclusive access to new seasonal drops and complimentary free premium shipping on all selections.
            </p>
            <button 
              onClick={() => {
                alert("Welcome! You are now part of Serene+ and entitled to premier seasonal updates.");
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 hover:text-white rounded-sm text-xs font-bold tracking-wider uppercase transition-colors"
            >
              Subscribe
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
