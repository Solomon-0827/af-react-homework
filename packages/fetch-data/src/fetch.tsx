import { useState, useEffect } from "react"

export const useFetchData = (url: string) => {
    const [state, setState] = useState<{ id: number }[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setState(json);
        }

        fetchData();
    }, [url]);

    return state;
}