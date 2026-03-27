'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import styles from './Auth.module.css';

export default function Signup() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate account creation
    setIsSuccess(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <GlassCard className={styles.authCard}>
        {isSuccess ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2>Account Created!</h2>
            <p>Your journey begins now. Redirecting you to the login page...</p>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            <h2>Join Digital Heroes</h2>
            <p>Start your journey of performance and giving.</p>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              
              <button type="submit" className={styles.submitBtn}>Create Account</button>
            </form>
            
            <p className={styles.switch}>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </>
        )}
      </GlassCard>
    </div>
  );
}
