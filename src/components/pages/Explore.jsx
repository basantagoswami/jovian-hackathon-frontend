import React, { useState } from 'react';
import axios from 'axios';
import { host } from '../../utils/ApiRoutes';
import './Explore.css';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [promptText, setPromptText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const access_token = localStorage.getItem('access_token');

  const handleSendMessage = async () => {
    try {
      setIsSending(true);
      setSendSuccess(false);
      setSendError('');

      const headers = {
        Authorization: access_token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const response = await axios.post(`${host}/places/explore`, { promptText }, { headers });

      console.log(response.data);
      setIsSending(false);
      setSendSuccess(true);
      setPromptText('');
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
      setIsSending(false);
      setSendError('Failed to send message. Please try again.');
    }
  };

  const handlePlaceClick = async (place) => {
    try {
      const apiUrl = `https://jovian-hackathon-backend.vercel.app/places/details?placeName=${place}`;
  
      const response = await axios.get(apiUrl);
      console.log(response.data);
  
      const { status, ...responseData } = response.data; // Filter out the status code
      setSelectedPlaceDetails(JSON.stringify(responseData, null, 2)); // Format response as JSON string
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="explore-container">
      <h1>Explore</h1>

      <div className="message-input">
        <textarea
          placeholder="Enter your message"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
        />
        <button className="send-button" disabled={isSending} onClick={handleSendMessage}>
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {sendSuccess && <p className="success-message">Message sent successfully!</p>}
      {sendError && <p className="error-message">{sendError}</p>}

      <div className="cards-container">
        {responseData && responseData.slice(0, 5).map((place, index) => (
          <Link className="card" to={`/explore&query=${place}`}>
          {/* <div className="card" key={index} onClick={() => handlePlaceClick(place)}> */}
            {/* <Link to={`/explore&query=${place}`}>{place}</Link> */}
            <h2>{place}</h2>
            {place.additionalInfo && <p>{place.additionalInfo}</p>}
          {/* </div> */}
          </Link>
        ))}
      </div>

      {selectedPlaceDetails && (
        <div className="place-details">
          <h2>API Response</h2>
          <textarea className="response-textarea" value={selectedPlaceDetails} readOnly />
        </div>
      )}
    </div>
  );
};

export default Explore;
