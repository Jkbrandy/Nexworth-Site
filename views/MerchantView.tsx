
import React from 'react';
import { MOCK_OFFERS } from '../constants';
import { Plus, BarChart3, Users, Settings } from 'lucide-react';

export const MerchantView: React.FC = () => {
  const merchantOffers = MOCK_OFFERS.slice(0, 1); // Mock: only the first one belongs to this merchant

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Partner Portal</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">National Rail Dashboard</h2>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all">
            <Plus size={20} /> Create New Offer
          </button>
        </div>

        {/* Overview Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 text-slate-400 mb-4"><Users size={20}/> <span className="text-sm font-semibold uppercase">Total Redemptions</span></div>
             <div className="text-4xl font-bold">1,248</div>
             <p className="text-emerald-600 text-xs mt-2 font-bold">+14% from last month</p>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 text-slate-400 mb-4"><BarChart3 size={20}/> <span className="text-sm font-semibold uppercase">Est. Revenue impact</span></div>
             <div className="text-4xl font-bold">£24.5k</div>
             <p className="text-slate-400 text-xs mt-2 font-medium">Tracking via secure tokens</p>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
               <div className="flex items-center gap-3 text-slate-400 mb-4"><Settings size={20}/> <span className="text-sm font-semibold uppercase">Status</span></div>
               <div className="text-emerald-600 font-bold text-xl uppercase tracking-tighter">Verified Partner</div>
             </div>
             <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
             </div>
           </div>
        </div>

        {/* My Offers */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Manage Your Active Offers</h3>
          <div className="space-y-4">
            {merchantOffers.map((offer) => (
              <div key={offer.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">{offer.category}</span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {offer.id}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{offer.title}</h4>
                  <p className="text-slate-500 text-sm mt-1">{offer.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                   <div className="text-right">
                      <div className="text-xs text-slate-400 font-medium mb-1">Redemptions</div>
                      <div className="text-2xl font-bold">842</div>
                   </div>
                   <div className="flex gap-2 w-full sm:w-auto">
                     <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">Edit</button>
                     <button className="flex-1 sm:flex-none px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Analytics</button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon Features */}
        <div className="bg-slate-200/50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-300">
           <h3 className="text-lg font-bold text-slate-600">Merchant Insights v2.0</h3>
           <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
             Coming soon: Direct customer feedback loop, AI-powered offer optimization, and regional demand forecasting.
           </p>
        </div>
      </div>
    </div>
  );
};
