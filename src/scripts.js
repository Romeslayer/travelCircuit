import './css/index.css';
import {
  getData,
  postTrip
} from './apiCalls';
import {
  updateDay,
  updateTraveler,
  setupForm,
  drawTripCard,
  showResponse,
  updateEstimate,
  resetEstimate
} from './dom-updates.js';
import Traveler from './js/Traveler.js';
import Destination from './js/Destination.js';
import TravelRepo from './js/TravelRepo.js';
import Trip from './js/Trip.js';

const todayDate = document.querySelector('#todayDate');
let travel;


const fetchData = () => {
  Promise.all([getData('travelers'), getData('trips'), getData('destinations')]).then(data => {
    handleData(data);
  });
}

const getRandomTraveler = (travelRepo) => {
  return travelRepo.getTraveler(2)
}

const handleData = (data) => {
  let travelers = data[0];
  let trips = data[1];
  let destinations = data[2];
  travel = new TravelRepo(travelers, trips, destinations);
  let today =  new Date();
  let traveler = getRandomTraveler(travel);
  updateTraveler(traveler, today)
  updateDay(today)
  setupForm(traveler, travel);
}

const checkForm = (e) => {
  const form = tripForm;
  const data = new FormData(tripForm);
  if(data.get('destination') && data.get('date') && data.get('duration') && data.get('travelers')) {
    let newTrip = {
      id: parseInt(data.get('id')),
      userID: parseInt(data.get('userID')),
      destinationID: parseInt(data.get('destination')),
      travelers: parseInt(data.get('travelers')),
      date: data.get('date').split('-').join('/'),
      duration: parseInt(data.get('duration')),
      status: "pending",
      suggestedActivities: []
    }
    let exampleTrip = new Trip(newTrip, travel.destinations.find(des => des.id === newTrip.destinationID));
    updateEstimate(exampleTrip);
    return newTrip;
  }
}

const submitForm = (e) => {
  e.preventDefault();
  tripIdInput.value = Date.now() + Math.random();
  if(checkForm()) {
    postTrip(checkForm())
    showResponse();
    e.target.reset();
    fetchData();
  }
}


window.onload = fetchData;
tripForm.onsubmit = submitForm;
tripForm.oninput = checkForm;
