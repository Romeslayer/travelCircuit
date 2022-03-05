import chai from 'chai';
const expect = chai.expect;
import tripsTestData from '../src/data/trips-test-data.js';
import destinationsTestData from '../src/data/destinations-test-data.js';
import travelersTestData from '../src/data/travelers-test-data.js';
import Trip from '../src/js/Trip.js';
import Destination from '../src/js/Destination.js';
import Traveler from '../src/js/Traveler.js';


describe('Traveler', () => {
  let destinations, trips;
  let traveler1, traveler2, testTraveler1, testTraveler2;
  let traveler1Trips, traveler2Trips;

  beforeEach(() => {
    testTraveler1 = travelersTestData[0];
    testTraveler2 = travelersTestData[1];
    destinations = destinationsTestData.map(destination => new Destination(destination));
    trips = tripsTestData.map(trip => new Trip(trip, destinations.find(des => des.id === trip.destinationID)));
    traveler1Trips = trips.filter(trip => testTraveler1.id === trip.userID);
    traveler2Trips = trips.filter(trip => testTraveler2.id === trip.userID);
    traveler1 = new Traveler(testTraveler1, traveler1Trips);
    traveler2 = new Traveler(testTraveler2, traveler2Trips);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceof(Traveler);
  });

  it('should have information from given data', () => {
    expect(traveler1.id).to.be.eql(testTraveler1.id);
    expect(traveler1.name).to.be.eql(testTraveler1.name);
    expect(traveler1.travelerType).to.be.eql(testTraveler1.travelerType);
  });

  it('should have information from different data', () => {
    expect(traveler2.id).to.be.eql(testTraveler2.id);
    expect(traveler2.name).to.be.eql(testTraveler2.name);
    expect(traveler2.travelerType).to.be.eql(testTraveler2.travelerType);
  });

  it('should store approved trips', () => {
    expect(traveler1.trips.approved).to.be.eql(traveler1Trips);
    expect(traveler2.trips.approved).to.be.eql(traveler2Trips.filter(trip => trip.status === 'approved'));
  });

  it('should store pending trips', () => {
    expect(traveler1.trips.pending).to.be.eql([]);
    expect(traveler2.trips.pending).to.be.eql(traveler2Trips.filter(trip => trip.status === 'pending'));
  })

  it('should be able to calculate total price of approved trips with 10% travel agent fee', () => {
    expect(traveler1.getTotal()).to.be.eql(7095);
    expect(traveler2.getTotal()).to.be.eql(29660);
  });
});
