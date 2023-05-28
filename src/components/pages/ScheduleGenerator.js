import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { host } from '../../utils/ApiRoutes';
import './ScheduleGenerator.css';

const ScheduleGenerator = () => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(`${host}/places/schedule`, {
        city: city,
        startDate: startDate,
        endDate: endDate
      });

      setResponse(result.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Travel Schedule Generator</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" required onChange={(e) => setCity(e.target.value)} />

        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" name="startDate" required onChange={(e) => setStartDate(e.target.value)} />

        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" name="endDate" required onChange={(e) => setEndDate(e.target.value)} />

        <button type="submit">Generate Schedule</button>
      </form>

      {response && (
        <ReactMarkdown remarkPlugins={[gfm]}>
          {response}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default ScheduleGenerator;
