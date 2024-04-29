import { useState } from 'react';

interface PostReturn {
    message: string;
}

const usePut = (path: string) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<PostReturn | null>(null)
    const [error, setError] = useState<PostReturn | null>(null);
    const url = `${import.meta.env.VITE_BASE_URL}${path}`

    const updateData = async <T>(payload: T, urlParam: Array<string>) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/${urlParam.join('/')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const success = await response.json();
            setSuccess(success)
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    };

    return { success, loading, error, updateData };
};

export default usePut;