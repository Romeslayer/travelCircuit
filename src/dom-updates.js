const updateDay = (date) => {
  todayDate.innerText = `Today's Date: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const updateTrips = (traveler, date) => {
  let thisYearTrips = traveler.trips.approved.filter(trip => new Date(trip.date) > new Date(`${date.getFullYear()}`));
  totalSpent.innerText = `You have spent $${Math.floor(thisYearTrips.reduce((acc, trip) => {
    acc += trip.getCost();
    return acc;
  }, 0) * 1.1)} so far for ${date.getFullYear()}`;

  const current = traveler.trips.approved.find(trip => {
    let startDate = new Date(trip.date);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + trip.duration);
    return startDate < date && endDate > date;
  });

  const past = traveler.trips.approved.filter(trip => {
    let startDate = new Date(trip.date);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + trip.duration);
    return endDate < date;
  });

  const future = traveler.trips.approved.filter(trip => {
    let startDate = new Date(trip.date);
    return startDate > date;
  });

  const pending = traveler.trips.pending;

  displayTrips(current, past, future, pending);
}

const setupForm = (traveler, travelRepo) => {
  suggestInput.value = [];
  let today = new Date()
  dateInput.min = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  userIdInput.value = traveler.id;
  travelRepo.destinations.map(des => [des.destination, des.id]).sort().forEach(destination => {
  formDestinations.innerHTML+= `<option value="${destination[1]}">${destination[0]}</option>`
  });
}

 const drawTripCard = (trip) => {
   let status = new String(trip.status);
    status = status[0].toUpperCase() + status.slice(1);
   return `
   <div class="trip-card">
    <img class="destination-img" src="${trip.destination.image}" alt="${trip.destination.alt}">
    <div class="card-body">
    <h4>${trip.destination.destination}</h4>
    <p>${trip.date}</p>
    <p>Guests: ${trip.travelers}</p>
    <p>Nights: ${trip.duration}</p>
    <p>Total: $${Math.floor(trip.getCost() * 1.1)}</p>
    <p class="${trip.status}">${status}</p>
    </div>
   </div>`;
 }

const displayTrips = (current, past, future, pending) => {
  currentTrips.innerHTML = `<h3>Current Trips</h3>`;
  pastTrips.innerHTML = `<h3>Previous Trips</h3>`;
  futureTrips.innerHTML = `<h3>Upcoming Trips</h3>`;
  pendingTrips.innerHTML = `<h3>Pending Trips</h3>`;
  if(current) {
    currentTrips.innerHTML+= drawTripCard(current);
  }

  if(past.length) {
    past.forEach(trip => pastTrips.innerHTML += drawTripCard(trip));
  }

  if(future.length) {
    future.forEach(trip => futureTrips.innerHTML += drawTripCard(trip));
  }

  if(pending.length) {
    pending.forEach(trip => pendingTrips.innerHTML += drawTripCard(trip));
  }
}

const updateTraveler = (traveler, date) => {
  travelerName.innerText = `Welcome ${traveler.name}`;
  updateTrips(traveler, date);
}

const updateEstimate = (trip) => {
  estimate.innerText = `Estimate: $${Math.floor(trip.getCost() * 1.1)}`
  exampleTripSpace.innerHTML = drawTripCard(trip);
}

const resetEstimate = () => {
  estimate.innerText = `Estimate:`;
  exampleTripSpace.innerHTML = ` `;
}

const showResponse = () => {
  resetEstimate();
  document.querySelector('main').classList.add('filter');
  alertBox.classList.remove('hidden');
  setTimeout(hideResponse, 3000)
}

const hideResponse = () => {
  alertBox.classList.add('hidden');
  document.querySelector('main').classList.remove('filter');
}
export {
  updateDay,
  updateTraveler,
  setupForm,
  drawTripCard,
  showResponse,
  updateEstimate,
  resetEstimate
}
