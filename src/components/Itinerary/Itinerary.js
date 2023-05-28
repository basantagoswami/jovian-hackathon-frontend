import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './Itinerary.css';

// const host = 'https://jovian-hackathon-backend.vercel.app';
const host = 'http://localhost:3000';

const ScheduleComponent = () => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post(`${host}/places/schedule`, {
                    city: 'mumbai',
                    startDate: '2023-09-27 18:00:00.000',
                    endDate: '2023-09-30 18:00:00.000'
                });

                setResponse(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <ReactMarkdown remarkPlugins={[gfm]}>
                {response}
            </ReactMarkdown>
        </div>
    );
};

export default ScheduleComponent;
