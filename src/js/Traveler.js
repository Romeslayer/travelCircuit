class Traveler {
  constructor(data, trips) {
    Object.entries(data).forEach(entry => this[entry[0]] = entry[1]);
    this.trips = {}
    this.trips.approved = [];
    this.trips.pending = [];
    trips.forEach(trip => trip.status === 'approved' ? this.trips.approved.push(trip) : this.trips.pending.push(trip));
  }
  getTotal() {
    return Math.floor(this.trips.approved.reduce((acc, trip) => {
      acc += trip.getCost();
      return acc;
    },0 ) * 1.1)
  }
}

export default Traveler;
