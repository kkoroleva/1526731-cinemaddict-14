import dayjs from 'dayjs';

const EXAMPLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const getRandomInteger = (max = 1, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (max, min = 0) => {
  return Math.random() * (max - min) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(array.length - 1)];
};

const getRandomArray = (array) => {
  const result = [];
  array.forEach((el) => {
    if (getRandomInteger()) {
      result.push(el);
    }
  });
  return result;
};

const getFilmName = () => {
  const filmNames = ['My Beautiful Lady', 'Lord of the Rings', 'Forrest Gump', 'Harry Potter', 'Interstellar'];
  const filmNamesMap = {
    'My Beautiful Lady': 'My Extremely Beautiful Lady',
    'Lord of the Rings': 'Lord of the Rings: Brotherhood',
    'Forrest Gump': 'Run, Boy, Run',
    'Harry Potter': 'HP and the Philosopher Stone',
    'Interstellar': 'Interstellar: the Fourth Dimension Exists'};
  const name = getRandomArrayElement(filmNames);
  return {'name': name, 'originalName': filmNamesMap[name]};
};

const getFilmPoster = () => {
  const filmPosters = ['images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-great-flamarion.jpg',
  ];
  return getRandomArrayElement(filmPosters);
};

const getFilmDescription = () => {
  const sentenceCounter = EXAMPLE.split('.').length - 2;
  const exampleArray = EXAMPLE.split('.', sentenceCounter);
  return exampleArray.slice(getRandomInteger(sentenceCounter)).join('.');
};

const getFilmRating = () => {
  const maxRating = 10;
  const roundCoef = 2;
  return getRandomFloat(maxRating).toFixed(roundCoef);
};

const getFilmDuration = () => {
  return `${getRandomInteger(3)}h ${getRandomInteger(60, 1)}min`;
};

const getFilmRelease = () => {
  return dayjs().year(getRandomInteger(2021, 2010))
    .month(getRandomInteger(11))
    .date(getRandomInteger(11))
    .hour(getRandomInteger(24))
    .minute(getRandomInteger(60));
};

const getFilmGenre = () => {
  const genres = ['comedy', 'action', 'drama', 'sci-fi', 'mystery'];
  return getRandomArray(genres);
};

const getAge = () => {
  const ageRestriction = ['0+', '6+', '12+', '18+'];
  return getRandomArrayElement(ageRestriction);
};

const getDirector = () => {
  const directors = ['Anthony Mann', 'David Fincher', 'Peter Jackson', 'Gay Richey', 'Kventin Tarantino'];
  return getRandomArrayElement(directors);
};

const getActors = () => {
  const actors = ['Brad Pit', 'Penelope Cruz', 'Anthony Li', 'Jessica Jones', 'Peter Parker'];
  return getRandomArray(actors);
};

const getScriptwriters = () => {
  const scriptwriters = ['Ironman', 'Batman', 'Spiderman', 'Deadpool', 'Tor'];
  return getRandomArray(scriptwriters);
};

const getCountry = () => {
  const countries = ['Spain', 'UA', 'USA', 'Russia', 'Australia'];
  return getRandomArrayElement(countries);
};

const getEmoji = () => {
  const emojis = ['images/emoji/angry.png',
    'images/emoji/puke.png',
    'images/emoji/sleeping.png',
    'images/emoji/smile.png'];
  return getRandomArrayElement(emojis);
};

const getComment = () => {
  const date = dayjs().year(getRandomInteger(2021, 2010))
    .month(getRandomInteger(11))
    .date(getRandomInteger(11))
    .hour(getRandomInteger(24))
    .minute(getRandomInteger(60));
  return {
    'emoji': getEmoji(),
    'date': date,
    'author': EXAMPLE.slice(0, getRandomInteger(8)),
    'text': EXAMPLE.slice(0, getRandomInteger(139)),
  };
};

const getComments = (count) => {
  return new Array(count).fill().map(getComment);
};

const getFilm = () => {
  return {
    'names': getFilmName(),
    'country': getCountry(),
    'director': getDirector(),
    'actors': getActors(),
    'scriptwriters': getScriptwriters(),
    'poster': getFilmPoster(),
    'description': getFilmDescription(),
    'rating': getFilmRating(),
    'release': getFilmRelease(),
    'duration': getFilmDuration(),
    'genre': getFilmGenre(),
    'age': getAge(),
    'comments': getComments(getRandomInteger(5)),
    'isWatched': Boolean(getRandomInteger()),
    'isFavourite': Boolean(getRandomInteger()),
    'isInWatchlist': Boolean(getRandomInteger()),
  };
};

export {getFilm};
