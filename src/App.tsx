import { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  ShoppingBag, 
  User, 
  Mail, 
  Heart, 
  Sparkles, 
  X, 
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Product, CartItem, TabType } from './types';
import { products, initialCartItems } from './data';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/HomeScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';

export default function App() {
  // Tabs Navigation
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  
  // Custom states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkingOut, setCheckingOut] = useState<boolean>(false);
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  
  // Local persistence for cart items, seeded with the mock selections showing Qty 4 items, totaling $215.00
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('serene_cart_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fall back if parses fails
      }
    }
    return initialCartItems;
  });

  // Write changes to localStorage on edit
  useEffect(() => {
    localStorage.setItem('serene_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: Product, color: string, size: string) => {
    // Unique ID combining product id plus options
    const combinationId = `${product.id}-${color}-${size}`;

    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === combinationId);
      if (exists) {
        return prevItems.map((item) => 
          item.id === combinationId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: combinationId,
          product,
          quantity: 1,
          selectedColor: color,
          selectedSize: size,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Search tab specific states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filtered catalog
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Decor') return matchesSearch && (p.id === 'ceramic-vase' || p.id === 'vessel-no-4');
    if (selectedCategory === 'Wearables') return matchesSearch && (p.id === 'serene-frames' || p.id === 'tempo-runner' || p.id === 'studio-carryall' || p.id === 'linen-shorts' || p.id === 'arcane-sneaker');
    if (selectedCategory === 'Aromatics') return matchesSearch && (p.id === 'sandalwood-candle' || p.id === 'face-oil');
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#d2e4fb] selection:text-[#0b1d2d] font-sans">
      
      {/* Global custom Sidebar menu drawer */}
      {sideMenuOpen && (
        <div className="fixed inset-0 bg-[#041627]/40 z-50 backdrop-blur-xs flex animate-fade-in" onClick={() => setSideMenuOpen(false)}>
          <div 
            className="w-72 bg-[#f9f9f9] h-full shadow-2xl p-6 flex flex-col justify-between animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-[#041627] tracking-tight">Serene Menu</span>
                <button 
                  onClick={() => setSideMenuOpen(false)}
                  className="p-1 text-[#605e59] hover:text-[#041627]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#605e59] mb-3">Collections</h4>
                  <ul className="space-y-3.5 text-sm font-medium text-[#041627]">
                    <li className="cursor-pointer hover:underline" onClick={() => { setSideMenuOpen(false); setSelectedProduct(products.find(p => p.id === 'ceramic-vase')!); }}>
                      Minimalist Ceramic Vase
                    </li>
                    <li className="cursor-pointer hover:underline" onClick={() => { setSideMenuOpen(false); setSelectedProduct(products.find(p => p.id === 'serene-frames')!); }}>
                      Designer Eyewear
                    </li>
                    <li className="cursor-pointer hover:underline" onClick={() => { setSideMenuOpen(false); setSelectedProduct(products.find(p => p.id === 'tempo-runner')!); }}>
                      Active performance
                    </li>
                    <li className="cursor-pointer hover:underline" onClick={() => { setSideMenuOpen(false); setSelectedProduct(products.find(p => p.id === 'studio-carryall')!); }}>
                      Studio Carryall
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#cac6bf]/30 pt-6">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#605e59] mb-3">Brand Info</h4>
                  <ul className="space-y-2 text-xs text-[#484742]">
                    <li>Our Artisanal Story</li>
                    <li>Sourcing &amp; Materials</li>
                    <li>Eco Curation Initiative</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#e6e2db]/30 rounded-lg flex items-center gap-2 text-xs text-[#605e59]">
              <Sparkles className="w-4 h-4 text-[#feddb5] fill-[#feddb5]" />
              <span>Complimentary support line active.</span>
            </div>
          </div>
        </div>
      )}

      {/* RENDER PHASE */}
      {checkingOut ? (
        // CHECKOUT FLOW SCREEN
        <CheckoutScreen 
          cartItems={cartItems}
          cartCount={cartCount}
          onSuccessReset={() => {
            setCartItems([]); // Reset active cart
            setCheckingOut(false);
            setSelectedProduct(null);
            setActiveTab('Home');
          }}
          onCancel={() => setCheckingOut(false)}
        />
      ) : selectedProduct ? (
        // SINGLE PRODUCT COMPREHENSIVE DETAIL SCREEN
        <ProductDetailScreen 
          product={selectedProduct}
          cartCount={cartCount}
          onBack={() => setSelectedProduct(null)}
          onNavigateToCart={() => {
            setSelectedProduct(null);
            setActiveTab('Cart');
          }}
          onAddToCart={handleAddToCart}
        />
      ) : (
        // REGULAR TAB VIEWPORTS
        <>
          {/* Main Top Header Navigation */}
          <TopAppBar 
            cartCount={cartCount}
            activeTab={activeTab}
            onOpenMenu={() => setSideMenuOpen(true)}
            onNavigate={(navTab) => {
              setSelectedProduct(null);
              setActiveTab(navTab);
            }}
          />

          {/* Main Container Workspace */}
          <main className="w-full pt-16 min-h-screen">
            
            {/* TAB CONTENT SWITCH */}
            {activeTab === 'Home' && (
              <HomeScreen 
                products={products}
                onProductClick={(p) => setSelectedProduct(p)}
                onAddToCart={handleAddToCart}
              />
            )}

            {activeTab === 'Search' && (
              <div className="w-full pb-24 px-4 max-w-2xl mx-auto animate-fade-in">
                <header className="py-6">
                  <h2 className="text-2xl font-semibold text-[#041627] mb-1 font-sans">
                    Explore Catalogue
                  </h2>
                  <p className="text-sm text-[#605e59]">
                    Discover effortless luxury silhouettes and organic accessories.
                  </p>
                </header>

                {/* Styled Search Text Input Box */}
                <div className="relative mb-6">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#74777d]">
                    <Search className="w-5 h-5 stroke-[1.8]" />
                  </span>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search frames, vessels, apparel..."
                    className="w-full bg-[#f3f3f3] border-b border-[#c4c6cd] py-4 pl-12 pr-4 text-sm rounded-t-lg transition-all focus:outline-none focus:border-[#041627] focus:ring-0"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide font-bold text-[#605e59]"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Chips Scroller */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                  {['All', 'Decor', 'Aromatics', 'Wearables'].map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap border cursor-pointer transition-all duration-200 ${
                          isActive 
                            ? 'bg-[#041627] text-white border-[#041627]' 
                            : 'bg-white text-[#605e59] border-[#cac6bf]/50 hover:bg-[#cac6bf]/20'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Search Results Listing Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {filteredProducts.map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className="group cursor-pointer select-none border border-[#cac6bf]/10 rounded-xl p-2 bg-white flex flex-col justify-between"
                      >
                        <div className="aspect-[3/4] bg-[#eeeeee] rounded-lg overflow-hidden mb-2">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                        </div>
                        <div>
                          <p className="text-xs text-[#605e59] truncate font-sans">{p.name}</p>
                          <p className="text-sm font-semibold text-[#041627] mt-0.5">${p.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-[#605e59] font-sans">
                      No products aligned with your search requirements. Try alternative descriptors.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Cart' && (
              <CartScreen 
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onProceedToCheckout={() => setCheckingOut(true)}
                onContinueShopping={() => setActiveTab('Home')}
              />
            )}

            {activeTab === 'Profile' && (
              <div className="w-full pb-24 px-4 max-w-2xl mx-auto animate-fade-in">
                <header className="py-6">
                  <h2 className="text-2xl font-semibold text-[#041627] mb-1 font-sans">
                    My Account
                  </h2>
                  <p className="text-sm text-[#605e59]">
                    Manage credentials, transactions, and membership perks.
                  </p>
                </header>

                <div className="space-y-6">
                  
                  {/* Premium badge and Email holder */}
                  <div className="p-5 bg-[#041627] text-white rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-4 h-4 text-[#feddb5] fill-[#feddb5]" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#feddb5]">Serene+ Premium</span>
                      </div>
                      <p className="text-sm font-medium tracking-tight">subhasmitapanda4106@gmail.com</p>
                    </div>
                    <span className="bg-[#cac6bf]/20 text-white border border-white/20 text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded">
                      VIP ACTIVE
                    </span>
                  </div>

                  {/* Profile generic menu board */}
                  <div className="bg-white border border-[#cac6bf]/20 rounded-xl divide-y divide-[#cac6bf]/10 overflow-hidden text-sm">
                    <div className="p-4 cursor-pointer hover:bg-[#e3dfd8]/10 flex justify-between items-center" onClick={() => alert("Personal Details settings are locked offline for demo purposes.")}>
                      <span className="text-[#041627] font-medium">Personal Details</span>
                      <span className="text-xs text-[#74777d]">alex@serene.com</span>
                    </div>

                    <div className="p-4 cursor-pointer hover:bg-[#e3dfd8]/10 flex justify-between items-center" onClick={() => alert("Simulated list holds past order entries. Primary tracking live soon.")}>
                      <span className="text-[#041627] font-medium">Transaction History</span>
                      <span className="text-xs text-[#605e59]">2 Orders pending</span>
                    </div>

                    <div className="p-4 cursor-pointer hover:bg-[#e3dfd8]/10 flex justify-between items-center" onClick={() => alert("Address book configuration updates pending store live setting.")}>
                      <span className="text-[#041627] font-medium">Saved Addresses</span>
                      <span className="text-xs text-[#605e59]">1 Default</span>
                    </div>

                    <div className="p-4 cursor-pointer hover:bg-[#e3dfd8]/10 flex justify-between items-center" onClick={() => alert("Membership benefits: Free shipping on all orders, premium early drop access keys.")}>
                      <span className="text-[#041627] font-medium">Serene+ Perks</span>
                      <span className="text-xs text-[#281802] font-bold tracking-wider font-mono">EARLY ACCESS ENABLED</span>
                    </div>
                  </div>

                  {/* Quick stats panels */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-[#cac6bf]/20 rounded-xl text-center">
                      <p className="text-xs uppercase tracking-wider text-[#605e59] mb-1">Items saved</p>
                      <h4 className="text-xl font-bold text-[#041627]">14</h4>
                    </div>
                    <div className="p-4 bg-white border border-[#cac6bf]/20 rounded-xl text-center">
                      <p className="text-xs uppercase tracking-wider text-[#605e59] mb-1">Bonus Credits</p>
                      <h4 className="text-xl font-bold text-[#38260b]">$45.00</h4>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </main>

          {/* Persistent global responsive bottom drawer nav bar */}
          <BottomNavBar 
            activeTab={activeTab}
            onTabChange={(tabValue) => {
              setSelectedProduct(null);
              setActiveTab(tabValue);
            }}
            cartCount={cartCount}
          />
        </>
      )}

    </div>
  );
}
