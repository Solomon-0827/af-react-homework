'use client';

import { inputClient } from "@/app/components/input";
import { memo, useMemo, useState, useDeferredValue, useEffect } from "react";
import { fetchUserInfo } from "../list/action";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";


const AppendInput = memo(({ text }: { text: string }) => {
    for (let index = 0; index < 100000; index++) { }
    console.log(text)
    return null;
});


export const InputBox = () => {
    const { InputEle, delayContent } = inputClient();
    const InputClient = () => {
        const vainEle = new Array(10000).fill('');
        return (
            <div>
                {InputEle}
                {vainEle.map((_, index) => <AppendInput key={index} text={delayContent}></AppendInput>)}
            </div>
        )
    }

    return <div>{InputClient()}</div>
}


export const BackToClientButton = () => {
    const router = useRouter();
    const { mutate } = useSWRConfig();

    const backToClient = () => {
        mutate("getTime", "Modified");
        router.back();
    }

    return (
        <div>
            <button
                onClick={backToClient}
                style={styles.button}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f2a154',
                    e.currentTarget.style.transform = 'translateY(-4px) translateX(4px)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f28a30',
                    e.currentTarget.style.transform = 'translateY(0px) translateX(0px)'
                }}
            >
                Back To Client Page
            </button>
        </div>
    );
}


export const UserButton = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<number | null>(null);
    const sec = new Date().getSeconds();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token') || '';
            const userInfo = await fetchUserInfo(token);
            setUserId(userInfo.id); 
        };
        fetchUser();
    }, []);

    const goToUserLink = () => {
        if (userId !== null) {
            router.push(`/client/child/${userId}/${sec}`);
        }
    };

    return (
        <button
            onClick={goToUserLink}
            style={styles.button}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f2a154',
                e.currentTarget.style.transform = 'translateY(-4px) translateX(4px)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f28a30',
                e.currentTarget.style.transform = 'translateY(0px) translateX(0px)'
            }}
        >
            Go To User Page
        </button>
    );
}


const styles = {
    button: {
        backgroundColor: '#f28a30', 
        color: '#fff', 
        padding: '12px 24px', 
        fontSize: '16px', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        transition: 'all 0.3s ease', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
    },
};