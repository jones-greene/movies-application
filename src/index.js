import $ from "jquery"
import sayHello from './hello';
sayHello('World');
import {getMovies, postMovie, updateMovie, deleteMovie} from './api.js';
import {getSearch} from "./db"

// END OF IMPORTS







$(document).ready(function () {
//   $('#modal2').on('shown.bs.modal', function () {
//     $('#modal2').trigger('focus')
//   })
// FOR SELECT FORM
  let length
  let editBucket = []
  let searchList = []
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
  //! INITIAL DISPLAY OF MOVIES
  showMovies()
  
  //! DATA BASE STUFF
   let dbButton = $('#dbSubmit')
  dbButton.click(function () {
    let term = $('#dbInput').val()
    getSearch(term)
        .then((movies)=> {
          let idBucket = []
          movies[0].known_for.forEach((m,i)=> {
            idBucket.push(m.id)
            searchList.push(m)
            let wrapper = $('#db-card-wrapper')
            let html =
                `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${m.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${m.release_date}</h6>
    <p class="card-text">${m.overview}</p>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal2" id="db-${m.id}">
  Add To Favorites
</button>
  </div>
</div>`
            wrapper.append(html)
          })
          addAddEvent(idBucket)
        })
        .catch(()=> console.log(`DB GET ERROR`))
  })


  const addAddEvent = arr => {
    arr.forEach((a,i)=> {
      $(`#db-${a}`).click(function () {
        searchList.forEach((s,i)=> {
          if(Number(s.id) === Number(a)){
            $('#db-input').val(s.title)
          }
        })
      })
    })
  }
  
  $('#db-add').click(function () {
    console.log("title: ", $('#db-input').val())
    console.log("rating: ", $('#db-select').val())
    console.log("length", length)
    let movie = {
      title: $('#db-input').val(),
      rating: $('#db-select').val()
    }
    postMovie(movie, length)
        .then(()=> showMovies())
        .catch(()=> console.log(`DB POST ERROR`))
  })
  
  
});



