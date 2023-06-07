import API from './api-library';
import defaultImg from '../../images/default.jpg';

const libraryRef = document.querySelector('.library-card-list');


const btnLib = document.querySelector('.btn');

try {
  createLIibraryMovieCard();
} catch (error) {
  console.log(error);
}

if (btnLib) {
  btnLib.addEventListener('click', handleFilm);
}

export function handleFilm(event) {
  const id = event.currentTarget.dataset.id;
  console.log(btnLib);
  console.log(event);
  console.log(btnLib.hasAttribute('data-add'));
  if (btnLib.hasAttribute('data-add')) {
    console.log('data-add');
    btnLib.removeAttribute('data-add');

    btnLib.setAttribute('data-remove', '');

    btnLib.textContent = 'Remove from my library';
    checkMoviCard(id);
  } else if (btnLib.hasAttribute('data-remove')) {
    console.log('data-remove');
    btnLib.removeAttribute('data-remove');

    btnLib.setAttribute('data-add', '');

    btnLib.textContent = 'Add to my library';
    deleteCardLibrary(id);
  }
}

/////// ПРОВЕРКА НАЛИЧИЯ ID В LOCAL STORAGE /////////

export function checkMoviCard(id) {
  const libraryList = JSON.parse(localStorage.getItem('library'));

  if (libraryList === null) {
    getMovi(id);

    console.log('cccccccccc');
  } else {
    const findMoviId = libraryList.find(x => x.id === Number(id));

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
  const res = await API.getMoviById(id);
  const moviObj = res.data;
  addCardLibrary(moviObj);
  console.log('gggggggggggg');
}

///// ФУНКЦИЯ ДОБАВЛЕНИЯ В LOCAL STORAGE ///////

function addCardLibrary(moviObj) {
  let library = [];
  console.log(library);
  library.push(moviObj);
  console.log(library);
  localStorage.setItem('library', JSON.stringify(library));
  createLIibraryMovieCard();
}

///// ФУНКЦИЯ УДАЛЕНИЯ ИЗ LOCAL STORAGE ///////

export function deleteCardLibrary(id) {
  const libraryList = JSON.parse(localStorage.getItem('library'));
  const deletedItem = libraryList.find(x => x === id);
  library.pop(deletedItem);
  console.log(library.length);
  localStorage.setItem('library', JSON.stringify(library));
  createLIibraryMovieCard();
}

function createLIibraryMovieCard() {
  library = JSON.parse(localStorage.getItem('library'));
  console.log(library);
  if (library === null || library.length === 0  ) {
    console.log('qqqqqqqqqqqqqq');
    libraryRef.innerHTML = `<div class="library-info library-info-container">
        <p class="library-info-text" style="color: white;"> OOPS... <br> We are very sorry!<br>
        You don’t have any movies at your library.</p>
        </div>`;
  } else {
    const markup = JSON.parse(localStorage.getItem('library'))
      .map(movie => {
        const imageSrc = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : `${defaultImg}`;

        return `<li class="card-item item">
              <img class="film-poster" src="${imageSrc}" alt="${
          movie.original_title
        }" />
              <div class="overlay">
                <div class="film-info">
                  <p class="film-title">${
                    movie.original_title || movie.name
                  }</p>
                  <div class="film-details">
                     <span class="film-description">${
                       new Date(movie.release_date).getFullYear() ||
                       new Date(movie.first_air_date).getFullYear()
                     } </span>
                    <span class="film-rating">${Math.round(
                      movie.vote_average
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


// `<div class="library-info library-info-container">
//         <p class="library-info-text" style="color: white;"> OOPS... </p>
//         <p class="library-info-text" style="color: white;"> We are very sorry!</p>
//         <p class="library-info-text" style="color: white;"> You don’t have any movies at your library.</p>
//         </div>`;

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
