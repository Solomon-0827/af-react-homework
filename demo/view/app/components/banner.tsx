'use client';

import { signOut, useSession } from 'next-auth/react';
import ConfirmDialog from '@/app/components/confirm-dialog';
import { decodeToken } from '../(main)/action';
import { useEffect, useState } from 'react';
import { useUserContext } from './themeContext';


const Banner = () => {
  const [username, setUsername] = useState('');
  const { background } = useUserContext();

  useEffect(() => {
    const token = decodeToken(localStorage.getItem('token') || '');
    setUsername(token);
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = bannerStyles.logoutButtonHover.backgroundColor;
    e.currentTarget.style.transform = bannerStyles.logoutButtonHover.transform;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = bannerStyles.logoutButton.backgroundColor;
    e.currentTarget.style.transform = 'scale(1)';
  };


  const logout = () => {
    (window as any).openDialog();
  }

  const logoutConfirm = () => {
    localStorage.removeItem('token');
    signOut({redirect: true, callbackUrl: '/login'});
  }

  return (
    <div style={{...bannerStyles.container, background}}>
      <ConfirmDialog title='退出登录' message='打算退出登录了吗？' onConfirm={logoutConfirm}></ConfirmDialog>
      <div style={bannerStyles.leftSection}></div>

      <h1 style={bannerStyles.title}>View Demo</h1>
      
      <div style={bannerStyles.rightSection}>
        <span style={bannerStyles.username}>{username}</span>
        <button 
          style={bannerStyles.logoutButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const bannerStyles = {
  container: {
    width: '100%',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0 0 12px 12px',
    position: 'relative' as 'relative',
    zIndex: 1000,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    position: 'absolute' as 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '28px',
    fontWeight: 'bold' as 'bold',
    margin: 0,
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', 
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  username: {
    fontSize: '18px',
    fontWeight: '500' as '500',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, transform 0.3s', 
  },
  
  logoutButtonHover: {
    backgroundColor: '#ff3b3b',
    transform: 'scale(1.05)', 
  },
};


export default Banner;