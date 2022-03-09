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
  resetEstimate,
  hideLogin,
  showLogin,
  showMain,
  hideMain
} from './dom-updates.js';
import Traveler from './js/Traveler.js';
import Destination from './js/Destination.js';
import TravelRepo from './js/TravelRepo.js';
import Trip from './js/Trip.js';

const todayDate = document.querySelector('#todayDate');
const header = document.querySelector('header');

let travel;
let traveler;

const fetchData = () => {
  Promise.all([getData('travelers'), getData('trips'), getData('destinations')]).then(data => {
    handleData(data);
  });
}

const fetchNewData = () => {
  Promise.all([getData('travelers'), getData('trips'), getData('destinations')]).then(data => {
    handleData(data);
    loadUser(traveler.id);
  });
}


const handleData = (data) => {
  let travelers = data[0];
  let trips = data[1];
  let destinations = data[2];
  travel = new TravelRepo(travelers, trips, destinations);
}

const loadUser = (id) => {
  let today =  new Date();
  traveler = travel.getTraveler(id);
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
    postTrip(checkForm());
    resetEstimate();
    showResponse();
    e.target.reset();
    fetchNewData()
  }
}

const validate = (data) => {
  let username = data.get('username');
  let password = data.get('password');
  let valid = false;
  const usernames = travel.travelers.map(traveler => `traveler${traveler.id}`);
  const passwords = ['travel']

  if(usernames.includes(username) && passwords.includes(password)) {
    valid = true;
  }
  return valid;
}

const login = (e) => {
  e.preventDefault();
  const data = new FormData(e.target)
  if(validate(data)) {
    message.innerText = `Login successful.`;
    showResponse();
    loadUser(parseInt(data.get('username').slice(8)));
    hideLogin();
    showMain();
    e.target.reset();
  } else {
    message.innerText = `Username or password is incorrect.`;
    showResponse();
  }
}

const logout = (e) => {
  if(e.target.id === 'logOut') {
    message.innerText = `Log out successful`;
    showResponse();
    showLogin();
    hideMain();
  }
}

window.onload = fetchData;
tripForm.onsubmit = submitForm;
tripForm.oninput = checkForm;
loginForm.onsubmit = login;
header.onclick = logout;
