import $ from "jquery"
import sayHello from './hello';
sayHello('World');
import {getMovies, postMovie, updateMovie, deleteMovie} from './api.js';
// END OF IMPORTS







$(document).ready(function () {
// FOR SELECT FORM
  let length
  let editBucket = []
  //!GET

const showMovies = () => {
  getMovies().then((movies) => {
    length = movies.length+1
    $("#before-loading").css('display', 'none');
    $("#after-loading").css('display', 'inline');
    let cardContainer = $('#card-container')
  
    cardContainer.html('')
    console.log('Here are all the movies:');
    
    movies.forEach(({title, rating, id}) => {
      editBucket.push(id)
      let html =

          `<div class="d-inline-flex p-2">
            <div class="card " id="listmovie">
            <div class="card-title" id="cardtitlejs"><strong>${title}</strong></div>
            <div class="card-text">Rating: ${rating}</div>
            <button class="btn edit" id="${id}"
            data-toggle="modal" data-target="#myModal">Edit</button>
            <button class="btn delete" id="delete-${id}">Delete</button>
            </div>
            </div>`
      
      cardContainer.append(html)
    });
    //! create click handler
    createEditHandler(movies)
    createDeleteHandler(movies)
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}
  

//! POST MOVIE

  
  let submitButton = $('#submit')
  submitButton.click(function (e) {
    e.preventDefault()
    addMovie()
  })
  const addMovie = () => {
    let selectValue = $('#select').val()
    let inputValue = $('#input').val()
    postMovie({
      "title": inputValue,
      "rating": selectValue,
    }, length)
        .then(()=> showMovies())
        .catch(e => console.log(`Post Error`))
  }
  
  //! EDIT MOVIE
  const createEditHandler = (arr) => {
    editBucket.forEach(button => {
      $(`#${button}`).click(function (e) {
        arr.forEach(movie => {
          if(movie.id === button){
            $('#editTitle').val(movie.title)
            $('#editSubmit').data('value', movie.id)
          }
        })
      })
    })
  }
  
  $('#editSubmit').click(function (e) {
    e.preventDefault()
    let updatedMovie = {
      id: $('#editSubmit').data('value'),
      title: $('#editTitle').val(),
      rating: $('#editSelect').val()
    }
    updateMovie(updatedMovie)
        .then(()=> showMovies())
        .catch(()=> console.log(`EDIT ERROR`))
    
  })

  const createDeleteHandler = (arr) => {
    editBucket.forEach(id =>{
      $(`#delete-${id}`).click(function (e) {
        deleteMovie(id)
            .then(()=> showMovies())
            .catch(() => console.log("Delete Error"))
      })
    })



  }




// "#" + button
//   `#${button}`
  //! INITIAL DISPLAY OF MOVIES
  showMovies()
});



