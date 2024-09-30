export const insertTheme = async (userId: number, theme: string, location: Array<number>) => {
   const themeResponse = {id: null, userId: null, theme: ''};
    try {
        const res = await fetch('http://localhost:8080/api/insertTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, theme, location }),
        });

        const data = await res.json();

        if (res.ok) {
            themeResponse.id = data.id;
            themeResponse.userId = data.userId;
            themeResponse.theme = data.theme;
        }
    } catch (error) {
        console.error(error);
    }
    return themeResponse;
}