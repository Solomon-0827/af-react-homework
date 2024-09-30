'use client';
import ConfirmDialog from "@/app/components/confirm-dialog";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserItemById } from "../../../[id]/item/[itemId]/action";

export default function ItemPage() {
  const [userItem, setUserItem] = useState<any>({});
  const params = useParams();
  const { id, itemId } = params;
  const router = useRouter();

  useEffect(() => {
    const getUserItem = async () => {
      if (itemId) {
        try {
          const userItem = await getUserItemById(Number(itemId)); 
          setUserItem(userItem);
        } catch (error) {
          console.error("Error fetching user item:", error);
        }
      }
    };
    getUserItem();
  }, [itemId]);

  
  useEffect(() => {
    
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).openDialog) {
        (window as any).openDialog(); 
      }
    }, 0);
  }, []);

  return (
    <div style={styles.container}>
      <ConfirmDialog title='详细信息' message='' onConfirm={() => window.location.reload()} onCancel={() => router.push('/list')}>
        <div style={styles.dialogContent}>
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
      </ConfirmDialog>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: '8px', 
    background: 'linear-gradient(135deg, #0ABFBC, #314755)', 
    padding: '20px',
  },
  dialogContent: {
    background: 'linear-gradient(135deg, #FFEEEE, #DDEFBB)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
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