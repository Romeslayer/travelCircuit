import chai from 'chai';
const expect = chai.expect;
import tripsTestData from '../src/data/trips-test-data.js';
import destinationsTestData from '../src/data/destinations-test-data.js';
import travelersTestData from '../src/data/travelers-test-data.js';
import Trip from '../src/js/Trip.js';
import Destination from '../src/js/Destination.js';
import Traveler from '../src/js/Traveler.js';
import TravelRepo from '../src/js/TravelRepo.js';

describe('TravelRepo', () => {
  let destinations, trips;
  let traveler1, traveler2, testTraveler1, testTraveler2;
  let traveler1Trips, traveler2Trips;
  let travelRepo;

  beforeEach(() => {
    testTraveler1 = travelersTestData[0];
    testTraveler2 = travelersTestData[1];
    destinations = destinationsTestData.map(destination => new Destination(destination));
    trips = tripsTestData.map(trip => new Trip(trip, destinations.find(des => des.id === trip.destinationID)));
    traveler1Trips = trips.filter(trip => testTraveler1.id === trip.userID);
    traveler2Trips = trips.filter(trip => testTraveler2.id === trip.userID);
    traveler1 = new Traveler(testTraveler1, traveler1Trips);
    traveler2 = new Traveler(testTraveler2, traveler2Trips);
    travelRepo = new TravelRepo(travelersTestData, tripsTestData, destinationsTestData);
  });

  it('should be a function', () => {
    expect(TravelRepo).to.be.a('function');
  });

  it('should be able to create an instance of TravelRepo', () => {
    expect(travelRepo).to.be.an.instanceof(TravelRepo);
  });

  it('should be able to hold travelers, trips, and destinations', () => {
    expect(travelRepo.travelers).to.be.a('array');
    expect(travelRepo.destinations).to.be.a('array');
    expect(travelRepo.trips).to.be.a('array');
  });

  it('should create new instances of correct Destination', () => {
    expect(travelRepo.destinations).to.be.eql(destinations);
  });

  it('should be able to return Destination from given id' , () => {
    expect(travelRepo.getDestination(4)).to.be.eql(destinations[0]);
  });

  it('should return Destination not found for an invaild id', () => {
    expect(travelRepo.getDestination(1)).to.be.eql('Sorry that Destination id is invalid.');
  });
  it('should create Trip instances from given data', () => {
    expect(travelRepo.trips).to.be.eql(trips);
  });

  it('should be able to return Trips for a single user, given their id', () => {
    expect(travelRepo.getTrips(1)).to.be.eql(traveler1Trips);
    expect(travelRepo.getTrips(2)).to.be.eql(traveler2Trips);
  });

  it('should return Trips not found for an invaild id', () => {
    expect(travelRepo.getTrips(3)).to.be.eql('Sorry there are no Trips for this user id.');
  });

  it('should create Traveler instances based from given data', () => {
    expect(travelRepo.travelers[0]).to.eql(traveler1);
    expect(travelRepo.travelers[1]).to.eql(traveler2);
  });

  it('should be able to return the correct Traveler', () => {
    expect(travelRepo.getTraveler(1)).to.be.eql(traveler1);
    expect(travelRepo.getTraveler(2)).to.be.eql(traveler2);
  });

  it('should return Traveler not found for invalid id', () => {
    expect(travelRepo.getTraveler(3)).to.be.eql('Sorry there is no user with that id.');
  })
})
