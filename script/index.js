let popup = document.querySelector('.popup');
let btnEdit = document.querySelector('.profile__link');
let btnClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__paragraph');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

let addPlace = document.querySelector('.addplace');
let btnAddPlace = document.querySelector('.profile__add');
let btnClosePlace = document.querySelector('.addplace__close');
let formElementPlace = document.querySelector('.addplace__container');
let nameInputPlace = document.querySelector('.addplace__input_type_name');
let linkInputPlace = document.querySelector('.addplace__input_type_link');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardsContainer = document.querySelector('.elements');

const addCards = (card) => {

  const cardsTemplate = document.querySelector('.template').content.cloneNode(true);

  cardsTemplate.querySelector('.cards__item-subtitle').textContent = card.name;
  cardsTemplate.querySelector('.cards__image').src = card.link;

  const like = cardsTemplate.querySelector('.cards__like');
  const btnlike = cardsTemplate.querySelector('.cards__item-button');

  btnlike.addEventListener('click', function(evt) {
  evt.preventDefault();

  like.classList.toggle('cards__like_active');

  });

  cardsContainer.append(cardsTemplate);

}

initialCards.forEach(addCards);

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

btnEdit.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

btnClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

function openAddPlace() {
  addPlace.classList.add('addplace_opened');
  formElementPlace.reset();
}

btnAddPlace.addEventListener('click', openAddPlace);

function closeAddPlace() {
  addPlace.classList.remove('addplace_opened');
}

btnClosePlace.addEventListener('click', closeAddPlace);

function deleteCards () {
  const oldCards = document.querySelector('.cards');
  oldCards.remove();
}

function formPlaceSubmitHandler (evt) {
  evt.preventDefault();

  for (let index = 0; index < initialCards.length; index++) {
    deleteCards ();
  }

  initialCards.unshift({name: `${nameInputPlace.value}`, link: `${linkInputPlace.value}`});

  initialCards.forEach(addCards);

  closeAddPlace();
}

formElementPlace.addEventListener('submit', formPlaceSubmitHandler);


/*const btnlike = document.querySelector('.cards__item-button');
const like = document.querySelector('.cards__like');

btnlike.addEventListener('click', function(evt) {
  evt.preventDefault();

    like.classList.toggle('cards__like_active');

});*/





