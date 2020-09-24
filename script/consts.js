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
const imageSource = document.querySelector('.popup-place__image');

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

const userFormData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputName: 'fullname',
  inputJob: 'job',
  formSelector : 'popup__form'
}

export {
  popupProfile,
  btnEdit,
  btnClose,
  profileName,
  profileDescription,
  formElement,
  nameInput,
  jobInput,
  popupNewPlace,
  btnAddPlace,
  btnClosePlace,
  formElementPlace,
  nameInputPlace,
  linkInputPlace,
  popupButton,
  cardsContainer,
  popupPlace,
  closeImage,
  initialCards,
  userFormData,
  imageSource
}
