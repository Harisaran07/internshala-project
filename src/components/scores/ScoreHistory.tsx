import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import styles from './ScoreHistory.module.css';

interface Score {
  id: string;
  score: number;
  date: string;
}

interface ScoreHistoryProps {
  scores: Score[];
  onUpdateScore?: (id: string, newScore: number, oldDate: string) => void;
}

const ScoreHistory: React.FC<ScoreHistoryProps> = ({ scores, onUpdateScore }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');

  const handleEditClick = (s: Score) => {
    setEditingId(s.id);
    setEditVal(s.score.toString());
  };

  const handleSave = (scoreObj: Score) => {
    const num = parseInt(editVal);
    if (num >= 1 && num <= 45 && onUpdateScore) {
      onUpdateScore(scoreObj.id, num, scoreObj.date);
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <GlassCard className={styles.container}>
      <h3>Recent Scores</h3>
      <div className={styles.list}>
        {scores.length === 0 ? (
          <p className={styles.empty}>No scores recorded yet.</p>
        ) : (
          scores.map((s) => (
            <div key={s.id} className={styles.item}>
              {editingId === s.id ? (
                <div className={styles.editMode}>
                  <input 
                    type="number" 
                    min="1" max="45" 
                    value={editVal} 
                    onChange={(e) => setEditVal(e.target.value)} 
                    className={styles.editInput}
                    autoFocus
                  />
                  <div className={styles.editActions}>
                    <button onClick={() => handleSave(s)} className={styles.saveBtn}>Save</button>
                    <button onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.scoreInfo}>
                    <span className={styles.score}>{s.score}</span>
                    <span className={styles.date}>{new Date(s.date).toLocaleDateString()}</span>
                  </div>
                  {onUpdateScore && (
                    <button 
                      onClick={() => handleEditClick(s)} 
                      className={styles.editBtn}
                      aria-label="Edit score"
                    >
                      ✎ Edit
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
      <p className={styles.hint}>* Only your last 5 scores are retained.</p>
    </GlassCard>
  );
};

export default ScoreHistory;
