'use client';

import { SessionProvider, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import './globals.css';
import { verifyToken } from '../(auth)/login/action';
import { redirect } from 'next/navigation';
import Menu from '../components/menu';
import Banner from '../components/banner';
import { UserContextProvider } from '../components/themeContext';

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token") || '';
      const result = await verifyToken(token);
      
      if (!result) {
        if (session?.user?.provider) {
          signOut();
        } else {
          localStorage.removeItem("token");
        }
        redirect("/login");
      }
    };
    checkToken();
  }, [session]); 

  return (
    <div style={styles.container}>
      {/* 顶部 banner */}
      <div style={styles.banner}>
        <Banner />
      </div>

      <div style={styles.main}>
        {/* 左侧 menu */}
        <div style={styles.menu}>
          <Menu />
        </div>

        {/* 右侧动态内容 */}
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <UserContextProvider>
            <RootLayoutContent>
              {children}
            </RootLayoutContent>
          </UserContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '100vh',
    background: 'linear-gradient(90deg, #FFEEEE, #DDEFBB)', 
  },
  banner: {
    height: '80px',
    width: '100%',
    background: 'linear-gradient(90deg, #80DEEA, #00ACC1)', 
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #ddd',
    borderRadius: '0 0 8px 8px', 
    color: '#fff', 
    fontSize: '24px',
    fontWeight: 'bold' as 'bold',
  },
  main: {
    display: 'flex',
    flex: 1,
    padding: '20px',
    gap: '20px', 
  },
  menu: {
    width: '250px', 
    background: 'linear-gradient(180deg, #FC354C, #0ABFBC)', 
    padding: '20px',
    borderRadius: '8px', 
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
    borderRight: 'none', 
  },
  content: {
    flex: 1,
    background: 'linear-gradient(135deg, #FC354C, #0ABFBC 55%)', 
    borderRadius: '8px', 
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
  },
};