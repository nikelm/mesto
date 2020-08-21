const popupProfile = document.querySelector('.popup');
const btnEdit = document.querySelector('.profile__link');
const btnClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__paragraph');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const addPlace = document.querySelector('.addplace');
const btnAddPlace = document.querySelector('.profile__add');
const btnClosePlace = document.querySelector('.addplace__close');
const formElementPlace = document.querySelector('.addplace__container');
const nameInputPlace = document.querySelector('.addplace__input_type_name');
const linkInputPlace = document.querySelector('.addplace__input_type_link');

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

  cardsTemplate.querySelector('.cards__item-subtitle').textContent = card.name;
  cardsTemplate.querySelector('.cards__image').src = card.link;

  const source = cardsTemplate.querySelector('.cards__image');
  const namePlace = cardsTemplate.querySelector('.cards__item-subtitle');

  const like = cardsTemplate.querySelector('.cards__like');
  const btnlike = cardsTemplate.querySelector('.cards__item-button');
  const btnDelete = cardsTemplate.querySelector('.cards__delete-icon');
  const placeImage = cardsTemplate.querySelector('.cards__button');

 //Удалить карточку
  btnDelete.addEventListener('click', function(evt) {
    evt.preventDefault();

    const delCard = evt.target.closest('.cards');
    delCard.remove();
  });

  //Отметить карточку лайком
  btnlike.addEventListener('click', function(evt) {
    evt.preventDefault();

    like.classList.toggle('cards__like_active');

  });

  //Показать изображение
  placeImage.addEventListener('click', function(evt) {
    evt.preventDefault();

      imageSource.src = source.src;
      imageName.textContent = namePlace.textContent;

      openProfilePopup(openPlace);

  });


  closeImage.addEventListener('click', function(evt) {
    evt.preventDefault();

    closeProfilePopup(openPlace);

  });

  return cardsTemplate;
}

for (let i = 0; i < initialCards.length; i++) {

  cardsContainer.append(addCards(initialCards[i]));
}


function openProfilePopup(popup) {
  popup.classList.add('popup_opened'); //Не забыть правильно импортировать в index.css

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  formElementPlace.reset();

}

btnEdit.addEventListener('click', function () {
  openProfilePopup(popupProfile);
});


function closeProfilePopup(popup){
  popup.classList.remove('popup_opened');
}

// Еще вариант закрытия
//btnClose.addEventListener('click', () => closeProfilePopup(popupProfile));
btnClose.addEventListener('click', function () {
  closeProfilePopup(popupProfile);
});

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeProfilePopup(popupProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

//Окно "Новое место"
btnAddPlace.addEventListener('click', function () {
  openProfilePopup(addPlace);
});

//btnClosePlace.addEventListener('click', () => closeProfilePopup(addPlace));
btnClosePlace.addEventListener('click',function () {
  closeProfilePopup(addPlace);
});


function formPlaceSubmitHandler (evt) {
  evt.preventDefault();

  //Проблема не с реализацией решения, а с логикой его поиска... Одна функция возвращает карточку, другая рисует её на страницу. Блин, это же, так оказывается просто!

  cardsContainer.prepend(addCards({name: `${nameInputPlace.value}`, link: `${linkInputPlace.value}`}));

  closeProfilePopup(addPlace);

}

formElementPlace.addEventListener('submit', formPlaceSubmitHandler);










