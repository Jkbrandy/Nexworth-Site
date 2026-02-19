
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/database';
import { ApplicationStatus, UserRole } from '../types';
import { ArrowRight, CheckCircle2, Shield, Loader2, CreditCard, Sparkles, Mail, Download } from 'lucide-react';

export const ApplyView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', country: 'United Kingdom' });
  const navigate = useNavigate();
  const settings = db.getSettings();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      db.submitApplication(formData);
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleMembership = () => {
    setLoading(true);
    setTimeout(() => {
      db.processMembership();
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const finishFlow = () => {
    onComplete();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {step === 1 && (
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-black mb-2 text-slate-900 tracking-tight">Get Your Access Card</h1>
            <p className="text-slate-500 mb-8 font-medium">One simple application for all your youth perks.</p>
            
            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Sterling"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Country</label>
                <select 
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold appearance-none"
                >
                  <option>United Kingdom</option>
                  <option>Singapore</option>
                  <option>United States</option>
                </select>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 brand-gradient text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Next Step <ArrowRight/></>}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Application Approved</h2>
            <p className="text-slate-600 mb-10 font-medium leading-relaxed">We've verified your status. You're ready to activate your Nexworth Access Card.</p>
            
            <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] text-left mb-10">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-black text-indigo-900">Nexworth Annual Access</h3>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Digital Card + Partner Directory</p>
                  </div>
                  <Sparkles className="text-indigo-400 animate-pulse" />
               </div>
               
               <div className="flex items-center justify-between pt-6 border-t border-indigo-200">
                  <div className="text-sm font-bold text-indigo-700">Total Due</div>
                  <div className="text-3xl font-black text-indigo-900">
                    {settings.free_slots_remaining > 0 ? (
                      <span className="flex items-center gap-2">
                        <span className="line-through text-indigo-300 text-xl">£10</span> £0
                      </span>
                    ) : '£10'}
                  </div>
               </div>
               {settings.free_slots_remaining > 0 && (
                 <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                    Free Tier Applied ({settings.free_slots_remaining} slots left)
                 </div>
               )}
            </div>

            <button 
              onClick={handleMembership}
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><CreditCard/> Activate My Card</>}
            </button>
            <p className="text-[10px] text-slate-400 mt-6 uppercase tracking-[0.2em] font-black">Secure Checkout by Stripe Simulation</p>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 text-center animate-in slide-in-from-bottom-8 duration-700">
             <div className="w-24 h-24 brand-gradient text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <Mail size={48} className="animate-bounce" />
             </div>
             <h2 className="text-4xl font-black mb-6 text-slate-900 tracking-tight">Check Your Inbox!</h2>
             <p className="text-lg text-slate-600 mb-12 font-medium leading-relaxed px-4">
                We've sent your **Nexworth Digital Card** and **secure QR code** to <span className="text-indigo-600 font-bold">{formData.email}</span>. 
                Keep it safe—you'll need it to redeem perks at our partner locations.
             </p>
             
             <div className="flex flex-col gap-4">
                <button 
                  onClick={finishFlow}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all"
                >
                  Go to Member Portal
                </button>
                <div className="flex items-center justify-center gap-3 text-slate-400 font-bold text-sm bg-slate-50 py-4 rounded-2xl">
                   <Download size={18} /> <span>Card PDF Downloaded</span>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
