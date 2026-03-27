'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';
  const isLandingPage = pathname === '/';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Digital <span>Heroes</span>
        </Link>
        {isLoggedIn && !isLandingPage && (
          <nav className={styles.nav}>
            <Link href="/charities">Charities</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        )}
        {/* On landing page: show nothing. On other pages: show login/signup or logout */}
        {!isLandingPage && (
          <div className={styles.actions}>
            {!isLoggedIn ? (
              !isLoginPage && !isSignupPage && (
                <>
                  <Link href="/login" className={styles.loginBtn}>Login</Link>
                  <Link href="/signup" className={styles.signupBtn}>Get Started</Link>
                </>
              )
            ) : (
              <button onClick={logout} className={styles.logoutBtn}>Logout</button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
