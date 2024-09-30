import React, { useState, useEffect } from 'react';

interface DialogProps {
  title: string; 
  onConfirm?: (inputValue: string) => void; 
  onCancel?: () => void; 
}

const InputDialog: React.FC<DialogProps> = ({ title, onConfirm, onCancel }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(''); 

  const open = () => setIsVisible(true);

  const close = () => {
    setIsVisible(false);
    setInputValue(''); 
    if (onCancel) onCancel(); 
  };

  useEffect(() => {
    (window as any).openInputDialog = open; 
  }, []);

  const isConfirmDisabled = inputValue.trim() === ''; 

  if (!isVisible) return null; 

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button onClick={close} style={styles.closeButton}>×</button>
        </div>
        <div style={styles.body}>
          <input 
            type="text" 
            style={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="请输入内容"
          />
        </div>
        <div style={styles.footer}>
          <button 
            style={isConfirmDisabled ? styles.confirmButtonDisabled : styles.confirmButton} 
            onClick={() => {
              if (!isConfirmDisabled && onConfirm) onConfirm(inputValue);
              close();
            }} 
            disabled={isConfirmDisabled}
          >
            确认
          </button>
          <button style={styles.cancelButton} onClick={close}>取消</button>
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
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
  },
  footer: {
    padding: '20px 0',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    gap: '110px',
  },
  closeButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    lineHeight: 1,
    color: '#fff', 
  },
  confirmButton: {
    padding: '10px 20px',
    backgroundColor: '#C04848', 
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', 
  },
  confirmButtonDisabled: {
    padding: '10px 20px',
    backgroundColor: '#d3d3d3', 
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', 
    cursor: 'not-allowed', 
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#4A569D', 
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', 
  },
  confirmButtonHover: {
    backgroundColor: '#388e3c', 
  },
  cancelButtonHover: {
    backgroundColor: '#d32f2f', 
  },
};

export default InputDialog;