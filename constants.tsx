
import React from 'react';
import { Offer, OfferCategory, UserRole, ApplicationStatus, Profile } from './types';

export const MOCK_OFFERS: Offer[] = [
  {
    id: 'o1',
    merchant_id: 'm1',
    merchant_name: 'National Rail',
    title: '33% Off All Travel',
    description: 'Get a third off all standard off-peak rail fares across the UK.',
    category: OfferCategory.TRANSPORT,
    terms: 'Valid for ages 16-25. Must present Nexworth card upon inspection.',
    discount_type: 'percentage',
    discount_value: '33%',
    expiry_date: '2025-12-31',
    status: 'published'
  },
  {
    id: 'o2',
    merchant_id: 'm2',
    merchant_name: 'CodeAcademy',
    title: 'Free Pro Access for 6 Months',
    description: 'Learn to code with full access to career paths and projects.',
    category: OfferCategory.SKILLS,
    terms: 'One-time redemption per member.',
    discount_type: 'freebie',
    discount_value: '100%',
    expiry_date: '2025-06-30',
    status: 'published'
  },
  {
    id: 'o3',
    merchant_id: 'm3',
    merchant_name: 'Adobe Creative Cloud',
    title: '60% Student Discount',
    description: 'Access Photoshop, Illustrator, and more at a fraction of the cost.',
    category: OfferCategory.DIGITAL,
    terms: 'Requires verification of youth status via Nexworth.',
    discount_type: 'percentage',
    discount_value: '60%',
    expiry_date: '2025-12-31',
    status: 'published'
  },
  {
    id: 'o4',
    merchant_id: 'm4',
    merchant_name: 'Tesco',
    title: '£5 Off Weekly Groceries',
    description: 'Save on your weekly essentials when you spend over £40.',
    category: OfferCategory.ESSENTIALS,
    terms: 'Valid at all participating superstores.',
    discount_type: 'fixed',
    discount_value: '£5',
    expiry_date: '2024-12-31',
    status: 'published'
  }
];

// Added membership_paid: false to fix Property 'membership_paid' is missing error
export const INITIAL_PROFILE: Profile = {
  user_id: 'u123',
  full_name: 'Alex Sterling',
  email: 'alex@example.com',
  country: 'United Kingdom',
  role: UserRole.VISITOR,
  status: ApplicationStatus.APPLIED,
  joined_at: '2024-01-15',
  membership_paid: false
};
