'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const menuStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '15px', 
    width: '100%', 
    height: '100%',
    padding: '5px', 
    borderRadius: '12px', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
    alignItems: 'center' as 'center',
  },
  button: {
    padding: '12px 20px',
    width: '100%', 
    backgroundColor: '#ff6b6b',
    border: 'none', 
    cursor: 'pointer',
    borderRadius: '8px', 
    textAlign: 'center' as 'center', 
    color: '#fff',
    fontSize: '16px', 
    fontWeight: 'bold' as 'bold', 
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s', 
  },
  
  buttonHover: {
    backgroundColor: '#ff3b3b', 
    color: '#ffffff', 
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', 
    transform: 'translateY(-2px)', 
  },
};


const Menu: React.FC = () => {
  const router = useRouter();

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = menuStyles.buttonHover.backgroundColor;
    e.currentTarget.style.color = menuStyles.buttonHover.color;
    e.currentTarget.style.boxShadow = menuStyles.buttonHover.boxShadow;
    e.currentTarget.style.transform = menuStyles.buttonHover.transform;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = menuStyles.button.backgroundColor;
    e.currentTarget.style.color = menuStyles.button.color || '#000'; 
    e.currentTarget.style.boxShadow = menuStyles.button.boxShadow;
    e.currentTarget.style.transform = 'translateY(0)'; 
  };

  return (
    <div style={menuStyles.container}>
      <button
        style={menuStyles.button}
        onClick={() => router.push('/list')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        List
      </button>
      <button
        style={menuStyles.button}
        onClick={() => router.push('/setting')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Setting
      </button>
      <button
        style={menuStyles.button}
        onClick={() => router.push('/client')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Client
      </button>
    </div>
  );
};


export default Menu;