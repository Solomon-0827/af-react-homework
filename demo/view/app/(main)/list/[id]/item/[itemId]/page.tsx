'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserItemById } from './action';

export default function ItemPage() {
  const [userItem, setUserItem] = useState<any>({});
  const params = useParams();
  const { id, itemId } = params;

  useEffect(() => {
    const getUserItem = async () => {
      if (itemId) {
        const userItem = await getUserItemById(Number(itemId));
        setUserItem(userItem);
      }
    };
    getUserItem();
  }, [itemId]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Item Details</h1>
        <div style={styles.info}>
          <p style={styles.label}>Item ID:</p>
          <p style={styles.value}>{userItem.id}</p>
        </div>
        <div style={styles.info}>
          <p style={styles.label}>User ID:</p>
          <p style={styles.value}>{userItem.user_id}</p>
        </div>
        <div style={styles.info}>
          <p style={styles.label}>Name:</p>
          <p style={styles.value}>{userItem.name}</p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '8px', 
    background: 'linear-gradient(135deg, #0ABFBC, #314755)', 
  },
  card: {
    width: '400px',
    background: 'linear-gradient(135deg, #FFEEEE, #DDEFBB)', 
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: '16px',
    color: '#777',
  },
};