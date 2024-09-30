'use server';

export const fetchUserInfo = async (token: string) => {
    'use server';
    try {
        const verifyRes = await fetch('http://localhost:8080/api/getUserInfo', {
            method: 'GET',
            headers: {
                'token': token,
            },
            cache: 'no-store',
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

export const fetchUserItems = async () => {
    'use server';
    try {
        const verifyRes = await fetch('http://localhost:8080/api/getUserItems', {
            method: 'GET',
            next: {
                revalidate: 600,
            }
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

export const insertUserItem = async (userId: number, name: string) => {
    'use server';

    try {
        const res = await fetch('http://localhost:8080/api/insertUserItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ userId, name }),
        })
        
        if (res.ok) {
            const result = await res.json();
            return result;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}