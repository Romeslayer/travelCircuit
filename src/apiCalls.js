const getData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
     .then(response => response.json())
     .catch(e => console.log(e));
}

const travelersData = getData('travelers');
const tripsData = getData('trips');
const destinationsData = getData('destinations');


export {
  getData,
  travelersData,
  tripsData,
  destinationsData
}
