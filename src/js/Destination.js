class Destination {
  constructor(data) {
    Object.entries(data).forEach(prop => this[prop[0]] = prop[1]);
  };

  getName() {
    return this.destination
  }
};

export default Destination;
