import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const popupProfile = document.querySelector('.popup_user');
const btnEdit = document.querySelector('.profile__link');
const btnClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__paragraph');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const popupNewPlace = document.querySelector('.popup_new');
const btnAddPlace = document.querySelector('.profile__add');
const btnClosePlace = document.querySelector('.popup__close_new');
const formElementPlace = document.querySelector('.popup__form_new');
const nameInputPlace = document.querySelector('.popup__input-new_type_name');
const linkInputPlace = document.querySelector('.popup__input-new_type_link');
const popupButton = document.querySelector('.popup__button-save');
const cardsContainer = document.querySelector('.elements');

const popupPlace = document.querySelector('.popup-place');
const closeImage = document.querySelector('.popup-place__close');

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


function keyHandler (evt) {
  const popupOpen = document.querySelector('.popup_opened');

  if (evt.key === 'Escape') {
    closePopup(popupOpen);
  }
}

function closeByOverlayClick(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target !== evt.currentTarget) {
    return
  } else {
    closePopup(popupOpened);
  }
}

const userForm = new FormValidator(
  { inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inputName: 'fullname',
    inputJob: 'job'
  }, '.popup__form', popupProfile);

function openPopup(popup) {
  popup.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', keyHandler);

  popup.classList.add('popup_opened');
}

btnEdit.addEventListener('click', function () {

  userForm.enableValidation();
  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});


function closePopup(popup){
  document.removeEventListener('keydown', keyHandler);
  popup.removeEventListener('click', closeByOverlayClick);

  popup.classList.remove('popup_opened');
}


btnClose.addEventListener('click', function () {
  closePopup(popupProfile);
});


closeImage.addEventListener('click', function(evt) {
  evt.preventDefault();

  closePopup(popupPlace);

});


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupProfile);
}

formElement.addEventListener('submit', formSubmitHandler);


const placeForm = new FormValidator(
  { inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inputName: 'fullname',
    inputJob: 'job'
  }, '.popup__form', popupNewPlace);


//Окно "Новое место"
btnAddPlace.addEventListener('click', function () {

  placeForm.enableValidation();
  openPopup(popupNewPlace);

  popupButton.classList.add('popup__button_disabled');
  popupButton.disabled = true;
  formElementPlace.reset();

});


btnClosePlace.addEventListener('click',function () {

  closePopup(popupNewPlace);
});


function formPlaceSubmitHandler (evt) {
  evt.preventDefault();

  const newCard = new Card({name: `${nameInputPlace.value}`, link: `${linkInputPlace.value}`}, '.template', openPopup, popupPlace);

  cardsContainer.prepend(newCard.generateCard());

  closePopup(popupNewPlace);

}


formElementPlace.addEventListener('submit', formPlaceSubmitHandler);


initialCards.forEach((item) => {

  const card = new Card(item, '.template', openPopup, popupPlace);
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
});









