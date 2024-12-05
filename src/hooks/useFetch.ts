import { useState, useCallback } from 'react';

const useFetch = (apiUrl: string = "http://localhost:8000") => {
    const [data, setData] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (endpoint: string, method: string, body?: unknown) => {
            setIsLoading(true);
            setError(null);

            try {
                const options: RequestInit = {
                    method,
                    headers: {},
                };

                if (body instanceof FormData) {
                    options.body = body;
                } else if (body) {
                    options.headers = {
                        'Content-Type': 'application/json',
                    };
                    options.body = JSON.stringify(body);
                }

                const response = await fetch(`${apiUrl}${endpoint}`, options);
                console.log("RESPONSE ", response);

                if (!response.ok) {
                    throw new Error('Could not fetch the data for that resource');
                }

                const responseData = await response.json();
                setData(responseData);
                return responseData
            } catch (err: unknown) {
                setError(err.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        },
        [apiUrl]
    );

    return { data, isLoading, error, fetchData };
};

export default useFetch;
