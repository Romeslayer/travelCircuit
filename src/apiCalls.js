const getData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
     .then(response => response.json())
     .then(data => data[url])
     .catch(e => message.innerText = `Your request has been denied! Error: ${e.message}`);
}

const postTrip = (trip) => {
  return fetch(`http://localhost:3001/api/v1/trips`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(trip)
  })
    .then(response => {
      if(!response.ok) throw new Error('Please fill out all fields.');
      message.innerText = `Your trip request has been accepted.`
      return response.json();
    })
    .catch(e => message.innerText = `Your trip request has been rejected: ${e.message}`);
}
export {
  getData,
  postTrip
}
