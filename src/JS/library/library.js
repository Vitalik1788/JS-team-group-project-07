import API from './api-library';
import defaultImg from '../../images/default.jpg';

const libraryRef = document.querySelector('.library-card-list');

let library = [];
const btnLib = document.querySelector('.btn');

try {
  tcreateLIibraryMovieCard();
} catch (error) {
  console.log(error);
}



btnLib.addEventListener('click', function (event) {
  const id = event.currentTarget.dataset.id;
  console.log(btnLib);
  console.log(event);
console.log((btnLib.hasAttribute('data-add')));
  if (btnLib.hasAttribute('data-add')) {
    console.log('data-add');
    btnLib.removeAttribute('data-add');
    
  
    btnLib.setAttribute('data-remove', '');
  
    btnLib.textContent = 'Remove from my library';
    checkMoviCard(id);
  } else 
   if(btnLib.hasAttribute('data-remove')) {
    console.log('data-remove');
    btnLib.removeAttribute('data-remove');
  
    btnLib.setAttribute('data-add', '');
  
    btnLib.textContent = 'Add to my library';
    deleteCardLibrary(id);
  }

  
});


/////// ПРОВЕРКА НАЛИЧИЯ ID В LOCAL STORAGE /////////

export function checkMoviCard(id) {
  const libraryItem = localStorage.getItem('library');

  const libraryList = JSON.parse(libraryItem);

  if (libraryItem === null) {
    getMovi(id);

    console.log('cccccccccc');
  } else {
    const findMovi = libraryList.map(x => x.data);
    const findMoviId = findMovi.find(x => x.id === Number(id));

    if (findMoviId !== undefined) {
      return;
    } else {
      getMovi(id);
      console.log('eeeeeeeeee');
    }
  }
}

/////// ПОЛУЧЕНИЯ ОТ СЕРВЕРА ФИЛЬМА ПО ID ///////

async function getMovi(id) {
  const moviObj = await API.getMoviById(id);
  addCardLibrary(moviObj);
  console.log('gggggggggggg');
}

///// ФУНКЦИЯ ДОБАВЛЕНИЯ В LOCAL STORAGE ///////

function addCardLibrary(moviObj) {
  library.push(moviObj);
  console.log(library);
  localStorage.setItem('library', JSON.stringify(library));
  createLIibraryMovieCard();
}

///// ФУНКЦИЯ УДАЛЕНИЯ ИЗ LOCAL STORAGE ///////

export function deleteCardLibrary(id) {
  const libraryItem = localStorage.getItem('library');
  const libraryList = JSON.parse(libraryItem);
  const deletedItem = libraryList.find(x => x === id);
  library.pop(deletedItem);
  console.log(library.length);
  localStorage.setItem('library', JSON.stringify(library))
  location. reload();
}

function createLIibraryMovieCard() {
    library = JSON.parse(localStorage.getItem('library'))
    console.log(library);
  if (library.length === 0  || library === null ) {
    console.log('qqqqqqqqqqqqqq');
    libraryRef.innerHTML = `<div>
        <p style="color: white;"> OOPS... We are very sorry! You don’t have any movies at your library.</p>
        </div>`;
  } else {
    const markup = JSON.parse(localStorage.getItem('library'))
      .map(movie => {
        const imageSrc = movie.data.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.data.poster_path}`
          : `${defaultImg}`;

        return `<li class="card-item item">
              <img class="film-poster" src="${imageSrc}" alt="${
          movie.data.original_title
        }" />
              <div class="overlay">
                <div class="film-info">
                  <p class="film-title">${
                    movie.data.original_title || movie.name
                  }</p>
                  <div class="film-details">
                     <span class="film-description">${
                       new Date(movie.data.release_date).getFullYear() ||
                       new Date(movie.data.first_air_date).getFullYear()
                     } </span>
                    <span class="film-rating">${Math.round(
                      movie.data.vote_average
                    )}</span>
                  </div>
                </div>
              </div>
            </li>`;
      })
      .join('');

    libraryRef.innerHTML = markup;
  }
}








/////////////////////////////////////////////////////
// const btnLib = document.querySelector('.btn');
// btnLib.addEventListener('click', function (event) {
//   const id = event.currentTarget.dataset.id;
//   console.log(id);

//   // if (btnLib.getAttribute('data-click') === '1') {
//   //   btnLib.setAttribute('data-click', '2');
//   //   btnLib.textContent = 'Remove from my library';
//   //   checkMoviCard(id);
//   // } else {
//   //   btnLib.setAttribute('data-click', '1');
//   //   btnLib.textContent = 'Add to my library';
//   //   deleteCardLibrary(id);
//   // }
// });







/////////////////////////////////////////
// async function getMovi(id) {
//   const moviObj = await API.getMoviById(id);
//   console.log(moviObj);
//   checkMoviCard(id , moviObj);
// }

// function checkMoviCard(id , moviObj) {
//   const libraryItem = localStorage.getItem('library');

//   const libraryList = JSON.parse(libraryItem);

//   if (libraryItem === null) {
//     addCardLibrary(moviObj);
//     console.log(moviObj);
//     console.log('qweqweqeqeqdqxx');

//   } else {

//     const findMovi = libraryList.map(x => x.data);
//     const findMoviId = findMovi.find(x => x.id === Number(id));

//     if (findMoviId !== undefined) {
//       return;

//     } else {

//       addCardLibrary(moviObj);
//       console.log('qweqweqeqeqdqxx');
//     }
//   }
// }

// function addCardLibrary(moviObj) {
//   library.push(moviObj);
//   console.log(library);
//   localStorage.setItem('library', JSON.stringify(library));
// }

//   function deleteCardLibrary(moviObj) {
//     const qwe = localStorage.getItem('library')
//     console.log( JSON.parse(qwe))
//     library.pop(moviObj)
//     console.log(library)
//     localStorage.setItem('library' , JSON.stringify(library))
//   }
