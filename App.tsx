
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserRole, Profile, ApplicationStatus } from './types';
import { Layout } from './components/Layout';
import { LandingView } from './views/LandingView';
import { MemberView } from './views/MemberView';
import { MerchantView } from './views/MerchantView';
import { AdminView } from './views/AdminView';
import { ApplyView } from './views/ApplyView';
import { AboutView } from './views/AboutView';
import { PricingView } from './views/PricingView';
import { db } from './services/database';
import { Settings, RefreshCw, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(db.getProfile());
  const [showDevPanel, setShowDevPanel] = useState(false);

  // Sync state with simulated DB
  const refreshState = () => {
    setProfile(db.getProfile());
  };

  const handleLogout = () => {
    db.updateProfile({ role: UserRole.VISITOR });
    refreshState();
    window.location.hash = '/';
  };

  return (
    <Router>
      <Layout 
        userRole={profile.role} 
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/pricing" element={<PricingView />} />
          <Route path="/apply" element={<ApplyView onComplete={refreshState} />} />
          
          <Route path="/app/*" element={
            profile.role === UserRole.MEMBER ? <MemberView profile={profile} /> : <Navigate to="/apply" />
          } />
          
          <Route path="/merchant/*" element={
            profile.role === UserRole.MERCHANT ? <MerchantView /> : <Navigate to="/" />
          } />
          
          <Route path="/admin/*" element={
            profile.role === UserRole.ADMIN ? <AdminView /> : <Navigate to="/" />
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Development Controls - Professional Toggle */}
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
          {showDevPanel && (
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-3xl shadow-2xl w-64 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Simulate Roles</span>
                <button onClick={() => db.reset()} className="p-1 hover:text-white text-slate-400 transition-colors">
                  <RefreshCw size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[UserRole.VISITOR, UserRole.MEMBER, UserRole.MERCHANT, UserRole.ADMIN].map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      db.updateProfile({ role });
                      refreshState();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all text-left flex justify-between items-center ${
                      profile.role === role 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                    {profile.role === role && <Eye size={12}/>}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button 
            onClick={() => setShowDevPanel(!showDevPanel)}
            className="w-12 h-12 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border border-slate-700"
          >
            <Settings size={20} className={showDevPanel ? 'rotate-90 transition-transform' : ''} />
          </button>
        </div>
      </Layout>
    </Router>
  );
};

export default App;
