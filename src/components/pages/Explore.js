import React, { useState } from 'react';
import axios from 'axios';
import './Explore.css';
import { host } from '../../utils/ApiRoutes';

const Explore = () => {
  const [promtText, setPromtText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [token, setToken] = useState('');

  const handleSendMessage = async () => {
    try {
      setIsSending(true);
      setSendSuccess(false);
      setSendError('');

      // Make API call to send message
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${host}/places/explore`, { promtText }, { headers });
      console.log(response.data);
      // Handle successful message sending
      setIsSending(false);
      setSendSuccess(true);
      setPromtText('');
    } catch (error) {
      console.error(error);
      // Handle message sending error
      setIsSending(false);
      setSendError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="explore-container">
      <h1>Explore</h1>
      <div className="message-input">
        <textarea
          placeholder="Enter your message"
          value={promtText}
          onChange={(e) => setPromtText(e.target.value)}
        />
        <button disabled={isSending} onClick={handleSendMessage}>
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {sendSuccess && <p className="success-message">Message sent successfully!</p>}
      {sendError && <p className="error-message">{sendError}</p>}
    </div>
  );
};

export default Explore;
