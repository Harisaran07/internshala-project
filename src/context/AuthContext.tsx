'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type PlanId = 'starter' | 'standard' | 'premium' | null;
export type BillingCycle = 'monthly' | 'yearly';

// Plan contribution values per plan (monthly pool %, charity %)
export const PLAN_CONFIG: Record<string, { price: number; poolContrib: number; charityContrib: number }> = {
  starter: { price: 1000, poolContrib: 500, charityContrib: 100 },
  standard: { price: 2000, poolContrib: 1000, charityContrib: 200 },
  premium: { price: 4000, poolContrib: 2000, charityContrib: 400 },
};

// Global stats stored in localStorage
export interface AdminStats {
  totalUsers: number;
  monthlyPool: number;
  charityTotal: number;
}

const DEFAULT_STATS: AdminStats = {
  totalUsers: 1240,
  monthlyPool: 1245000,
  charityTotal: 420000,
};

interface AuthContextType {
  isLoggedIn: boolean;
  isSubscribed: boolean;
  currentPlan: PlanId;
  billingCycle: BillingCycle;
  adminStats: AdminStats;
  login: () => void;
  logout: () => void;
  subscribe: (planId: string, cycle: BillingCycle) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<PlanId>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [adminStats, setAdminStats] = useState<AdminStats>(DEFAULT_STATS);
  const router = useRouter();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedSubscriptionStatus = localStorage.getItem('isSubscribed') === 'true';
    const storedPlan = localStorage.getItem('currentPlan') as PlanId;
    const storedCycle = (localStorage.getItem('billingCycle') as BillingCycle) || 'monthly';
    const storedStats = localStorage.getItem('adminStats');
    
    setIsLoggedIn(storedLoginStatus);
    setIsSubscribed(storedSubscriptionStatus);
    setCurrentPlan(storedPlan || null);
    setBillingCycle(storedCycle);
    if (storedStats) {
      setAdminStats(JSON.parse(storedStats));
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsSubscribed(false);
    setCurrentPlan(null);
    setBillingCycle('monthly');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isSubscribed');
    localStorage.removeItem('currentPlan');
    localStorage.removeItem('billingCycle');
    router.push('/');
  };

  const subscribe = (planId: string, cycle: BillingCycle) => {
    const plan = PLAN_CONFIG[planId];
    if (!plan) return;

    const multiplier = cycle === 'yearly' ? 12 : 1;

    const newStats: AdminStats = {
      totalUsers: adminStats.totalUsers + 1,
      monthlyPool: adminStats.monthlyPool + (plan.poolContrib * multiplier),
      charityTotal: adminStats.charityTotal + (plan.charityContrib * multiplier),
    };

    setIsSubscribed(true);
    setCurrentPlan(planId as PlanId);
    setBillingCycle(cycle);
    setAdminStats(newStats);

    localStorage.setItem('isSubscribed', 'true');
    localStorage.setItem('currentPlan', planId);
    localStorage.setItem('billingCycle', cycle);
    localStorage.setItem('adminStats', JSON.stringify(newStats));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isSubscribed, currentPlan, billingCycle, adminStats, login, logout, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
