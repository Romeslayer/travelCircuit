import chai from 'chai';
import tripsTestData from '../src/data/trips-test-data.js';
import Trip from '../src/js/Trip.js';
import destinationsTestData from '../src/data/destinations-test-data.js';
import Destination from '../src/js/Destination.js';
const expect = chai.expect;

describe('Trip', () => {
  let destinations;
  let trip1, trip2;
  let randTrip1, randTrip2;

  beforeEach(() => {
    destinations = destinationsTestData.map(destination => new Destination(destination));
    randTrip1 = tripsTestData[Math.floor(Math.random() * (tripsTestData.length - 1))];
    randTrip2 = tripsTestData[Math.floor(Math.random() * (tripsTestData.length - 1))];
  });

  
})
