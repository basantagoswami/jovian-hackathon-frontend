import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Hotels = () => {
  const {id} = useParams();
  const location = useLocation();
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const place = new URLSearchParams(location.search).get('place');
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyA5EFJgOfcfTtUqd_MtWEIdeiK0-N06f-4&query=${encodeURIComponent(place)}`);
        setHotelsData(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotelsData();
  }, [location.search]);
console.log("ID", id)
  return (
    <div>
      <h1>Hotels</h1>
      <ul>
        {hotelsData.map((hotel, index) => (
          <li key={index}>
            <h3>{hotel.name}</h3>
            <p>{hotel.formatted_address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;
  