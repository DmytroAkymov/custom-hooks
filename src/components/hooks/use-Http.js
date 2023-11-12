import { useCallback, useState } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttpRequest = useCallback(
        async (requestOptions, manageProducts) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(requestOptions.endpoint, {
                    method: requestOptions.method
                        ? requestOptions.method
                        : 'GET',
                    headers: requestOptions.headers
                        ? requestOptions.headers
                        : {},
                    body: requestOptions.body
                        ? JSON.stringify(requestOptions.body)
                        : null,
                });

                if (!response.ok) {
                    throw new Error('The request failed.');
                }

                const data = await response.json();
                manageProducts(data);
            } catch (err) {
                setError(err.message || 'Something went wrong...');
            }
            setIsLoading(false);
        },
        []
    );

    return { sendHttpRequest, error, isLoading };
};

export default useHttp;
