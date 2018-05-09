const api = {
  getRoutes: () => {
    return fetch('http://172.31.205.165:8080/api/facets', {
      method: 'GET', // or 'PUT'
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => console.log('Error:', error))
  }
};

export default api;