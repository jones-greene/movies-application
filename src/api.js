import $ from 'jquery'

module.exports = {
  getMovies: () => {
    $("#before-loading").css('display', 'inline');
    $("#after-loading").css('display', 'none');    return fetch('/api/movies')
      .then(response => response.json())
    .catch(e => console.log("get error"))

  },
  //!POST
  postMovie: (movieObj) => {
    return fetch('api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieObj)
    })
  }
  
  
  
  
};

