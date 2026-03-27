'use client';

import React, { useState } from 'react';
import CharityCard from '@/components/charity/CharityCard';
import GlassCard from '@/components/ui/GlassCard';
import styles from './CharityDirectory.module.css';
import subscribeStyles from '@/app/subscribe/Subscribe.module.css'; // Reusing payment styles

const MOCK_CHARITIES = [
  {
    id: '1',
    name: 'Green Fairways Foundation',
    description: 'Promoting youth development through the game of golf and environmental stewardship.',
    image_url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop',
    is_featured: true,
  },
  {
    id: '2',
    name: 'Save the Children',
    description: 'Every child deserves a future. We work to give children a healthy start in life.',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Ocean Guardians',
    description: 'Protecting our oceans and marine life through research, conservation, and education.',
    image_url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1974&auto=format&fit=crop',
  },
];

export default function CharityDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Donation state
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationCharity, setDonationCharity] = useState<{ id: string; name: string } | null>(null);
  const [donationAmount, setDonationAmount] = useState('5000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleSelect = (name: string) => {
    setSelectedCharity(name);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDonateClick = (id: string, name: string) => {
    setDonationCharity({ id, name });
    setShowDonateModal(true);
    setPaymentDone(false);
  };

  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      setTimeout(() => {
        setShowDonateModal(false);
        setDonationCharity(null);
      }, 2500);
    }, 2000);
  };

  const filteredCharities = MOCK_CHARITIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {showSuccess && (
        <div className={styles.successToast}>
          Successfully selected <strong>{selectedCharity}</strong> as your primary cause!
        </div>
      )}
      <header className={styles.header}>
        <h1>Support a Cause</h1>
        <p>Select a charity to support with 10% or more of your monthly subscription.</p>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search charities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.grid}>
        {filteredCharities.map(charity => (
          <CharityCard 
            key={charity.id} 
            charity={charity} 
            onSelect={() => handleSelect(charity.name)}
            onDonate={handleDonateClick}
          />
        ))}
      </div>

      {/* Independent Donation Modal */}
      {showDonateModal && donationCharity && (
        <div className={subscribeStyles.modalOverlay} onClick={() => !isProcessing && !paymentDone && setShowDonateModal(false)}>
          <div className={subscribeStyles.paymentModal} onClick={e => e.stopPropagation()}>
            <GlassCard className={subscribeStyles.paymentCard}>
              {paymentDone ? (
                <div className={subscribeStyles.successState}>
                  <div className={subscribeStyles.successRing}>
                    <div className={subscribeStyles.successIcon}>✓</div>
                  </div>
                  <h3>Donation Successful!</h3>
                  <div className={subscribeStyles.transactionBox}>
                    <div className={subscribeStyles.txRow}>
                      <span>Amount Donated</span>
                      <strong className={subscribeStyles.txAmount}>₹{Number(donationAmount).toLocaleString()}</strong>
                    </div>
                    <div className={subscribeStyles.txRow}>
                      <span>Charity</span>
                      <strong>{donationCharity.name}</strong>
                    </div>
                    <div className={subscribeStyles.txRow}>
                      <span>Transaction ID</span>
                      <strong className={subscribeStyles.txId}>DON{Math.random().toString(36).substring(2,10).toUpperCase()}</strong>
                    </div>
                    <div className={subscribeStyles.txRow}>
                      <span>Status</span>
                      <strong className={subscribeStyles.txStatus}>✓ Completed</strong>
                    </div>
                  </div>
                  <p className={subscribeStyles.redirectNote}>Closing automatically…</p>
                </div>
              ) : (
                <>
                  <div className={subscribeStyles.paymentHeader}>
                    <h3>Make a Donation</h3>
                    <p>Supporting: <strong>{donationCharity.name}</strong></p>
                  </div>
                  <form className={subscribeStyles.paymentForm} onSubmit={handleProcessDonation}>
                    <div className={subscribeStyles.inputGroup}>
                      <label>Donation Amount (₹)</label>
                      <input 
                        type="number" 
                        min="100" 
                        value={donationAmount} 
                        onChange={(e) => setDonationAmount(e.target.value)} 
                        required 
                        autoFocus
                      />
                    </div>
                    <div className={subscribeStyles.inputGroup}>
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="John Golfer" required />
                    </div>
                    <div className={subscribeStyles.inputGroup}>
                      <label>Card Number</label>
                      <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} required />
                    </div>
                    <div className={subscribeStyles.cardRow}>
                      <div className={subscribeStyles.inputGroup}>
                        <label>Expiry</label>
                        <input type="text" placeholder="MM/YY" maxLength={5} required />
                      </div>
                      <div className={subscribeStyles.inputGroup}>
                        <label>CVV</label>
                        <input type="text" placeholder="123" maxLength={3} required />
                      </div>
                    </div>
                    <button type="submit" className={subscribeStyles.payBtn} disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : `Donate ₹${Number(donationAmount).toLocaleString()}`}
                    </button>
                    <button type="button" className={subscribeStyles.cancelBtn} onClick={() => setShowDonateModal(false)} disabled={isProcessing}>
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
