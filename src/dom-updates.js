const updateDay = (date) => {
  todayDate.innerText = `Today's Date: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
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
  displayTrips(current, past, future, pending)
}
 const drawTripCard = (trip) => {
   return `
   <div class="trip-card">
    <div class"card-header ${trip.status}"></div>
    <img class="destination-img" src="${trip.destination.image}" alt="${trip.destination.alt}">
    <div class="card-body">
    <h3>${trip.destination.destination}</h3>
    <p>Guests: ${trip.travelers}</p>
    <p>Nights: ${trip.duration}</p>
    <p>Total: $${trip.getCost()}</p>
    </div>
   </div>`
 }
const displayTrips = (current, past, future, pending) => {
  if(current) {
    currentTrips.innerHMTL+= drawTripCard(current)
  }

  if(past.length) {
    past.forEach(trip => pastTrips.innerHTML += drawTripCard(trip))
  }

  if(future.length) {
    future.forEach(trip => futureTrips.innerHTML += drawTripCard(trip))
  }

  if(pending.length) {
    pending.forEach(trip => pendingTrips.innerHMTL += drawTripCard(trip))
  }
}

const updateTraveler = (traveler, date) => {
  travelerName.innerText = `Welcome ${traveler.name}`
  updateTrips(traveler, date)


}

export {
  updateDay,
  updateTraveler
}
