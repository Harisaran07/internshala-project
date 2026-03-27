import React from 'react';
import GlassCard from '../ui/GlassCard';
import styles from './CharityCard.module.css';

interface Charity {
  id: string;
  name: string;
  description: string;
  image_url: string;
  is_featured?: boolean;
}

interface CharityCardProps {
  charity: Charity;
  onSelect?: (id: string) => void;
  onDonate?: (id: string, name: string) => void;
}

const CharityCard: React.FC<CharityCardProps> = ({ charity, onSelect, onDonate }) => {
  return (
    <GlassCard hoverable className={styles.container}>
      {charity.is_featured && <span className={styles.badge}>Featured</span>}
      <img src={charity.image_url} alt={charity.name} className={styles.image} />
      <div className={styles.content}>
        <h3>{charity.name}</h3>
        <p>{charity.description}</p>
        <div className={styles.actions}>
          <button className={styles.button} onClick={() => onSelect?.(charity.id)}>
            Select Charity
          </button>
          {onDonate && (
            <button className={styles.donateBtn} onClick={() => onDonate(charity.id, charity.name)}>
              Donate Now
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default CharityCard;
