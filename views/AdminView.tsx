
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
// Added ArrowRight to imports
import { Users, FileText, CheckSquare, TrendingUp, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { getAdminAnalyticsSummary } from '../services/geminiService';

const MOCK_STATS = {
  totalUsers: 2450,
  pendingApps: 14,
  activePartners: 32,
  redemptionsToday: 156
};

const CHART_DATA = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

export const AdminView: React.FC = () => {
  const [aiSummary, setAiSummary] = React.useState('Analyzing platform data for insights...');

  React.useEffect(() => {
    const fetchSummary = async () => {
      const summary = await getAdminAnalyticsSummary(MOCK_STATS);
      setAiSummary(summary);
    };
    fetchSummary();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
           <div>
              <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mb-1">
                 <Zap size={14} fill="currentColor"/> Command Centre
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Nexworth Intel</h1>
           </div>
           <div className="flex gap-2">
             <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm">
               Live: 42 Active Sessions
             </div>
           </div>
        </header>

        {/* Intelligence Insight Bar */}
        <div className="holographic-card text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 flex-shrink-0 animate-pulse">
               <Sparkles size={32} />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-black text-2xl mb-2 tracking-tight">Gemini Growth Summary</h3>
              <p className="text-indigo-50 leading-relaxed text-lg font-medium italic opacity-90">"{aiSummary}"</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Members', value: MOCK_STATS.totalUsers, icon: <Users size={24} />, trend: '+12.4%', color: 'indigo' },
            { label: 'Pending Apps', value: MOCK_STATS.pendingApps, icon: <FileText size={24} />, trend: '-2', color: 'purple' },
            { label: 'Active Partners', value: MOCK_STATS.activePartners, icon: <CheckSquare size={24} />, trend: '+4', color: 'cyan' },
            { label: 'Daily Activity', value: MOCK_STATS.redemptionsToday, icon: <TrendingUp size={24} />, trend: '+24%', color: 'emerald' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
               <div className="flex justify-between items-start mb-6">
                 <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                 </div>
                 <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                   {stat.trend}
                 </span>
               </div>
               <div className="text-4xl font-black text-slate-900 mb-1">{stat.value.toLocaleString()}</div>
               <div className="text-xs text-slate-400 font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-black mb-10 uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <TrendingUp size={18}/> Velocity Tracking
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '15px'}} />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-xl font-black mb-8">Priority Reviews</h3>
              <div className="space-y-4 flex-grow">
                 {[
                   { name: 'Sarah Jenkins', country: 'UK', date: '2h ago', img: '12' },
                   { name: 'Marcus Wong', country: 'SG', date: '5h ago', img: '15' },
                   { name: 'Elena Rossi', country: 'IT', date: '1d ago', img: '21' },
                   { name: 'John Smith', country: 'US', date: '1d ago', img: '30' }
                 ].map((app, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                     <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/100?img=${app.img}`} className="w-10 h-10 rounded-xl" alt="avatar" />
                        <div>
                           <div className="text-sm font-black text-slate-900">{app.name}</div>
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.country} • {app.date}</div>
                        </div>
                     </div>
                     <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors group-hover:scale-110">
                        <ArrowRight size={18}/>
                     </button>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs mt-8 shadow-lg hover:shadow-indigo-100">
                 Review All Pending
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
