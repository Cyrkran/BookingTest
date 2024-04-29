import { HttpRequestHeader } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';

const useFetch = <T>(path: string, options: HttpRequestHeader) => {
    const [data, setData] = useState<null | T>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = `${import.meta.env.VITE_BASE_URL}${path}`
    useEffect(() => {
        fetchData();
    }, [path]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url, options);
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else {
                throw res;
            }
        } catch (error: any) {
            setError(error);
            setData(null)
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchData };
}

export default useFetch