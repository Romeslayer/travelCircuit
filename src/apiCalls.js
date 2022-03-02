const getData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
     .then(response => response.json())
     .then(data => data[url])
     .catch(e => console.log(e));
}

export {
  getData
}
