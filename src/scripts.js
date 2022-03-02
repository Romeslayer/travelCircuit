// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/index.css';
import {
  getData,
  travelersData,
  tripsData,
  destinationsData
} from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

const fetchData = () => {
  Promise.all([getData('travelers'), getData('trips'), getData('destinations')]).then(data => {
    console.log(data);
  })
}
fetchData();
console.log('This is the JavaScript entry file - your code begins here.');
