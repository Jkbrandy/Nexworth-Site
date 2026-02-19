
import React from 'react';
import { Shield, Users, Target, Heart } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
          Our mission is <span className="text-gradient">opportunity</span>.
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Nexworth was founded on a simple belief: your potential should never be limited by your financial background. We're building the infrastructure for youth mobility.
        </p>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6">Why we exist.</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Focused on Impact</h3>
                  <p className="text-slate-500">We target the specific costs that hold young people back: transport, learning tools, and daily essentials.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                  <p className="text-slate-500">We verify your status without selling your data. Your identity is your own, always.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Youth Led</h3>
                  <p className="text-slate-500">Nexworth is designed by the people who use it. Our advisory board is composed entirely of members under 25.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop" 
              alt="Community" 
              className="rounded-[3rem] shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs">
              <Users className="text-indigo-600 mb-4" />
              <p className="font-bold text-slate-900">"Nexworth changed how I look at my monthly budget. I can finally afford the tools I need for my course."</p>
              <p className="text-xs text-slate-400 mt-2 font-black uppercase tracking-widest">— Sarah, Design Student</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
