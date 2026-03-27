import React from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverable = false, delay = 0 }) => {
  return (
    <div 
      className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
