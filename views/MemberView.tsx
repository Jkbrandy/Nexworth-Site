
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { MOCK_OFFERS } from '../constants';
import { Offer, OfferCategory, Profile, ApplicationStatus } from '../types';
import { Search, QrCode, CreditCard, ExternalLink, Sparkles, Ticket, LayoutGrid, Zap, Globe, Loader2 } from 'lucide-react';
import { getOfferInsights } from '../services/geminiService';

export const MemberView: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInsights, setAiInsights] = useState<Record<string, string>>({});
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();

  const categories = ['All', ...Object.values(OfferCategory)];

  const filteredOffers = MOCK_OFFERS.filter(offer => {
    const matchesCategory = selectedCategory === 'All' || offer.category === selectedCategory;
    const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          offer.merchant_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const loadInsights = async () => {
      const topOffers = MOCK_OFFERS.slice(0, 2);
      const results: Record<string, string> = {};
      for (const offer of topOffers) {
        results[offer.id] = await getOfferInsights(offer.title, offer.description);
      }
      setAiInsights(results);
    };
    loadInsights();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-24 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Hello, {profile.full_name.split(' ')[0]} 👋</h1>
            <p className="text-slate-500 font-medium">Your Nexworth Access is <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Active</span></p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={() => setShowQR(true)}
               className="flex items-center gap-2 px-5 py-2.5 brand-gradient text-white rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all"
             >
               <QrCode size={18}/> Fast Scan
             </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <div className="space-y-12">
               {/* Card & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Holographic Card */}
                <div className="lg:col-span-2 holographic-card p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between min-h-[300px] border-4 border-white/20">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-white">
                            <CreditCard size={24} />
                         </div>
                         <div className="text-white">
                            <div className="text-xs font-bold uppercase tracking-widest opacity-80">Access Card</div>
                            <div className="font-black text-xl tracking-tight">Nexworth Premium</div>
                         </div>
                      </div>
                      <div className="text-white/40 font-mono text-xs">#NX-2024-8842</div>
                   </div>

                   <div className="mt-8">
                      <div className="text-white text-4xl font-black mb-1 tracking-tighter drop-shadow-md">{profile.full_name}</div>
                      <div className="flex items-center gap-4 text-white/80 text-sm font-bold">
                         <span className="flex items-center gap-1"><Globe size={14}/> {profile.country}</span>
                         <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                         <span>MEMBER SINCE 2024</span>
                      </div>
                   </div>

                   <div className="flex justify-between items-end mt-8">
                      <div className="flex gap-8">
                         <div>
                            <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1 text-white">Status</div>
                            <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-black text-white border border-white/10 uppercase tracking-widest">Active</div>
                         </div>
                         <div>
                            <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1 text-white">Exp Date</div>
                            <div className="text-xs font-black text-white">12 / 2025</div>
                         </div>
                      </div>
                      <div className="w-16 h-16 bg-white p-2 rounded-xl shadow-inner">
                         <QrCode className="text-slate-900 w-full h-full" />
                      </div>
                   </div>
                </div>

                {/* Quick Stats / Scanner */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Activity</h3>
                  <div className="space-y-4">
                     {[
                       { title: 'National Rail', date: '2 days ago', amount: '-£14.20' },
                       { title: 'Adobe CC', date: '1 week ago', amount: '-£22.00' }
                     ].map((item, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div>
                           <div className="text-sm font-bold">{item.title}</div>
                           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.date}</div>
                         </div>
                         <div className="text-emerald-600 font-black">{item.amount}</div>
                       </div>
                     ))}
                  </div>
                  <Link to="offers" className="w-full py-4 brand-gradient text-white rounded-2xl font-bold mt-8 shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                     <Sparkles size={18}/> Explore New Perks
                  </Link>
                </div>
              </div>

              {/* Highlight Offers */}
              <section>
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black">Featured for You</h2>
                    <Link to="offers" className="text-indigo-600 font-bold text-sm hover:underline">View All</Link>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_OFFERS.slice(0, 3).map(offer => (
                      <OfferCard key={offer.id} offer={offer} insight={aiInsights[offer.id]} />
                    ))}
                 </div>
              </section>
            </div>
          } />

          <Route path="/offers" element={
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Perk Directory</h2>
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search brand or category..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      selectedCategory === cat 
                        ? 'bg-slate-900 text-white shadow-xl' 
                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} insight={aiInsights[offer.id]} />
                ))}
              </div>
            </div>
          } />
        </Routes>

        {/* Modal QR Scanner Simulation */}
        {showQR && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowQR(false)}></div>
             <div className="bg-white w-full max-w-sm rounded-[3rem] p-12 text-center relative z-10 shadow-3xl animate-in zoom-in-95 duration-300">
                <h3 className="text-2xl font-black mb-2">Ready to Scan</h3>
                <p className="text-slate-500 mb-10 font-medium">Show this to the merchant to apply your Nexworth discount.</p>
                
                <div className="w-64 h-64 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden mx-auto mb-10">
                  <QrCode size={180} className="text-slate-800" />
                  <div className="absolute inset-x-0 h-1 bg-indigo-500 animate-[bounce_2s_infinite] top-0 opacity-50 shadow-lg shadow-indigo-500"></div>
                </div>
                
                <button 
                  onClick={() => setShowQR(false)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Close Scanner
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OfferCard: React.FC<{ offer: Offer, insight?: string }> = ({ offer, insight }) => (
  <div className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full shadow-lg shadow-slate-200/50">
    <div className="relative h-44 overflow-hidden">
       <img src={`https://picsum.photos/seed/${offer.id}/600/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={offer.merchant_name} />
       <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase rounded-full shadow-sm tracking-widest border border-white/50">
            {offer.category}
          </span>
       </div>
       <div className="absolute bottom-4 right-4">
          <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-lg">
            {offer.discount_value} OFF
          </div>
       </div>
    </div>
    
    <div className="p-8 flex-grow">
      <h3 className="text-2xl font-black mb-1 text-slate-900 group-hover:text-indigo-600 transition-colors">{offer.merchant_name}</h3>
      <h4 className="text-slate-500 font-bold mb-4 text-sm">{offer.title}</h4>
      
      {insight && (
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl mb-4 flex gap-3 items-start">
           <Sparkles className="text-indigo-600 mt-1 flex-shrink-0" size={16} />
           <p className="text-xs text-indigo-700 font-bold italic leading-relaxed">"{insight}"</p>
        </div>
      )}
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{offer.description}</p>
    </div>
    
    <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Offer</span>
      <button className="px-5 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-indigo-600 transition-all">
        Redeem
      </button>
    </div>
  </div>
);
