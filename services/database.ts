
import { Profile, UserRole, ApplicationStatus, PlatformSettings } from '../types';
import { INITIAL_PROFILE } from '../constants';

const DB_KEY = 'nexworth_db_v1';

interface DB {
  profile: Profile;
  settings: PlatformSettings;
  applications: Profile[];
}

const DEFAULT_DB: DB = {
  profile: INITIAL_PROFILE,
  settings: {
    free_slots_remaining: 8,
    total_members: 2450,
    annual_price_gbp: 10
  },
  applications: []
};

class DatabaseService {
  private db: DB;

  constructor() {
    const saved = localStorage.getItem(DB_KEY);
    this.db = saved ? JSON.parse(saved) : DEFAULT_DB;
  }

  private save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.db));
  }

  getProfile() { return this.db.profile; }
  getSettings() { return this.db.settings; }
  getApplications() { return this.db.applications; }

  updateProfile(updates: Partial<Profile>) {
    this.db.profile = { ...this.db.profile, ...updates };
    this.save();
    return this.db.profile;
  }

  submitApplication(data: { name: string, email: string, country: string }) {
    const newProfile: Profile = {
      ...this.db.profile,
      full_name: data.name,
      email: data.email,
      country: data.country,
      status: ApplicationStatus.APPLIED,
      joined_at: new Date().toISOString(),
      verification_id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      activation_code: Math.floor(100000 + Math.random() * 900000).toString()
    };
    
    this.db.profile = newProfile;
    this.db.applications.push(newProfile);
    this.save();
    return newProfile;
  }

  processMembership() {
    if (this.db.settings.free_slots_remaining > 0) {
      this.db.settings.free_slots_remaining--;
      this.db.profile.membership_paid = true;
    } else {
      this.db.profile.membership_paid = true;
    }
    this.db.profile.status = ApplicationStatus.ACTIVE;
    this.db.profile.role = UserRole.MEMBER;
    this.save();
  }

  // Simulated public verification check
  getVerificationStatus(verificationId: string) {
    // Check main profile or applications list
    if (this.db.profile.verification_id === verificationId) {
      return this.db.profile;
    }
    return this.db.applications.find(a => a.verification_id === verificationId);
  }

  reset() {
    this.db = DEFAULT_DB;
    this.save();
    window.location.reload();
  }
}

export const db = new DatabaseService();
