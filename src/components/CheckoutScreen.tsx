import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Check, AlertCircle } from 'lucide-react';
import { CartItem, ShippingAddress, CheckoutStep } from '../types';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  cartCount: number;
  onSuccessReset: () => void; // Reset cart & go home
  onCancel: () => void; // Go back to cart tab
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  cartCount,
  onSuccessReset,
  onCancel,
}) => {
  // Current step state
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.Shipping);

  // Form input bindings
  const [address, setAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    postalCode: '',
  });

  const [paymentType, setPaymentType] = useState<'card' | 'wallet'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  // Simple validation feedback state
  const [errorText, setErrorText] = useState('');

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const isFreeShipping = subtotal >= 300 || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 15.00;
  const total = subtotal + shippingCost;

  // Form handlers
  const handleShippingSubmit = () => {
    if (
      !address.firstName.trim() ||
      !address.lastName.trim() ||
      !address.streetAddress.trim() ||
      !address.city.trim() ||
      !address.postalCode.trim()
    ) {
      setErrorText('Please provide all required shipping details.');
      return;
    }
    setErrorText('');
    setStep(CheckoutStep.Payment);
  };

  const handlePaymentSubmit = () => {
    if (paymentType === 'card') {
      if (
        !cardDetails.number.trim() ||
        !cardDetails.expiry.trim() ||
        !cardDetails.cvv.trim()
      ) {
        setErrorText('Please specify valid bank card credentials.');
        return;
      }
    }
    setErrorText('');
    setStep(CheckoutStep.Review);
  };

  const handlePlaceOrder = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(50);
    setStep(CheckoutStep.Success);
  };

  // Generate dynamic unique order number upon mounting
  const [orderId] = useState(() => {
    const r = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${r}`;
  });

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] pb-24 px-4 max-w-2xl mx-auto animate-fade-in relative z-40">
      
      {/* Checkout custom top bar (hidden on success as requested) */}
      {step !== CheckoutStep.Success && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-[#e5e1da]/40 z-50 px-4 flex items-center justify-between">
          <button 
            onClick={() => {
              if (step === CheckoutStep.Shipping) onCancel();
              if (step === CheckoutStep.Payment) setStep(CheckoutStep.Shipping);
              if (step === CheckoutStep.Review) setStep(CheckoutStep.Payment);
            }}
            aria-label="Back"
            className="p-2 -ml-2 text-[#041627] hover:opacity-80 active:scale-90 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
          </button>

          <h1 className="text-xl font-bold text-[#041627] tracking-tight font-sans">
            Serene
          </h1>

          <div className="w-10 h-10" /> {/* Centering spacing spacer */}
        </header>
      )}

      {/* Main scrolling wrapper */}
      <main className={`${step === CheckoutStep.Success ? 'pt-8' : 'pt-20'}`}>
        
        {/* Progress indicator progress bar (suppressed on success state) */}
        {step !== CheckoutStep.Success && (
          <div className="flex justify-between items-center mb-8 max-w-sm mx-auto">
            
            {/* SHIPPING marker */}
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              step >= CheckoutStep.Shipping ? 'opacity-100 text-[#041627]' : 'opacity-40 text-[#605e59]'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-widest">SHIPPING</span>
              <div className={`h-1 w-14 rounded-full transition-all duration-300 ${
                step >= CheckoutStep.Shipping ? 'bg-[#041627]' : 'bg-[#e3dfd8]'
              }`} />
            </div>

            {/* PAYMENT marker */}
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              step >= CheckoutStep.Payment ? 'opacity-100 text-[#041627]' : 'opacity-40 text-[#605e59]'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-widest">PAYMENT</span>
              <div className={`h-1 w-14 rounded-full transition-all duration-300 ${
                step >= CheckoutStep.Payment ? 'bg-[#041627]' : 'bg-[#e3dfd8]'
              }`} />
            </div>

            {/* REVIEW marker */}
            <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              step >= CheckoutStep.Review ? 'opacity-100 text-[#041627]' : 'opacity-40 text-[#605e59]'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-widest">REVIEW</span>
              <div className={`h-1 w-14 rounded-full transition-all duration-300 ${
                step >= CheckoutStep.Review ? 'bg-[#041627]' : 'bg-[#e3dfd8]'
              }`} />
            </div>

          </div>
        )}

        {/* Floating validation feedback header */}
        {errorText && step !== CheckoutStep.Success && (
          <div className="mb-6 p-4 bg-[#ffdad6] text-[#93000a] text-xs font-semibold rounded-lg flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorText}</span>
          </div>
        )}

        {/* SECTION SWITCH ENGINE */}
        <div className="w-full">
          
          {/* STEP 1: SHIPPING DETAILS FORM */}
          {step === CheckoutStep.Shipping && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-[#041627] font-sans">
                Shipping Address
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={address.firstName}
                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={address.lastName}
                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street Address"
                  value={address.streetAddress}
                  onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                  className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                />

                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={address.apartment}
                  onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                  className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                  />
                </div>
              </div>

              <button
                onClick={handleShippingSubmit}
                className="w-full bg-[#041627] text-white py-4 mt-6 rounded-lg font-bold tracking-widest text-xs uppercase hover:bg-[#1a2b3c] shadow-sm active:scale-[0.99] transition-all cursor-pointer"
              >
                CONTINUE TO PAYMENT
              </button>
            </section>
          )}

          {/* STEP 2: PAYMENT METHOD CONFIG */}
          {step === CheckoutStep.Payment && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-[#041627] font-sans">
                Payment Method
              </h2>

              <div className="space-y-6">
                
                {/* Method toggl chips */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setPaymentType('card');
                      setErrorText('');
                    }}
                    className={`p-4 rounded-lg flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      paymentType === 'card'
                        ? 'border-[#041627] bg-[#041627]/5 text-[#041627]'
                        : 'border-[#c4c6cd]/50 bg-[#f9f9f9] text-[#605e59] opacity-70'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 stroke-[1.8]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">BANK CARD</span>
                  </button>

                  <button
                    onClick={() => {
                      setPaymentType('wallet');
                      setErrorText('');
                    }}
                    className={`p-4 rounded-lg flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      paymentType === 'wallet'
                        ? 'border-[#041627] bg-[#041627]/5 text-[#041627]'
                        : 'border-[#c4c6cd]/50 bg-[#f9f9f9] text-[#605e59] opacity-70'
                    }`}
                  >
                    <Wallet className="w-5 h-5 stroke-[1.8]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">DIGITAL WALLET</span>
                  </button>
                </div>

                {/* Form panels based on type chosen */}
                {paymentType === 'card' ? (
                  <div className="space-y-4 animate-fade-in">
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="Card Number"
                      value={cardDetails.number}
                      onChange={(e) => {
                        // formats loosely like card spaces
                        const v = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setCardDetails({ ...cardDetails, number: v });
                      }}
                      className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-3.5 px-3 rounded-t-lg text-sm transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#e6e2db]/30 rounded-lg text-xs text-[#484742] leading-relaxed border border-[#c4c6cd]/20 animate-fade-in">
                    You have chosen digital payment gateway authorization. Upon order placement, you will be directed to authorize via standard secure popup structures.
                  </div>
                )}

              </div>

              {/* Navigation layout */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep(CheckoutStep.Shipping)}
                  className="flex-1 border border-[#c4c6cd] text-[#041627] py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-black/5 cursor-pointer"
                >
                  BACK
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  className="flex-[2] bg-[#041627] text-white py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-[#1a2b3c] shadow-sm cursor-pointer"
                >
                  REVIEW ORDER
                </button>
              </div>

            </section>
          )}

          {/* STEP 3: FINAL REVIEW */}
          {step === CheckoutStep.Review && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-[#041627] font-sans">
                Order Review
              </h2>

              {/* Cart review recap bubble */}
              <div className="bg-white border border-[#cac6bf]/20 rounded-xl p-4 shadow-[0_4px_25px_rgba(26,43,60,0.02)] space-y-4">
                
                {/* Scrollable loop for space boundaries */}
                <div className="max-h-[220px] overflow-y-auto divide-y divide-[#cac6bf]/10 pr-1 no-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3.5 py-2.5 first:pt-0 last:pb-0">
                      <div className="w-14 h-18 bg-[#eeeeee] rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-[#041627] truncate">{item.product.name}</p>
                        <p className="text-[11px] text-[#605e59] mt-0.5">
                          Qty: {item.quantity} / {item.selectedSize}
                        </p>
                        <p className="text-sm font-semibold text-[#041627] mt-1">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submetrics total grids */}
                <div className="border-t border-[#cac6bf]/20 pt-3.5 space-y-2">
                  <div className="flex justify-between text-xs text-[#605e59]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#605e59]">
                    <span>Shipping</span>
                    <span>{isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-[#041627] font-extrabold text-base pt-2 border-t border-[#cac6bf]/10">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

              </div>

              {/* Delivery & details meta indicators */}
              <div className="grid grid-cols-1 gap-3 text-xs">
                
                <div className="p-4 bg-[#e6e2db]/40 rounded-lg">
                  <p className="font-bold text-[#605e59] uppercase tracking-wider mb-1">SHIPPING TO</p>
                  <p className="text-[#041627] font-medium">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-[#484742] mt-0.5">
                    {address.streetAddress}{address.apartment ? `, ${address.apartment}` : ''}, {address.city}, {address.postalCode}
                  </p>
                </div>

                <div className="p-4 bg-[#e6e2db]/40 rounded-lg">
                  <p className="font-bold text-[#605e59] uppercase tracking-wider mb-1">PAYMENT METHOD</p>
                  <p className="text-[#041627] font-medium">
                    {paymentType === 'card' 
                      ? `Visa ending in ${cardDetails.number ? cardDetails.number.slice(-4) : '4242'}`
                      : 'Digital Wallet Quick Auth'
                    }
                  </p>
                </div>

              </div>

              {/* Bottom buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep(CheckoutStep.Payment)}
                  className="flex-1 border border-[#c4c6cd] text-[#041627] py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-black/5 cursor-pointer"
                >
                  BACK
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-[2] bg-[#041627] text-white py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-[#1a2b3c] shadow-sm cursor-pointer"
                >
                  PLACE ORDER
                </button>
              </div>

            </section>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION STATE */}
          {step === CheckoutStep.Success && (
            <section className="py-12 flex flex-col items-center text-center space-y-6 animate-fade-in relative">
              
              {/* Checkmark layout */}
              <div className="w-24 h-24 bg-[#041627] rounded-full flex items-center justify-center animate-bounce shadow-md">
                <Check className="w-12 h-12 text-white stroke-[3.5]" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-[#041627] font-sans tracking-tight">
                  Order Confirmed
                </h2>
                <p className="text-sm text-[#44474c] leading-relaxed max-w-sm">
                  Your serene journey has begun. We have dispatched a confirmation email; tracking details will follow shortly.
                </p>
              </div>

              {/* Action layout */}
              <div className="pt-6 w-full max-w-sm">
                <button
                  onClick={() => {
                    // Triggers state cleaning & back home
                    onSuccessReset();
                  }}
                  className="w-full bg-[#e6e2db] hover:bg-[#cac6bf] text-[#041627] py-4 rounded-lg font-bold tracking-widest text-xs uppercase transition-all shadow-sm cursor-pointer"
                >
                  CONTINUE SHOPPING
                </button>
              </div>

              <p className="text-[11px] font-bold text-[#cac6bf] uppercase tracking-[0.25em] pt-6">
                ORDER #{orderId}
              </p>

            </section>
          )}

        </div>

      </main>

    </div>
  );
};
