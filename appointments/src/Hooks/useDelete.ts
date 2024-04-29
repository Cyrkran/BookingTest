import { useState } from 'react';

interface DeleteReturn<T> {
    message: string;
    data?: T
}

const useDelete = <T>(path: string) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<DeleteReturn<T> | null>(null)
    const [error, setError] = useState<DeleteReturn<T> | null>(null);
    const url = `${import.meta.env.VITE_BASE_URL}${path}`

    const deleteData = async <D>(urlParams: string, payload?: D) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/${urlParams}`, {
                method: 'DELETE',
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

    return { success, loading, error, deleteData };
};

export default useDelete;