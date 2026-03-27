'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const { adminStats } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'draws' | 'charities' | 'winners'>('draws');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any[] | null>(null);
  const [editingCharity, setEditingCharity] = useState<any | null>(null);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const runSimulation = (type: 'random' | 'algorithmic') => {
    setIsSimulating(true);
    setSimulationResults(null);
    setIsPublished(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResults([
        { id: 1, name: 'John D.', numbers: '12, 45, 23, 09', prize: '₹1,20,000' },
        { id: 2, name: 'Alice S.', numbers: '34, 11, 29, 40', prize: '₹45,000' },
        { id: 3, name: 'Robert P.', numbers: '02, 18, 44, 15', prize: '₹15,000' },
      ]);
    }, 2000);
  };

  const handlePublish = () => {
    setIsPublished(true);
    setShowPublishSuccess(true);
    setTimeout(() => setShowPublishSuccess(false), 3000);
  };

  const [proofs, setProofs] = useState([
    { id: 'w1', name: 'John Golfer', amount: '₹45,000.00', status: 'Under Review', drawDate: 'March 2024' },
    { id: 'w2', name: 'Alice Smith', amount: '₹1,20,000.00', status: 'Pending', drawDate: 'March 2024' },
    { id: 'w3', name: 'Robert P.', amount: '₹15,000.00', status: 'Paid', drawDate: 'February 2024' }
  ]);
  const [reviewingProof, setReviewingProof] = useState<string | null>(null);

  const saveCharity = (e: React.FormEvent) => {
    e.preventDefault();
    setEditingCharity(null);
    // Mock success
  };

  const handleApproveProof = (id: string) => {
    setProofs(prev => prev.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
    setReviewingProof(null);
  };

  return (
    <div className={styles.container}>
      {showPublishSuccess && (
        <div className={styles.successToast}>
          March Draw results published successfully!
        </div>
      )}

      {editingCharity && (
        <div className={styles.modalOverlay}>
          <GlassCard className={styles.editModal}>
            <h3>Edit Charity: {editingCharity.name}</h3>
            <form onSubmit={saveCharity} className={styles.editForm}>
              <div className={styles.formField}>
                <label>Total Raised</label>
                <input type="text" defaultValue={editingCharity.total_raised} />
              </div>
              <div className={styles.formField}>
                <label>Supporters</label>
                <input type="number" defaultValue={editingCharity.supporters} />
              </div>
              <div className={styles.btnGroup}>
                <button type="submit" className={styles.primaryBtn}>Save Changes</button>
                <button type="button" onClick={() => setEditingCharity(null)} className={styles.secondaryBtn}>Cancel</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {reviewingProof && (
        <div className={styles.modalOverlay}>
          <GlassCard className={styles.editModal}>
            <h3>Review Winning Proof</h3>
            <div className={styles.proofPreview}>
              <p>Screenshot submitted by user for verification.</p>
              <div style={{ height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>[ Mock Screenshot Image ]</span>
              </div>
            </div>
            <div className={styles.btnGroup}>
              <button type="button" onClick={() => handleApproveProof(reviewingProof)} className={styles.primaryBtn} style={{ background: 'var(--success)' }}>Approve & Pay</button>
              <button type="button" onClick={() => setReviewingProof(null)} className={styles.secondaryBtn}>Cancel</button>
            </div>
          </GlassCard>
        </div>
      )}

      <header className={styles.header}>
        <h1>Admin Control Panel</h1>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Users</span>
            <span className={styles.statValue}>{adminStats.totalUsers.toLocaleString()}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Monthly Pool</span>
            <span className={styles.statValue}>₹{adminStats.monthlyPool.toLocaleString()}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Charity Total</span>
            <span className={styles.statValue}>₹{adminStats.charityTotal.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <nav className={styles.nav}>
        <button 
          className={activeTab === 'users' ? styles.active : ''} 
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button 
          className={activeTab === 'draws' ? styles.active : ''} 
          onClick={() => setActiveTab('draws')}
        >
          Draw Management
        </button>
        <button 
          className={activeTab === 'winners' ? styles.active : ''} 
          onClick={() => setActiveTab('winners')}
        >
          Winner Verification
        </button>
        <button 
          className={activeTab === 'charities' ? styles.active : ''} 
          onClick={() => setActiveTab('charities')}
        >
          Charity Management
        </button>
      </nav>

      <div className={styles.content}>
        {activeTab === 'draws' && (
          <div className={styles.drawSection}>
            <div className={styles.drawActions}>
              <GlassCard className={styles.actionCard}>
                <h3>Run Draw Simulation</h3>
                <p>Preview potential winners and prize distribution for March 2024.</p>
                <div className={styles.btnGroup}>
                  <button 
                    className={styles.primaryBtn} 
                    onClick={() => runSimulation('random')}
                    disabled={isSimulating}
                  >
                    {isSimulating ? 'Simulating...' : 'Random Draw'}
                  </button>
                  <button 
                    className={styles.secondaryBtn}
                    onClick={() => runSimulation('algorithmic')}
                    disabled={isSimulating}
                  >
                    Algorithmic Draw
                  </button>
                </div>

                {simulationResults && (
                  <div className={styles.resultsPanel}>
                    <h4>Simulation Results</h4>
                    <ul className={styles.resultsList}>
                      {simulationResults.map(res => (
                        <li key={res.id}>
                          <span>{res.name}</span>
                          <code>{res.numbers}</code>
                          <strong>{res.prize}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </GlassCard>
              
              <GlassCard className={styles.actionCard}>
                <h3>Publish Results</h3>
                <p>Officially announce winners and lock the prize pool distribution.</p>
                
                {simulationResults && !isPublished && (
                  <div className={styles.publishSummary}>
                    <div className={styles.summaryItem}>
                      <span>Winners Found</span>
                      <strong>{simulationResults.length}</strong>
                    </div>
                    <div className={styles.summaryItem}>
                      <span>Total Payout</span>
                      <strong>₹1,80,000.00</strong>
                    </div>
                  </div>
                )}

                {isPublished ? (
                  <div className={styles.publishedState}>
                    <div className={styles.successIcon}>✓</div>
                    <h4>March 2024 Draw Published</h4>
                    <p>Winners have been notified and results are live on public dashboards.</p>
                  </div>
                ) : (
                  <button 
                    className={styles.publishBtn} 
                    onClick={handlePublish}
                    disabled={!simulationResults || isSimulating}
                  >
                    Publish March Draw
                  </button>
                )}
              </GlassCard>
            </div>

            <GlassCard className={styles.historyCard}>
              <h3>Previous Draw History</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Winning Numbers</th>
                    <th>Prize Pool</th>
                    <th>Winners</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Feb 2024</td>
                    <td>12, 24, 3, 44, 18</td>
                    <td>₹11,20,000</td>
                    <td>42</td>
                    <td><span className={styles.publishedBadge}>Published</span></td>
                  </tr>
                  <tr>
                    <td>Jan 2024</td>
                    <td>08, 15, 22, 31, 40</td>
                    <td>₹10,50,000</td>
                    <td>38</td>
                    <td><span className={styles.publishedBadge}>Published</span></td>
                  </tr>
                </tbody>
              </table>
            </GlassCard>
          </div>
        )}

        {activeTab === 'users' && (
          <GlassCard className={styles.historyCard}>
            <h3>User Management</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Subscription</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Golfer</td>
                  <td>john@example.com</td>
                  <td>Jan 20, 2024</td>
                  <td><span className={styles.activeBadge}>Active</span></td>
                  <td>Premium</td>
                </tr>
                <tr>
                  <td>Sarah Smith</td>
                  <td>sarah@test.com</td>
                  <td>Feb 15, 2024</td>
                  <td><span className={styles.activeBadge}>Active</span></td>
                  <td>Standard</td>
                </tr>
                <tr>
                  <td>Mike Miller</td>
                  <td>mike@golf.com</td>
                  <td>Mar 02, 2024</td>
                  <td><span className={styles.inactiveBadge}>Pending</span></td>
                  <td>None</td>
                </tr>
              </tbody>
            </table>
          </GlassCard>
        )}

        {/* Winner Verification Tab */}
        {activeTab === 'winners' && (
          <GlassCard className={styles.historyCard}>
            <h3>Winner Verification & Payouts</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Winner Name</th>
                  <th>Draw</th>
                  <th>Prize Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {proofs.map(proof => (
                  <tr key={proof.id}>
                    <td>{proof.name}</td>
                    <td>{proof.drawDate}</td>
                    <td><strong>{proof.amount}</strong></td>
                    <td>
                      <span className={
                        proof.status === 'Paid' ? styles.activeBadge : 
                        proof.status === 'Under Review' ? styles.reviewBadge : 
                        styles.inactiveBadge
                      }>
                        {proof.status}
                      </span>
                    </td>
                    <td>
                      {proof.status === 'Under Review' ? (
                        <button className={styles.linkBtn} onClick={() => setReviewingProof(proof.id)}>Review Proof</button>
                      ) : proof.status === 'Pending' ? (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Awaiting Upload</span>
                      ) : (
                        <span className={styles.textSuccess}>✓ Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        )}

        {/* Charity Tab */}
        {activeTab === 'charities' && (
          <GlassCard className={styles.historyCard}>
            <h3>Charity Management</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Charity Name</th>
                  <th>Total Raised</th>
                  <th>Supporters</th>
                  <th>Impact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Save the Children</td>
                  <td>₹1,42,000</td>
                  <td>342</td>
                  <td>Education & Health</td>
                  <td><button className={styles.linkBtn} onClick={() => setEditingCharity({ name: 'Save the Children', total_raised: '₹1,42,000', supporters: 342 })}>Edit</button></td>
                </tr>
                <tr>
                  <td>Green Fairways</td>
                  <td>₹98,000</td>
                  <td>215</td>
                  <td>Environment</td>
                  <td><button className={styles.linkBtn} onClick={() => setEditingCharity({ name: 'Green Fairways', total_raised: '₹98,000', supporters: 215 })}>Edit</button></td>
                </tr>
                <tr>
                  <td>Ocean Guardians</td>
                  <td>₹1,80,000</td>
                  <td>683</td>
                  <td>Marine Life</td>
                  <td><button className={styles.linkBtn} onClick={() => setEditingCharity({ name: 'Ocean Guardians', total_raised: '₹1,80,000', supporters: 683 })}>Edit</button></td>
                </tr>
              </tbody>
            </table>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
