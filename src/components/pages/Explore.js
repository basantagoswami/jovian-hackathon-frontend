import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { host } from '../../utils/ApiRoutes';
import './Explore.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Explore = () => {
  const [promptText, setPromptText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const access_token = localStorage.getItem('access_token');
  
  const prevResponseDataRef = useRef(); // Create a ref to store the previous responseData

  useEffect(() => {
    prevResponseDataRef.current = responseData; // Update the ref with the current responseData
  }, [responseData]); // This runs every time responseData changes

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
      
      const response = await axios.post(
        `${host}/places/explore`,
        { promptText },
        { headers }
      );

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

  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls = [];

      for (const place of responseData) {
        try {
          const headers = {
            Authorization: 'cMNN6k4FA6ZCj62MP9vGJU8BhWGnaM5xQZeNKWVsToJp7KBHxjEAv4Gb',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          };
          const response = await axios.get(`https://api.pexels.com/v1/search?query=${place.name}`, {
            headers,
          });
          const imageUrl = response.data.photos[0]?.src.small; 
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(error);
          imageUrls.push(null); 
        }
      }

      setResponseData(prevData =>
        prevData.map((place, index) => ({
          ...place,
          imageUrl: imageUrls[index]
        }))
      );
    };

    // Only run fetchImages if responseData has changed
    if (prevResponseDataRef.current !== responseData) {
      fetchImages();
    }
  }, [responseData]);

  const navigate = useNavigate();

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    console.log(`Clicked on ${place}`);
    navigate(`/places/details/${place}`);
  };

  return (
    <div className="explore-container">
      <h1>Explore</h1>

      <Link to="/schedule-generator">Go to Schedule Generator</Link>

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
              {place.imageUrl && (
                <img className="place-image" src={place.imageUrl} alt={place.name} />
              )}
            </div>
            <div className="place-info">
              <h2>{place.name}</h2>
              <p>{place.additionalInfo}</p>
            </div>
            <span className="place-name">{place.name}</span>
          </div>
        ))}
      </div>

      {selectedPlace && (
        <div className="selected-place">
          <h2>Selected Place: {selectedPlace.name}</h2>
        </div>
      )}
    </div>
  );
};

export default Explore;
