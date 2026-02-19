
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { UserRole } from '../types';
import { CreditCard, LogOut, Menu, X, LayoutDashboard, Ticket, ShieldCheck, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  // Added explicit type definition to fix TypeScript error where 'icon' property was missing on VISITOR role links.
  const navLinks: Record<UserRole, Array<{ name: string; path: string; icon?: React.ReactNode }>> = {
    [UserRole.VISITOR]: [
      { name: 'How it Works', path: '/' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'About', path: '/about' },
    ],
    [UserRole.MEMBER]: [
      { name: 'Dashboard', icon: <LayoutDashboard size={18}/>, path: '/app' },
      { name: 'My Perks', icon: <Ticket size={18}/>, path: '/app/offers' },
    ],
    [UserRole.MERCHANT]: [
      { name: 'Merchant Hub', icon: <LayoutDashboard size={18}/>, path: '/merchant' },
      { name: 'Campaigns', icon: <Ticket size={18}/>, path: '/merchant/offers' },
    ],
    [UserRole.ADMIN]: [
      { name: 'Intelligence', icon: <Sparkles size={18}/>, path: '/admin' },
      { name: 'Reviews', icon: <ShieldCheck size={18}/>, path: '/admin/apps' },
    ],
  };

  const currentLinks = navLinks[userRole] || navLinks[UserRole.VISITOR];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform">
                <CreditCard className="text-white" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">nexworth</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {currentLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    text-sm font-bold tracking-wide transition-colors flex items-center gap-2
                    ${isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}
                  `}
                >
                  {/* Fixed Property 'icon' does not exist error by using typed navLinks */}
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              {userRole !== UserRole.VISITOR ? (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-black uppercase tracking-widest text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/apply"
                  className="px-6 py-3 brand-gradient text-white rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-xl transition-all hover:scale-105"
                >
                  Apply Now
                </Link>
              )}
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 bg-slate-100 p-2 rounded-lg">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-6 shadow-2xl">
            {currentLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  flex items-center gap-3 text-lg font-bold p-2
                  ${isActive ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {/* Fixed Property 'icon' does not exist error by using typed navLinks */}
                {link.icon}
                {link.name}
              </NavLink>
            ))}
            {userRole === UserRole.VISITOR && (
              <Link
                to="/apply"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-4 text-center brand-gradient text-white rounded-2xl font-black tracking-widest uppercase shadow-xl"
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white text-slate-500 py-16 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <CreditCard className="text-white" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">nexworth</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed font-medium">
              We're building a future where your ambition isn't limited by your background. Reducing the cost of opportunity for every young person.
            </p>
          </div>
          <div>
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/about" className="hover:text-indigo-600">Our Story</Link></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              <li><Link to="/contact" className="hover:text-indigo-600">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <p>© 2024 Nexworth Global. Built for the next generation.</p>
          <div className="flex gap-6">
            <span>Social Justice x Fintech</span>
            <span>UK Charity ID: 123456</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
