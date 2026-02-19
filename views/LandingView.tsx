
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Users, Sparkles, TrendingDown } from 'lucide-react';
import { db } from '../services/database';

export const LandingView: React.FC = () => {
  const settings = db.getSettings();

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100 rounded-full blur-[120px] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              Limited Offer: First 50 Applications are Free ({settings.free_slots_remaining} left)
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Reducing the <span className="text-gradient">cost</span> of opportunity.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
              We empower young people to study, work, and grow by slashings prices on transport, tools, and life essentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/apply"
                className="px-10 py-5 brand-gradient text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                Join Nexworth <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm">
                Explore Perks
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">Joined by <span className="text-indigo-600 font-bold">{settings.total_members}+</span> young achievers</p>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                  className="rounded-[2.5rem] shadow-2xl w-full h-64 object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500" 
                  alt="Young people studying" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop" 
                  className="rounded-[2.5rem] shadow-2xl w-full h-80 object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500" 
                  alt="Young people collaborating" 
                />
              </div>
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" 
                  className="rounded-[2.5rem] shadow-2xl w-full h-80 object-cover transform rotate-1 hover:rotate-0 transition-transform duration-500" 
                  alt="Youth at work" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                  className="rounded-[2.5rem] shadow-2xl w-full h-64 object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-500" 
                  alt="Student tools" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & mission */}
      <section className="py-24 px-4 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
               <div className="grid grid-cols-2 gap-6">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 card-glow">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6"><Shield size={24}/></div>
                   <h3 className="font-bold text-xl mb-2">Verified Only</h3>
                   <p className="text-slate-500 text-sm">We only partner with brands that actually care about youth mobility.</p>
                 </div>
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 card-glow mt-8">
                   <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-6"><Globe size={24}/></div>
                   <h3 className="font-bold text-xl mb-2">Zero Tracking</h3>
                   <p className="text-slate-500 text-sm">Your data is yours. We verify status without selling your profile.</p>
                 </div>
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 card-glow">
                   <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6"><TrendingDown size={24}/></div>
                   <h3 className="font-bold text-xl mb-2">Cost Negative</h3>
                   <p className="text-slate-500 text-sm">One discount usually covers the entire annual membership fee.</p>
                 </div>
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 card-glow mt-8">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6"><Users size={24}/></div>
                   <h3 className="font-bold text-xl mb-2">Youth Driven</h3>
                   <p className="text-slate-500 text-sm">Our advisory board is 100% under 25, directing every new partnership.</p>
                 </div>
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Your gateway to a <br/><span className="text-indigo-600 italic">frictionless</span> future.</h2>
              <p className="text-lg text-slate-600 mb-8 font-medium">
                Nexworth isn't just a discount card. It's an infrastructure layer for young people entering the economy. We believe that your potential shouldn't be capped by the size of your wallet.
              </p>
              <ul className="space-y-4">
                {['Single Application for all perks', 'Digital-first instant approval', 'Curated for high-impact savings'].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-800">
                    <div className="p-1 bg-emerald-500 rounded-full text-white"><CheckCircle2 size={14}/></div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-32 px-4">
        <div className="max-w-5xl mx-auto rounded-[3.5rem] brand-gradient p-12 lg:p-24 text-center text-white relative shadow-3xl overflow-hidden">
          <h2 className="text-4xl lg:text-6xl font-black mb-8 relative z-10">Start saving today.</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto relative z-10 font-medium">
            Join the first 50 signups to receive lifetime verification for £0. Access high-value discounts immediately.
          </p>
          <Link 
            to="/apply"
            className="px-12 py-6 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:bg-slate-50 hover:scale-105 transition-all shadow-xl relative z-10"
          >
            Apply for Free
          </Link>
        </div>
      </section>
    </div>
  );
};
