'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import styles from '../signup/Auth.module.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, isSubscribed } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      login();
      // If already subscribed (stored in localStorage), go to dashboard; else go subscribe
      const subscribed = localStorage.getItem('isSubscribed') === 'true';
      router.push(subscribed ? '/dashboard' : '/subscribe');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <GlassCard className={styles.authCard}>
        <h2>Welcome Back</h2>
        <p>Login to manage your scores and support charities.</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className={styles.switch}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </GlassCard>
    </div>
  );
}
