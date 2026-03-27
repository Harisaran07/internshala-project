import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import styles from './ScoreEntry.module.css';

interface ScoreEntryProps {
  onAddScore: (score: number, date: string) => void;
}

const ScoreEntry: React.FC<ScoreEntryProps> = ({ onAddScore }) => {
  const [score, setScore] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numScore = parseInt(score);
    if (numScore >= 1 && numScore <= 45) {
      onAddScore(numScore, date);
      setScore('');
    }
  };

  return (
    <GlassCard className={styles.container}>
      <h3>Add New Score</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Stableford Score (1-45)</label>
          <input
            type="number"
            min="1"
            max="45"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit Score
        </button>
      </form>
    </GlassCard>
  );
};

export default ScoreEntry;
