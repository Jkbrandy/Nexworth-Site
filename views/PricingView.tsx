
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/database';
import { Check, Sparkles } from 'lucide-react';

export const PricingView: React.FC = () => {
  const settings = db.getSettings();

  return (
    <div className="bg-slate-50 py-24 px-4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Simple, transparent pricing.</h1>
        <p className="text-xl text-slate-600 font-medium">One card. Endless opportunities. One low price.</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden relative">
          {settings.free_slots_remaining > 0 && (
            <div className="brand-gradient text-white text-center py-2 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <Sparkles size={14} /> Only {settings.free_slots_remaining} Free Spots Remaining!
            </div>
          )}
          
          <div className="p-12">
            <h2 className="text-2xl font-black mb-2">Annual Access</h2>
            <p className="text-slate-500 mb-8 font-medium">Full access to the Nexworth Perk Directory and digital card.</p>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-slate-900">£{settings.free_slots_remaining > 0 ? '0' : settings.annual_price_gbp}</span>
                <span className="text-slate-400 font-bold">/ year</span>
              </div>
              {settings.free_slots_remaining > 0 && (
                <p className="text-emerald-600 font-bold mt-2 flex items-center gap-1">
                  <Sparkles size={14} /> Early Adopter Special
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-10">
              {[
                'Digital Access Card with QR',
                'Unlimited Partner Redemptions',
                'Early access to new perks',
                'Study & Career tool discounts',
                'No hidden fees'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 font-bold">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Check size={12} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link 
              to="/apply"
              className="block w-full py-5 brand-gradient text-white text-center rounded-2xl font-black text-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Get Started Now
            </Link>
          </div>
        </div>
        
        <p className="text-center text-slate-400 mt-8 text-sm font-medium">
          Membership automatically expires after 1 year. We'll remind you to renew.
        </p>
      </div>
    </div>
  );
};
