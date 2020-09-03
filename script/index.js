const popupProfile = document.querySelector('.popup_user');
const btnEdit = document.querySelector('.profile__link');
const btnClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__paragraph');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const addPlace = document.querySelector('.popup_new');
const btnAddPlace = document.querySelector('.profile__add');
const btnClosePlace = document.querySelector('.popup__close_new');
const formElementPlace = document.querySelector('.popup__form_new');
const nameInputPlace = document.querySelector('.popup__input-new_type_name');
const linkInputPlace = document.querySelector('.popup__input-new_type_link');
const popupButton = document.querySelector('.popup__button-save');
const page = document.querySelector('.body');


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


const cardsContainer = document.querySelector('.elements'); //Куда копируем
const imageSource = document.querySelector('.popup-place__image');
const imageName = document.querySelector('.popup-place__title');
const openPlace = document.querySelector('.popup-place');
const closeImage = document.querySelector('.popup-place__close');


// Добавляем карточки на страницу
const addCards = (card) => {

  const cardsTemplate = document.querySelector('.template').content.cloneNode(true); //Что копируем

  cardsTemplate.querySelector('.card__item-subtitle').textContent = card.name;
  cardsTemplate.querySelector('.card__image').src = card.link;

  const source = cardsTemplate.querySelector('.card__image');
  const namePlace = cardsTemplate.querySelector('.card__item-subtitle');

  const like = cardsTemplate.querySelector('.card__like');
  const btnlike = cardsTemplate.querySelector('.card__item-button');
  const btnDelete = cardsTemplate.querySelector('.card__delete-icon');
  const placeImage = cardsTemplate.querySelector('.card__button');

 //Удалить карточку
  btnDelete.addEventListener('click', function(evt) {
    evt.preventDefault();

    const delCard = evt.target.closest('.card');
    delCard.remove();
  });

  //Отметить карточку лайком
  btnlike.addEventListener('click', function(evt) {
    evt.preventDefault();

    like.classList.toggle('card__like_active');

  });

  //Показать изображение
  placeImage.addEventListener('click', function(evt) {
    evt.preventDefault();

      imageSource.src = source.src;
      imageName.textContent = namePlace.textContent;

      openPopup(openPlace);

  });

  return cardsTemplate;
}

closeImage.addEventListener('click', function(evt) {
  evt.preventDefault();

  closePopup(openPlace);

});

for (let i = 0; i < initialCards.length; i++) {

  cardsContainer.append(addCards(initialCards[i]));
}


function keyHandler (evt) {
  const popupOpen = document.querySelector('.popup_opened');

  if (evt.key === 'Escape') {
    closePopup(popupOpen);
  }
}


function openPopup(popup) {
  popup.addEventListener('click', popupClose);
  document.addEventListener('keydown', keyHandler);

  clearPopup(popup);

  popup.classList.add('popup_opened');

}

btnEdit.addEventListener('click', function () {

  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});


function closePopup(popup){
  document.removeEventListener('keydown', keyHandler);
  popup.removeEventListener('click', popupClose);

  popup.classList.remove('popup_opened');
  //clearPopup(popup);
}

// Еще вариант закрытия
//btnClose.addEventListener('click', () => closeProfilePopup(popupProfile));

btnClose.addEventListener('click', function () {
  closePopup(popupProfile);
});


function popupClose(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target !== evt.currentTarget) {
    return
  } else {
    closePopup(popupOpened);
  }
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

//Окно "Новое место"
btnAddPlace.addEventListener('click', function () {

  openPopup(addPlace);

  popupButton.classList.add('popup__button_disabled');
  popupButton.setAttribute('disabled', 'disabled');
  formElementPlace.reset();

});

//btnClosePlace.addEventListener('click', () => closeProfilePopup(addPlace));
btnClosePlace.addEventListener('click',function () {

  closePopup(addPlace);
});


function formPlaceSubmitHandler (evt) {
  evt.preventDefault();

  cardsContainer.prepend(addCards({name: `${nameInputPlace.value}`, link: `${linkInputPlace.value}`}));

  closePopup(addPlace);

}

formElementPlace.addEventListener('submit', formPlaceSubmitHandler);








