import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { host } from '../../utils/ApiRoutes';
import './Explore.css';
import { Link, useNavigate } from 'react-router-dom';

const Explore = () => {
  const [promptText, setPromptText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [detailsData, setDetailsData] = useState(null);
  const access_token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const prevResponseDataRef = useRef();

  useEffect(() => {
    prevResponseDataRef.current = responseData;
  }, [responseData]);

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
      setSelectedPlace(place);
      setDetailsData(null); // Clear previous details data
      const response = await axios.get(`${host}/places/details?placeName=${place}`);
      console.log(response.data);
      setDetailsData(response.data);

      // Redirect to the next page with the selected place as a query parameter
      navigate(`/hotels?place=${encodeURIComponent(place)}`);
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
        {responseData.slice(0, 5).map((place, index) => (
          <div className="card" key={index} onClick={() => handlePlaceClick(place)}>
            <div className="place-image-container">
              <img className="place-image" src={`images/${place}.jpg`} alt={place} />
              <span className="place-name">{place}</span>
            </div>
            <div className="place-info">
              <h2>{place}</h2>
              <p>{detailsData}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPlace && (
        <div className="selected-place">
          <h2>Selected Place: {selectedPlace}</h2>
        </div>
      )}
    </div>
  );
};

export default Explore;
