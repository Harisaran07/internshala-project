'use client';

import React, { useState } from 'react';
import { useAuth, PLAN_CONFIG } from '@/context/AuthContext';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import ScoreEntry from '@/components/scores/ScoreEntry';
import ScoreHistory from '@/components/scores/ScoreHistory';
import styles from './Dashboard.module.css';

const MOCK_SCORES = [
  { id: '1', score: 38, date: '2024-03-20' },
  { id: '2', score: 42, date: '2024-03-15' },
  { id: '3', score: 35, date: '2024-03-10' },
  { id: '4', score: 40, date: '2024-03-05' },
  { id: '5', score: 37, date: '2024-02-28' },
];

const MOCK_PREVIOUS_DRAWS = [
  { id: 'd1', date: 'March 15, 2024', winner: 'Sarah M.', amount: '₹2,45,000' },
  { id: 'd2', date: 'February 15, 2024', winner: 'James K.', amount: '₹1,82,000' },
];

const PLAN_LABELS: Record<string, string> = {
  starter: 'Starter',
  standard: 'Standard Golfer',
  premium: 'Premium Member',
};

export default function Dashboard() {
  const [scores, setScores] = useState(MOCK_SCORES);
  const [showDrawHistory, setShowDrawHistory] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [winningsStatus, setWinningsStatus] = useState('Pending');
  const [showProofModal, setShowProofModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // Added for the instruction's template
  const { isSubscribed, currentPlan } = useAuth();

  const planKey = currentPlan ?? 'premium';
  const planLabel = PLAN_LABELS[planKey] ?? 'Premium Member';
  const planConfig = PLAN_CONFIG[planKey] ?? PLAN_CONFIG['premium'];

  const handleAddScore = (score: number, date: string) => {
    const newScore = { id: Date.now().toString(), score, date };
    const updatedScores = [newScore, ...scores].slice(0, 5);
    setScores(updatedScores);
  };

  const handleUpdateScore = (id: string, newScore: number, newDate: string) => {
    setScores(prevScores =>
      prevScores.map(score =>
        score.id === id ? { ...score, score: newScore, date: newDate } : score
      )
    );
  };

  const handleUploadProof = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setWinningsStatus('Under Review');
      setShowProofModal(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome, Golfer</h1>
        <div className={styles.subStatus}>
          {isSubscribed ? (
            <button
              className={styles.statusBadge}
              onClick={() => setShowSubModal(true)}
              title="Click to view subscription details"
            >
              ⭐ {planLabel}
            </button>
          ) : (
            <Link href="/subscribe" className={styles.upgradeBtn}>Upgrade to Premium</Link>
          )}
          <span className={styles.renewal}>Renews: April 26, 2024</span>
        </div>
      </header>

      {/* Subscription Detail Modal */}
      {showSubModal && (
        <div className={styles.modalOverlay} onClick={() => setShowSubModal(false)}>
          <div className={styles.subModal} onClick={e => e.stopPropagation()}>
            <GlassCard className={styles.subModalCard}>
              <div className={styles.subModalHeader}>
                <div className={styles.subSuccessRing}>
                  <span>✓</span>
                </div>
                <h3>Subscription Active</h3>
                <p>Your payment has been credited successfully.</p>
              </div>

              <div className={styles.txBox}>
                <div className={styles.txRow}>
                  <span>Amount Debited</span>
                  <strong className={styles.txAmount}>₹{planConfig.price.toLocaleString()}/{billingCycle === 'yearly' ? 'yr' : 'mo'}</strong>
                </div>
                <div className={styles.txRow}>
                  <span>Plan</span>
                  <strong>{planLabel}</strong>
                </div>
                <div className={styles.txRow}>
                  <span>Billing Cycle</span>
                  <strong>Monthly</strong>
                </div>
                <div className={styles.txRow}>
                  <span>Next Renewal</span>
                  <strong>April 26, 2024</strong>
                </div>
                <div className={styles.txRow}>
                  <span>Pool Contribution</span>
                  <strong className={styles.txGreen}>+₹{planConfig.poolContrib.toLocaleString()}/{billingCycle === 'yearly' ? 'yr' : 'mo'}</strong>
                </div>
                <div className={styles.txRow}>
                  <span>Charity Contribution</span>
                  <strong className={styles.txGreen}>+₹{planConfig.charityContrib.toLocaleString()}/{billingCycle === 'yearly' ? 'yr' : 'mo'}</strong>
                </div>
                <div className={styles.txRow}>
                  <span>Status</span>
                  <strong className={styles.txStatus}>✓ Credited</strong>
                </div>
              </div>

              <button className={styles.closeModalBtn} onClick={() => setShowSubModal(false)}>
                Close
              </button>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Proof Upload Modal */}
      {showProofModal && (
        <div className={styles.modalOverlay} onClick={() => !isUploading && setShowProofModal(false)}>
          <div className={styles.subModal} onClick={e => e.stopPropagation()}>
            <GlassCard className={styles.subModalCard}>
              <div className={styles.subModalHeader}>
                <h3>Upload Winning Proof</h3>
                <p>Please upload a screenshot of your scores to verify your win.</p>
              </div>
              
              <form onSubmit={handleUploadProof} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                  <input type="file" accept="image/*" required style={{ width: '100%', color: 'var(--text-muted)' }} />
                </div>
                
                <button type="submit" className={styles.actionBtn} style={{ marginTop: 0 }} disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Submit Proof'}
                </button>
                <button type="button" className={styles.closeModalBtn} onClick={() => setShowProofModal(false)} disabled={isUploading}>
                  Cancel
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.leftCol}>
          <ScoreEntry onAddScore={handleAddScore} />
          
          <GlassCard className={styles.charityCard}>
            <h3>Your Selected Charity</h3>
            <div className={styles.charityInfo}>
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" alt="Charity" />
              <div>
                <h4>Save the Children</h4>
                <p>10% of your subscription goes here.</p>
                <Link href="/charities" className={styles.linkBtn}>Change Charity</Link>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className={styles.rightCol}>
          <ScoreHistory scores={scores} onUpdateScore={handleUpdateScore} />
          
          <GlassCard className={styles.drawCard}>
            <h3>Upcoming Draw</h3>
            <div className={styles.drawInfo}>
              <div className={styles.countdown}>
                <span className={styles.time}>12</span>
                <span className={styles.label}>Days</span>
              </div>
              <div className={styles.drawHeader}>
              <p>Current Prize Pool: <strong>₹12,45,000</strong></p>
            </div>  <button 
                className={styles.actionBtn}
                onClick={() => setShowDrawHistory(!showDrawHistory)}
              >
                {showDrawHistory ? 'Hide Previous Draws' : 'View Previous Draws'}
              </button>
              
              {showDrawHistory && (
                <div className={styles.drawHistory}>
                  {MOCK_PREVIOUS_DRAWS.map(draw => (
                    <div key={draw.id} className={styles.historyItem}>
                      <span>{draw.date}</span>
                      <span>{draw.winner}</span>
                      <strong>{draw.amount}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className={styles.winningsCard}>
            <h3>Total Winnings</h3>
            <div className={styles.winningsInfo}>
              <span className={styles.amount}>₹45,000.00</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span className={styles.payoutStatus} style={{ background: winningsStatus === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : winningsStatus === 'Under Review' ? 'rgba(59, 130, 246, 0.1)' : '', color: winningsStatus === 'Pending' ? '#f59e0b' : winningsStatus === 'Under Review' ? '#3b82f6' : '' }}>
                  {winningsStatus}
                </span>
                {winningsStatus === 'Pending' && (
                  <button onClick={() => setShowProofModal(true)} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                    Upload Proof
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
