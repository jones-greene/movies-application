import $ from 'jquery'


 export const getMovies = () => {
    $("#before-loading").css('display', 'inline');
    $("#after-loading").css('display', 'none');    return fetch('/api/movies')
      .then(response => response.json())
    .catch(e => console.log("get error"))

  }
  //!POST
    export const postMovie = (movieObj, num) => {
  const {title , rating} = movieObj
    if(!title || !rating) return alert('Title and Rating are required!')
      let newMovie = {
        id: ++num,
        title,
        rating
      }
    
    return fetch('api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovie)
    })
  }
  
  
  //!PUT - UPDATE
export const updateMovie = (obj) => {
  const {id, title, rating} = obj
  if(!title || !rating) alert(`Title and Rating are required`)
  const options = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }
  return fetch(`api/movies/${id}`, options)
}
  
  
  
export const deleteMovie = (id) => {
  return fetch(`api/movies/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  })
};


