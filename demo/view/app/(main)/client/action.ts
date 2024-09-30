'use server';

export const fetchTime = async () => {
    'use server';
    try {
        const verifyRes = await fetch('http://localhost:8080/api/getTime', {
            method: 'GET',
        })
        
        if (verifyRes.ok) {
            const result = await verifyRes.json();
            return result.time;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}