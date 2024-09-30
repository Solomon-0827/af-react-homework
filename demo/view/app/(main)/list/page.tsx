'use client';
import React, { useState, useEffect } from 'react';
import { fetchUserInfo, fetchUserItems, insertUserItem } from './action';
import InputDialog from '@/app/components/input-dialog';
import { useRouter } from 'next/navigation';

const getUserItems = async () => {
  const userItems = await fetchUserItems();
  return userItems;
};

const getUserInfo = async (token: string) => {
  const userInfo = await fetchUserInfo(token);
  return userInfo;
}

function ListPage () {
  const [data, setData] = useState<{id: number, user_id: number, name: string}[]>([]); 
  const [userInfo, setUserInfo] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token') || '';
      const result = await getUserItems();
      const userInfoRes = await getUserInfo(token);
      setData(result); 
      setUserInfo(userInfoRes);
    };
    getData();
  }, []);

  const loginUserItem = async (name: string) => {
    const item = await insertUserItem(userInfo.id, name);
    if (item) setData((prevData) => [...prevData, item]);
  }

  return (
    <div style={styles.container}>
      <InputDialog title='登录新项目' onConfirm={loginUserItem}/>
      {/* 添加项目按钮 */}
      <button style={styles.addButton} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'} onClick={() => {(window as any).openInputDialog()}}>
        添加项目
      </button>
      
      {/* 分隔横线 */}
      <hr style={styles.separator} />

      {/* 显示数据数组 */}
      <div style={styles.dataContainer}>
        <ul style={styles.list}>
          {data.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <button 
                style={styles.itemButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.fontSize = '18px';
                  e.currentTarget.style.fontWeight = 'bold';
                  e.currentTarget.style.background = 'linear-gradient(90deg, #3D7EAA, #FFE47A)';
                  e.currentTarget.style.transform = 'translateY(-4px) translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.fontSize = '14px';
                  e.currentTarget.style.fontWeight = '200';
                  e.currentTarget.style.background = 'linear-gradient(90deg, #16A085, #F4D03F)';
                  e.currentTarget.style.transform = 'translateY(0) translateX(0)';
                }}
                onClick={() => router.push(`/list/${item.user_id}/item/${item.id}`)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%',
    padding: '20px',
    position: 'relative', 
    boxSizing: 'border-box',
    borderRadius: '8px', 
    background: 'linear-gradient(135deg, #0ABFBC, #314755)', 
  },
  addButton: {
    position: 'absolute', 
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.2s ease', 
  },
  separator: {
    marginTop: '70px', 
    marginBottom: '20px',
    border: 'none',
    borderBottom: '2px solid #ddd',
  },
  dataContainer: {
    paddingLeft: '10px',
  },
  list: {
    listStyleType: 'none', 
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '15px', 
  },
  itemButton: {
    width: '300px',
    height: '39px',
    padding: '10px 15px',
    background: 'linear-gradient(90deg, #16A085, #F4D03F)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease, transform 0.2s ease', 
  },
};

export default ListPage;