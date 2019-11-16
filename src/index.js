import $ from "jquery"
import sayHello from './hello';
sayHello('World');
import {getMovies, postMovie} from './api.js';
// END OF IMPORTS







$(document).ready(function () {
// FOR SELECT FORM
  //!GET

const showMovies = () => {
  getMovies().then((movies) => {
    $("#before-loading").css('display', 'none');
    $("#after-loading").css('display', 'inline');
    let cardContainer = $('#card-container')
  
    cardContainer.html('')
    console.log('Here are all the movies:');
    
    movies.forEach(({title, rating, id}) => {

      let html =
          `<div class="card bg-warning">
            <div class="card-title">${title}</div>
            <div class="card-text">Rating: ${rating}</div>
</div>`
      cardContainer.append(html)
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}
  
  //!POST
  let submitButton = $('#submit')
  const addMovie = () => {
    let id = 2
    let selectValue = $('#select').val()
    let inputValue = $('#input').val()
    postMovie({
      "id": id++,
      "title": inputValue,
      "rating": selectValue,
    })
        .then(showMovies)
        .catch(e => console.log(`Post Error`))
  }


  submitButton.click(function (e) {
    e.preventDefault()
    addMovie()
  })
  showMovies()
});



