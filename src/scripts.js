import './css/index.css';
import {
  getData
} from './apiCalls';
import {
  updateDay,
  updateTraveler,
  createDestinationsList
} from './dom-updates.js';
import Traveler from './js/Traveler.js';
import Destination from './js/Destination.js';
import TravelRepo from './js/TravelRepo.js';
import Trip from './js/Trip.js';

const todayDate = document.querySelector('#todayDate');


const fetchData = () => {
  Promise.all([getData('travelers'), getData('trips'), getData('destinations')]).then(data => {
    handleData(data);
  });
}

const getRandomTraveler = (travelRepo) => {
  return travelRepo.getTraveler(Math.floor(Math.random() * (travelRepo.travelers.length)) + 1)
}

const handleData = (data) => {
  let travelers = data[0];
  let trips = data[1];
  let destinations = data[2];
  createDestinationsList(destinations);
  let travel = new TravelRepo(travelers, trips, destinations);
  let today =  new Date();
  let traveler = getRandomTraveler(travel);
  updateTraveler(traveler, today)
  updateDay(today);
}

const checkForm = (e) => {
  const form = tripForm;
  const data = new FormData(tripForm);
  console.log(data.has('id'));
}

const submitForm = (e) => {
  e.preventDefault();
  if(checkform()) 1 + 1
}
window.onload = fetchData;
tripForm.onsubmit = submitForm;
tripForm.oninput = checkForm;
