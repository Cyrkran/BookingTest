import { useState } from 'react';

interface PostReturn<D> {
    message: string;
    data?: D
}

const usePost = <D>(path: string) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<PostReturn<D> | null>(null)
    const [error, setError] = useState<PostReturn<D> | null>(null);
    const url = `${import.meta.env.VITE_BASE_URL}${path}`

    const postData = async <T>(payload: T) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
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

    return { success, loading, error, postData };
};

export default usePost;