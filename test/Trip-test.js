import chai from 'chai';
import tripsTestData from '../src/data/trips-test-data.js';
import Trip from '../src/js/Trip.js';
import destinationsTestData from '../src/data/destinations-test-data.js';
import Destination from '../src/js/Destination.js';
const expect = chai.expect;

describe('Trip', () => {
  let destinations, destination1, destination2;
  let trip1, trip2;
  let randTrip1, randTrip2;

  beforeEach(() => {
    destinations = destinationsTestData.map(destination => new Destination(destination));
    randTrip1 = tripsTestData[Math.floor(Math.random() * (tripsTestData.length - 1))];
    randTrip2 = tripsTestData[Math.floor(Math.random() * (tripsTestData.length - 1))];
    destination1 = destinations.find(des => des.id === randTrip1.destinationID);
    destination2 = destinations.find(des => des.id === randTrip2.destinationID);
    trip1 = new Trip(randTrip1, destination1);
    trip2 = new Trip(randTrip2, destination2);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceof(Trip);
    expect(trip2).to.be.an.instanceof(Trip);
  });

  it('should build a Trip based off of provided data', () => {
    expect(trip1.id).to.be.eql(randTrip1.id);
    expect(trip1.UserID).to.be.eql(randTrip1.UserID);
    expect(trip1.destinationID).to.be.eql(randTrip1.destinationID);
    expect(trip1.travelers).to.be.eql(randTrip1.travelers);
    expect(trip1.date).to.be.eql(randTrip1.date);
    expect(trip1.duration).to.be.eql(randTrip1.duration);
    expect(trip1.status).to.be.eql(randTrip1.status);
    expect(trip1.suggestedActivities).to.be.eql(randTrip1.suggestedActivities);
  });

  it('should build a Trip based off of different data', () => {
    expect(trip2.id).to.be.eql(randTrip2.id);
    expect(trip2.UserID).to.be.eql(randTrip2.UserID);
    expect(trip2.destinationID).to.be.eql(randTrip2.destinationID);
    expect(trip2.travelers).to.be.eql(randTrip2.travelers);
    expect(trip2.date).to.be.eql(randTrip2.date);
    expect(trip2.duration).to.be.eql(randTrip2.duration);
    expect(trip2.status).to.be.eql(randTrip2.status);
    expect(trip2.suggestedActivities).to.be.eql(randTrip2.suggestedActivities);
  });

  it('should have a destination from given destination', () => {
    expect(trip1.destination).to.be.eql(destination1);
    expect(trip2.destination).to.be.eql(destination2);
  });

  it('should be able to calculate the total cost of the trip with roundtrip flights', () => {
    let cost1 = ((randTrip1.travelers * 2) * destination1.estimatedFlightCostPerPerson) + (randTrip1.duration * destination1.estimatedLodgingCostPerDay);
    expect(trip1.getCost()).to.be.eql(cost1);
  });

  it('should be able to calulate the total cost of another trip with roundtrip flights', () => {
    let cost2 = ((randTrip2.travelers * 2) * destination2.estimatedFlightCostPerPerson) + (randTrip2.duration * destination2.estimatedLodgingCostPerDay);
    expect(trip2.getCost()).to.be.eql(cost2);
  })
})
