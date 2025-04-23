import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/api/user/getUserProfile', {
                    withCredentials: true
                });
                setAllUsers(response.data?.allUsers || []);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    return { allUsers, loading, error };
};
