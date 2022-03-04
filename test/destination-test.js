import chai from 'chai';
import destinationsTestData from '../src/data/destinations-test-data.js';
import Destination from '../src/js/Destination.js';
const expect = chai.expect;

describe('Destination', () => {
  let location1;
  let location2;
  let randomLocation1;
  let randomLocation2;

  beforeEach(() => {
    randomLocation1 = destinationsTestData[Math.floor(Math.random() * (destinationsTestData.length - 1))];
    randomLocation2 = destinationsTestData[Math.floor(Math.random() * (destinationsTestData.length - 1))];
    location1 = new Destination(randomLocation1);
    location2 = new Destination(randomLocation2);
  })

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', () => {
    expect(location1).to.be.an.instanceof(Destination);
  });

  it('should store given information, keep same properties', () => {
    expect(location1.id).to.be.eql(randomLocation1.id);
    expect(location1.destination).to.be.eql(randomLocation1.destination);
    expect(location1.estimatedLodgingCostPerDay).to.be.eql(randomLocation1.estimatedLodgingCostPerDay);
    expect(location1.estimatedFlightCostPerPerson).to.be.eql(randomLocation1.estimatedFlightCostPerPerson);
    expect(location1.image).to.be.eql(randomLocation1.image);
  });

  it('should be able to store different information', () => {
    expect(location2.id).to.be.eql(randomLocation2.id);
    expect(location2.destination).to.be.eql(randomLocation2.destination);
    expect(location2.estimatedLodgingCostPerDay).to.be.eql(randomLocation2.estimatedLodgingCostPerDay);
    expect(location2.estimatedFlightCostPerPerson).to.be.eql(randomLocation2.estimatedFlightCostPerPerson);
    expect(location2.image).to.be.eql(randomLocation2.image);
  });

  it('should be able to return its name', () => {
    expect(location1.getName()).to.be.eql(randomLocation1.destination);
    expect(location2.getName()).to.be.eql(randomLocation2.destination);
  })
});
