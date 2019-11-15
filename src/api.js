module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
    .catch(e => console.log("get error"))

  }
};

