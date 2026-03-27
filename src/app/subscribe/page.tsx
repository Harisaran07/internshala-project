'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, BillingCycle } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import styles from './Subscribe.module.css';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹1,000',
    priceNum: 1000,
    period: '/month',
    features: [
      'Score Tracking',
      '1 Entry per Monthly Draw',
      'Support 1 Charity',
      'Basic Analytics',
    ],
  },
  {
    id: 'standard',
    name: 'Standard Golfer',
    price: '₹2,000',
    priceNum: 2000,
    period: '/month',
    features: [
      'Advanced Score Tracking',
      '3 Entries per Monthly Draw',
      'Support 3 Charities',
      'Priority Analytics',
      'Monthly Reports',
    ],
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium Member',
    price: '₹4,000',
    priceNum: 4000,
    period: '/month',
    features: [
      'Full Analytics Suite',
      '10 Entries per Monthly Draw',
      'Unlimited Charity Support',
      'Exclusive Prize Pools',
      'Priority Support',
      'No Ads',
    ],
  },
];

export default function Subscribe() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const router = useRouter();
  const { subscribe } = useAuth();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      subscribe(selectedPlan!, billingCycle);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2500);
    }, 2000);
  };

  const getPrice = (basePrice: number) => {
    if (billingCycle === 'monthly') return `₹${basePrice.toLocaleString()}`;
    // 20% discount for yearly
    return `₹${Math.round(basePrice * 12 * 0.8).toLocaleString()}`;
  };

  const getDisplayPrice = (plan: typeof PLANS[0]) => {
    return getPrice(plan.priceNum);
  };

  const plan = PLANS.find(p => p.id === selectedPlan);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Choose Your Plan</h1>
        <p>Support your favorite charities while competing for prizes.</p>
        
        <div className={styles.billingToggle}>
          <span className={billingCycle === 'monthly' ? styles.active : ''}>Monthly</span>
          <button 
            className={`${styles.toggleBtn} ${billingCycle === 'yearly' ? styles.toggled : ''}`}
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            aria-label="Toggle billing cycle"
          >
            <div className={styles.toggleKnob}></div>
          </button>
          <span className={billingCycle === 'yearly' ? styles.active : ''}>
            Yearly <span className={styles.discountBadge}>Save 20%</span>
          </span>
        </div>
      </header>

      <div className={styles.plansGrid}>
        {PLANS.map((p) => (
          <GlassCard key={p.id} className={`${styles.planCard} ${p.featured ? styles.featured : ''}`}>
            {p.featured && <span className={styles.featuredBadge}>Most Popular</span>}
            <h2>{p.name}</h2>
            <div className={styles.price}>
              <span className={styles.amount}>{getDisplayPrice(p)}</span>
              <span className={styles.period}>/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>
            <ul className={styles.features}>
              {p.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className={styles.subscribeBtn}
              onClick={() => handleSelectPlan(p.id)}
            >
              Choose Plan
            </button>
          </GlassCard>
        ))}
      </div>

      {/* Payment Modal */}
      {showPayment && plan && (
        <div className={styles.modalOverlay} onClick={() => !isProcessing && !paymentDone && setShowPayment(false)}>
          <div className={styles.paymentModal} onClick={e => e.stopPropagation()}>
            <GlassCard className={styles.paymentCard}>
              {paymentDone ? (
                <div className={styles.successState}>
                  <div className={styles.successRing}>
                    <div className={styles.successIcon}>✓</div>
                  </div>
                  <h3>Payment Successful!</h3>
                  <div className={styles.transactionBox}>
                    <div className={styles.txRow}>
                      <span>Amount Debited</span>
                      <strong className={styles.txAmount}>{getDisplayPrice(plan)}</strong>
                    </div>
                    <div className={styles.txRow}>
                      <span>Plan</span>
                      <strong>{plan.name}</strong>
                    </div>
                    <div className={styles.txRow}>
                      <span>Billing Cycle</span>
                      <strong style={{ textTransform: 'capitalize' }}>{billingCycle}</strong>
                    </div>
                    <div className={styles.txRow}>
                      <span>Transaction ID</span>
                      <strong className={styles.txId}>TXN{Math.random().toString(36).substring(2,10).toUpperCase()}</strong>
                    </div>
                    <div className={styles.txRow}>
                      <span>Status</span>
                      <strong className={styles.txStatus}>✓ Credited</strong>
                    </div>
                  </div>
                  <p className={styles.redirectNote}>Redirecting to dashboard…</p>
                </div>
              ) : (
                <>
                  <div className={styles.paymentHeader}>
                    <h3>Complete Payment</h3>
                    <p>Plan: <strong>{plan.name}</strong> — {getDisplayPrice(plan)}/{billingCycle === 'yearly' ? 'yr' : 'mo'}</p>
                  </div>
                  <form className={styles.paymentForm} onSubmit={handlePayment}>
                    <div className={styles.inputGroup}>
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="John Golfer" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Card Number</label>
                      <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} required />
                    </div>
                    <div className={styles.cardRow}>
                      <div className={styles.inputGroup}>
                        <label>Expiry</label>
                        <input type="text" placeholder="MM/YY" maxLength={5} required />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>CVV</label>
                        <input type="text" placeholder="123" maxLength={3} required />
                      </div>
                    </div>
                    <button type="submit" className={styles.payBtn} disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : `Pay ${getDisplayPrice(plan)}`}
                    </button>
                    <button type="button" className={styles.cancelBtn} onClick={() => setShowPayment(false)} disabled={isProcessing}>
                      Cancel
                    </button>
                  </form>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
