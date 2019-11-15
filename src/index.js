import $ from "jquery"


import 'materialize-css/dist/css/materialize.min.css'

import M from 'materialize-css/dist/js/materialize.min.js'

// IMPORTS

import sayHello from './hello';
sayHello('World');

import {getMovies} from './api.js';

// END OF IMPORTS







$(document).ready(function () {


// FOR SELECT FORM




  getMovies().then((movies) => {
    $("#before-loading").css('display', 'none');
    $("#after-loading").css('display','inline');

    console.log('Here are all the movies:');

    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);

    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });




});



