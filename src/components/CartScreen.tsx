import React from 'react';
import { X, Plus, Minus, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  // Determine counts & subtotal
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Dynamic values
  const shippingThreshold = 300.00;
  const remainsToFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const isFreeShippingEligible = remainsToFreeShipping === 0;

  // Let's implement standard colors map for visual rendering
  const colorMapName: Record<string, string> = {
    '#F5F5F0': 'Bone',
    '#E5E1DA': 'Clay',
    '#484742': 'Charcoal',
    '#1C1C17': 'Carbon',
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-[#eeeeee] flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-[#74777d] stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-semibold text-[#041627] mb-2 font-sans">
          Your cart is empty
        </h2>
        <p className="text-sm text-[#605e59] mb-8 max-w-sm leading-relaxed">
          Explore our minimalist collections and find something structured, raw, and high-end.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3.5 bg-[#041627] text-white rounded-sm font-bold tracking-widest text-xs uppercase active:scale-95 transition-all outline-none cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-28 px-4 max-w-2xl mx-auto animate-fade-in">
      
      {/* Header element */}
      <header className="mb-8 pt-6">
        <h1 className="text-2xl font-semibold text-[#041627] mb-1 font-sans">
          Your Cart
        </h1>
        <p className="text-sm text-[#605e59]">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your selection
        </p>
      </header>

      {/* Cart rows */}
      <div className="space-y-4">
        {cartItems.map((item) => {
          const colorName = colorMapName[item.selectedColor] || 'Finish';
          return (
            <div 
              key={item.id}
              className="flex gap-4 p-3 bg-white rounded-xl border border-[#cac6bf]/20 shadow-[0_4px_20px_rgba(26,43,60,0.02)]"
            >
              {/* Product preview square container */}
              <div className="w-24 h-24 bg-[#eeeeee] rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product metadata column */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-semibold text-[#041627] font-sans pr-2">
                      {item.product.name}
                    </h3>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                      className="text-[#74777d] hover:text-[#ba1a1a] transition-colors p-1"
                    >
                      <X className="w-5 h-5 stroke-[2]" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[#605e59]">
                    {colorName} / {item.selectedSize}
                  </p>
                </div>

                {/* Incrementor and pricing footer */}
                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center border border-[#cac6bf] rounded-full px-2.5 py-1 bg-[#f9f9f9]">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-5 h-5 flex items-center justify-center text-[#1a1c1c] active:scale-75 transition-transform cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <span className="px-3 text-xs font-bold font-mono tracking-tight text-[#041627]">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-5 h-5 flex items-center justify-center text-[#1a1c1c] active:scale-75 transition-transform cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  <span className="text-base font-semibold text-[#041627] tracking-tight">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Summary element segment */}
      <section className="mt-10 pt-6 border-t border-[#cac6bf]/50">
        <div className="space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-[#605e59]">Subtotal</span>
            <span className="text-[#041627] font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-[#605e59]">Shipping Estimate</span>
            <span className="text-[#64625d] font-medium">
              {isFreeShippingEligible ? 'Free Premium Shipping' : 'Calculated at next step'}
            </span>
          </div>

          <div className="flex justify-between text-lg pt-2 border-t border-[#cac6bf]/10">
            <span className="text-[#041627] font-bold">Total</span>
            <span className="text-[#041627] font-extrabold">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Proceed primary inputs */}
        <div className="space-y-3">
          <button 
            onClick={onProceedToCheckout}
            className="w-full py-4 bg-[#1a2b3c] hover:bg-[#041627] text-white rounded-xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button 
            onClick={onContinueShopping}
            className="w-full py-3.5 bg-[#e6e2db] hover:bg-[#cac6bf]/50 text-[#041627] rounded-xl font-bold tracking-widest text-xs uppercase active:scale-[0.99] transition-all cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </section>

      {/* Bento style Progress Milestone Banner */}
      <section className="mt-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="p-4 bg-[#feddb5] rounded-xl flex items-center justify-between text-[#281802]">
          <div className="pr-4">
            <h4 className="text-[15px] font-bold text-[#211200]">
              {isFreeShippingEligible 
                ? 'Free Shipping Unlocked!' 
                : 'Free shipping over $300'
              }
            </h4>
            <p className="text-[12px] text-[#281802]/80 mt-0.5">
              {isFreeShippingEligible 
                ? 'Your order qualifies for complimentary priority shipping.' 
                : `Add $${remainsToFreeShipping.toFixed(2)} more to qualify.`
              }
            </p>
          </div>
          <Truck className="w-8 h-8 text-[#281802] stroke-[1 stroke-width] flex-shrink-0" />
        </div>
      </section>

    </div>
  );
};
