"use client"

import { useState, useEffect } from 'react';

const MyPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    } else {
        return (
            <div>
                <h1>My Page</h1>
            </div>
        );
    }
};

export default MyPage;
