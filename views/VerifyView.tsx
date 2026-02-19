
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/database';
import { Profile, ApplicationStatus } from '../types';
import { ShieldCheck, ShieldAlert, CreditCard, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export const VerifyView: React.FC = () => {
  const { verificationId } = useParams<{ verificationId: string }>();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      if (verificationId) {
        setProfile(db.getVerificationStatus(verificationId));
      }
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [verificationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Verifying Authenticity...</h2>
      </div>
    );
  }

  const isValid = profile && profile.status === ApplicationStatus.ACTIVE;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden text-center p-12">
        {isValid ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
               <ShieldCheck size={48} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Access Verified</h1>
            <p className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-8">Active Nexworth Member</p>
            
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 text-left mb-8">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-white">
                     <CreditCard size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Member</div>
                    <div className="text-lg font-black text-slate-900">{profile.full_name}</div>
                  </div>
               </div>
               <div className="flex justify-between items-center text-sm font-bold pt-4 border-t border-slate-200">
                  <span className="text-slate-500">Validity Status</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={16} /> VALID
                  </span>
               </div>
            </div>
            
            <div className="text-xs text-slate-400 font-bold px-4 leading-relaxed">
              This verification proves that the user is a verified Nexworth Access Card holder entitled to all platform perks.
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
               <ShieldAlert size={48} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Invalid Status</h1>
            <p className="text-red-600 font-black uppercase tracking-widest text-xs mb-8">Verification Failed</p>
            
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100 mb-8">
               <p className="text-red-900 font-bold leading-relaxed">
                 The card scanned is either inactive, expired, or the verification ID does not match our secure records.
               </p>
            </div>
            
            <Link to="/" className="inline-block text-indigo-600 font-black text-sm uppercase tracking-widest hover:underline">
               Report an issue
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px]">
         <ShieldCheck size={14}/> Nexworth Secure Verification Protocol v1.2
      </div>
    </div>
  );
};
