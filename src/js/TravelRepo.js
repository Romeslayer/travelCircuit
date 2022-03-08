import Destination from './Destination.js';
import Trip from './Trip.js';
import Traveler from './Traveler.js';

class TravelRepo {
  constructor(travelers, trips, destinations) {
    this.destinations = destinations.map(des => new Destination(des));
    this.trips = trips.map(trip => new Trip(trip, this.getDestination(trip.destinationID)));
    this.travelers = travelers.map(traveler => new Traveler(traveler, this.getTrips(traveler.id)));
  }

  getDestination(id) {
    return this.destinations.find(des => des.id === id) || 'Sorry that Destination id is invalid.';
  }

  getTrips(id) {
    let trips = this.trips.filter(trip => trip.userID === id);
    return trips.length ? trips : 'Sorry there are no Trips for this user id.';
  }

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id) || `Sorry there is no user with id ${id}.`;
  }
}

export default TravelRepo;
