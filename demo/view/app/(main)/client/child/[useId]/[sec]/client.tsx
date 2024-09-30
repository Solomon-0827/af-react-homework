'use client';

import { fetchUserInfo } from "@/app/(main)/list/action";
import { useEffect, useState } from "react";

const UserClient = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const token = localStorage.getItem('token') || '';
            const userInfo = await fetchUserInfo(token);
            setId(userInfo.id);
            setName(userInfo.username);
        };
        getUserInfo();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>User Information</h1>
                <div style={styles.info}>
                    <span style={styles.label}>User Id:</span>
                    <span style={styles.value}>{id}</span>
                </div>
                <div style={styles.info}>
                    <span style={styles.label}>User Name:</span>
                    <span style={styles.value}>{name}</span>
                </div>
            </div>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    card: {
        background: 'linear-gradient(135deg, #DAE2F8, #D6A4A4)',
        padding: '20px 40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    info: {
        marginBottom: '10px',
        fontSize: '18px',
    },
    label: {
        fontWeight: 'bold' as 'bold',
        color: '#555',
        marginRight: '10px',
    },
    value: {
        color: '#0070f3',
    },
};

export { UserClient };