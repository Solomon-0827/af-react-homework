import React, { useState, useEffect } from 'react';

interface DialogProps {
  title: string; 
  message: string; 
  children?: React.ReactNode;
  onClose?: () => void; 
}

const NoticeDialog: React.FC<DialogProps> = ({ title, message, children, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  
  const open = () => setIsVisible(true);

  
  const close = () => {
    setIsVisible(false);
    if (onClose) onClose(); 
  };

  
  useEffect(() => {
    (window as any).openNoticeDialog = open; 
    (window as any).closeNoticeDialog = close; 
  }, []);

  if (!isVisible) return null; 

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button onClick={close} style={styles.closeButton}>×</button>
        </div>
        <div style={styles.body}>
          <p>{message}</p>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};


const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    width: '450px',
    backgroundColor: '#fff',
    borderRadius: '12px', 
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', 
    display: 'flex',
    flexDirection: 'column' as 'column',
    textAlign: 'center' as 'center',
  },
  header: {
    padding: '16px 20px',
    background: 'linear-gradient(90deg, #C04848, #480048)', 
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '30px',
    letterSpacing: '1px', 
    fontWeight: 'bold' as 'bold',
    color: '#fff', 
    margin: 0,
  },
  body: {
    padding: '20px',
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.5',
  },
  closeButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    lineHeight: 1,
    color: '#fff', 
  },
};

export default NoticeDialog;