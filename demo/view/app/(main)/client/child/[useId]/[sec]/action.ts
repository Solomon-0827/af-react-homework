export const fetchAllUser = async () => {
    'use server';
    try {
        const verifyRes = await fetch('http://localhost:8080/api/getAllUser', {
            method: 'GET',
        })
        
        if (verifyRes.ok) {
            const result = await verifyRes.json();
            return result;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}