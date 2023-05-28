import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../../utils/ApiRoutes';

const PlaceDetails = ({ match }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const placeName = match.params.placeName;
        const response = await axios.get(`${host}/places/details?placeName=${placeName}`);

        if (response.status === 200) {
          setPlaceDetails(response.data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch place details');
        }
      } catch (error) {
        console.error('Failed to fetch place details', error);
      }
    };

    fetchPlaceDetails();
  }, [match.params.placeName]);

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <div>
          <h1>{match.params.placeName}</h1>
          {/* Place other details here */}
          {/* For example, for the placeLink: */}
          <a href={placeDetails.data.placeLink} target="_blank" rel="noreferrer">Google Maps Link</a>
          {/* Do the same for other data as needed */}
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
