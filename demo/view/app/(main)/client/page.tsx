'use client';

import ConfirmDialog from "@/app/components/confirm-dialog";
import useSWR, { SWRConfig } from "swr";
import { fetchTime } from "./action";
import { useEffect, useMemo, useState } from "react";
import NoticeDialog from "@/app/components/notice-dialog";
import Link from "next/link";

export default () => {
    const [isHovered, setIsHovered] = useState(false); 

    const showTips = () => {
        (window as any).openNoticeDialog(); 
        setTimeout(() => {
            (window as any).closeNoticeDialog(); 
        }, 3000);
    };

    const getTime = () => {
        const { data } = useSWR('getTime', async () => {
            return await fetchTime();
        }, {
            onLoadingSlow: () => showTips(),
        });

        const node = useMemo(() => (
            <div style={styles.dataContainer}>
                <span style={styles.dataLabel}>Data: </span>
                <span style={styles.dataValue}>{data || 'Loading...'}</span>
            </div>
        ), [data]);

        return node;
    };

    return (
        <div style={styles.container}>
            <NoticeDialog title={"Please Wait"} message={"Waiting for 2 seconds."} />
            <SWRConfig value={{
                revalidateOnFocus: false,
                refreshInterval: 20 * 1000,
                loadingTimeout: 3 * 1000,
            }}>
                <div style={styles.content}>
                    {getTime()}
                    {/* 添加动态效果的按钮 */}
                    <Link
                        href='/client/child'
                        style={isHovered ? { ...styles.link, ...styles.linkHover } : styles.link}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Go To Child Page
                    </Link>
                </div>
            </SWRConfig>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        padding: '20px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px', 
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #FFEEEE, #DDEFBB)',
        width: '400px',
        textAlign: 'center' as 'center',
    },
    dataContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    dataLabel: {
        fontSize: '18px',
        fontWeight: 600,
        color: '#333',
    },
    dataValue: {
        fontSize: '18px',
        color: '#0070f3',
    },
    link: {
        textDecoration: 'none',
        color: '#ffffff',
        backgroundColor: '#0070f3',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 112, 243, 0.2)',
        fontWeight: 400,
        transform: 'translateY(0) translateX(0)',
    },
    linkHover: {
        backgroundColor: '#005bb5',
        transform: 'translateY(-4px) translateX(4px)', 
        fontSize: '18px', 
        fontWeight: 'bold' as 'bold',
    },
};