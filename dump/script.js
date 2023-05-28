
// const apiKey = 'AIzaSyA5EFJgOfcfTtUqd_MtWEIdeiK0-N06f-4';
// const aviationStackApiKey = 'be3b602959c4fb9b25f8ec7d73de8a2f';

// let hotelResults = document.getElementById('hotelResults');
// let placeIdArray = [];

// function findHotels() {
//     //for hotels
//     const placeInput = document.getElementById('placeInput').value;
//     const geocoder = new google.maps.Geocoder();

//     geocoder.geocode({ address: placeInput }, (results, status) => {
//         if (status === 'OK' && results.length > 0) {
//             const place = results[0];
//             const placeLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                 place.formatted_address
//             )}`;
//             let placeAddress = place.formatted_address;
//             const location = place.geometry.location;

//             const map = new google.maps.Map(document.createElement('div'));
//             const placesService = new google.maps.places.PlacesService(map);

//             const request = {
//                 placeId: place.place_id,
//                 fields: ['name', 'photos']
//             };

//             placesService.getDetails(request, (place, status) => {
//                 if (status === 'OK' && place) {
//                     const photoURL = place.photos && place.photos.length > 0 ? place.photos[0].getUrl() : 'placeholder.jpg';

//                     const placeElement = document.createElement('div');
//                     placeElement.innerHTML = `
//                         <div>
//                             <img src="${photoURL}" alt="${place.name}" style="width: auto; max-height: 200px;">
//                         </div>
//                         <h2>Place: ${placeAddress}</h2>
//                         <p><a href="${placeLink}" target="_blank">View on Google Maps</a></p>
//                         <hr>
//                     `;
//                     hotelResults.innerHTML = '';
//                     hotelResults.appendChild(placeElement);

//                     const nearbySearchRequest = {
//                         location: location,
//                         radius: 5000, // Set the radius parameter to 5000 meters (5 kilometers)
//                         type: 'lodging'
//                     };

//                     placesService.nearbySearch(nearbySearchRequest, (results, status, pagination) => {
//                         if (status === 'OK' && results.length > 0) {
//                             placeIdArray = [];

//                             for (let i = 0; i < Math.min(5, results.length); i++) {
//                                 const hotel = results[i];
//                                 const name = hotel.name;
//                                 const rating = hotel.rating;
//                                 const placeId = hotel.place_id;
//                                 const photoURL = hotel['photos'][0].getUrl({maxWidth: 100});

//                                 placeIdArray.push(placeId);

//                                 const hotelElement = document.createElement('div');
//                                 hotelElement.innerHTML = `
//                                     <div>
//                                         <img src="${photoURL}" alt="${name}" style="width: auto; max-height: 200px;">
//                                     </div>
//                                     <h2>${name}</h2>
//                                     <p>Rating: ${rating}</p>
//                                     <p><a href="#" onclick="bookHotel('${placeId}')">Book Now</a></p>
//                                     <hr>
//                                 `;
//                                 hotelResults.appendChild(hotelElement);
//                             }

//                             if (pagination && pagination.hasNextPage) {
//                                 const loadMoreElement = document.createElement('div');
//                                 loadMoreElement.innerHTML = `
//                                     <p><a href="#" onclick="loadMore()">Load More</a></p>
//                                     <hr>
//                                 `;
//                                 hotelResults.appendChild(loadMoreElement);
//                             }
//                         } else {
//                             console.log('No hotels found.');
//                         }
//                     });
//                 } else {
//                     console.log('Failed to retrieve place details.');
//                 }
//             });
//         } else {
//             console.log('Place not found.');
//             alert("Place not found. Please try again with some other place.")
//         }
//     });
// }

// function loadMore() {
//     const map = new google.maps.Map(document.createElement('div'));
//     const placesService = new google.maps.places.PlacesService(map);

//     const lastPlaceId = placeIdArray[placeIdArray.length - 1];
//     const lastPlaceIndex = placeIdArray.length - 1;

//     const request = {
//         placeId: lastPlaceId,
//         fields: ['geometry']
//     };

//     placesService.getDetails(request, (place, status) => {
//         if (status === 'OK' && place && place.geometry && place.geometry.location) {
//             const location = place.geometry.location;

//             const nearbySearchRequest = {
//                 location: location,
//                 radius: 5000, // Set the radius parameter to 5000 meters (5 kilometers)
//                 type: 'lodging'
//             };

//             placesService.nearbySearch(nearbySearchRequest, (results, status, pagination) => {
//                 if (status === 'OK' && results.length > 0) {
//                     const loadMoreElement = document.getElementById('loadMore');
//                     if (loadMoreElement) {
//                         loadMoreElement.remove();
//                     }

//                     // Clear the hotelResults container
//                     hotelResults.innerHTML = '';

//                     for (let i = 0; i < Math.min(10, results.length); i++) {
//                         const hotel = results[i];
//                         const name = hotel.name;
//                         const rating = hotel.rating;
//                         const placeId = hotel.place_id;
//                         const photoURL = hotel['photos'][0].getUrl({maxWidth: 100});
//                         placeIdArray.push(placeId);

//                         const hotelElement = document.createElement('div');
//                         hotelElement.innerHTML = `
//                             <div>
//                                 <img src="${photoURL}" alt="${name}" style="width: auto; max-height: 200px;">
//                             </div>
//                             <h2>${name}</h2>
//                             <p>Rating: ${rating}</p>
//                             <p><a href="#" onclick="bookHotel('${placeId}')">Book Now</a></p>
//                             <hr>
//                         `;
//                         hotelResults.appendChild(hotelElement);
//                     }

//                     if (pagination && pagination.hasNextPage) {
//                         const loadMoreElement = document.createElement('div');
//                         loadMoreElement.id = 'loadMore';
//                         loadMoreElement.innerHTML = `
//                             <p><a href="#" onclick="loadMore()">Load More</a></p>
//                             <hr>
//                         `;
//                         hotelResults.appendChild(loadMoreElement);
//                     }
//                 } else {
//                     console.log('No more hotels found.');
//                 }
//             });
//         } else {
//             console.log('Failed to retrieve location for the place ID: ' + lastPlaceId);
//             placeIdArray.splice(lastPlaceIndex, 1); // Remove the invalid place ID from the array
//         }
//     });
// }


// function bookHotel(placeId) {
//     const map = new google.maps.Map(document.createElement('div'));
//     const placesService = new google.maps.places.PlacesService(map);

//     const request = {
//         placeId: placeId,
//         fields: ['url']
//     };

//     placesService.getDetails(request, (place, status) => {
//         if (status === 'OK' && place && place.url) {
//             window.open(place.url, '_blank');
//         } else {
//             console.log('Failed to retrieve booking information.');
//         }
//     });
// }
