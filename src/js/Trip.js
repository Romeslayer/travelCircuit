class Trip {
  constructor(data, destination) {
    Object.entries(data).forEach(prop => this[prop[0]] = prop[1]);
    this.destination = destination;
  }
  getCost() {
    return ((this.travelers * 2) * this.destination.estimatedFlightCostPerPerson) + (this.duration * this.destination.estimatedLodgingCostPerDay);
  }
};

export default Trip;
