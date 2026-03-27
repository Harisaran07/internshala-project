'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <span className={styles.tagline}>Play with Purpose. Win with Impact.</span>
          <h1>The New Standard for Golf Performance & Giving.</h1>
          <p>
            Track your scores, enter monthly prize draws, and support your favorite charities 
            with every subscription. We're golfing for good.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/login" className={styles.primaryBtn}>Get Started</Link>
          </div>
        </motion.div>
        
      </section>

      {/* Impact Section */}
      <section className={styles.impact}>
        <h2>Where Your Subscription Goes</h2>
        <div className={styles.impactGrid}>
          <div className={styles.impactItem}>
            <span className={styles.percentage}>10%</span>
            <h3>Charity Minimum</h3>
            <p>Every subscription automatically contributes to a charity of your choice.</p>
          </div>
          <div className={styles.impactItem}>
            <span className={styles.percentage}>50%</span>
            <h3>Prize Pool</h3>
            <p>A massive portion of fees funds our monthly 3, 4, and 5-number match draws.</p>
          </div>
          <div className={styles.impactItem}>
            <span className={styles.percentage}>100%</span>
            <h3>Transparent</h3>
            <p>Full transparency on draw logic and donation verification.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.finalCta}>
        <GlassCard className={styles.ctaCard}>
          <h2>Ready to transform your game?</h2>
          <p>Join thousands of golfers making a difference today.</p>
          <Link href="/signup" className={styles.primaryBtn}>Subscribe Now</Link>
        </GlassCard>
      </section>
    </div>
  );
}
