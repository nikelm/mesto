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


const cardsContainer = document.querySelector('.elements'); //Куда копируем
let imageSource = document.querySelector('.popup-place__image');
let imageName = document.querySelector('.popup-place__title');
const openPlace = document.querySelector('.popup-place');

// Добавляем карточки на страницу
const addCards = (card) => {

  const cardsTemplate = document.querySelector('.template').content.cloneNode(true); //Что копируем

  cardsTemplate.querySelector('.cards__item-subtitle').textContent = card.name; //
  cardsTemplate.querySelector('.cards__image').src = card.link;

  let source = (cardsTemplate.querySelector('.cards__image'));
  let namePlace = cardsTemplate.querySelector('.cards__item-subtitle');

  const like = cardsTemplate.querySelector('.cards__like');
  const btnlike = cardsTemplate.querySelector('.cards__item-button');
  const btnDelete = cardsTemplate.querySelector('.cards__delete-icon');

  btnDelete.addEventListener('click', function(evt) {
    evt.preventDefault();

    const delCard = evt.target.closest('.cards');
    delCard.remove();
  });

  btnlike.addEventListener('click', function(evt) {
  evt.preventDefault();

  like.classList.toggle('cards__like_active');

  });

  //Показать изображение

  const placeImage = cardsTemplate.querySelector('.cards__button');


  placeImage.addEventListener('click', function(evt) {
    evt.preventDefault();

      function openPopupPlace() {
        imageSource.src = source.src;
        imageName.textContent = namePlace.textContent;
        //openPlace.classList.toggle('popup-place_closed');

        openPlace.classList.add('popup-place_opened');

      }
      openPopupPlace();

  });

  const closeImage = document.querySelector('.popup-place__close');

  closeImage.addEventListener('click', function(evt) {
    evt.preventDefault();

    //openPlace.classList.remove('popup-place_opened');
    
    openPlace.classList.remove('popup-place_opened');

  });

  cardsContainer.append(cardsTemplate);

}

initialCards.forEach(addCards);

openPlace.classList.remove('popup-place_opened');

//Добавляем вручную карточки на страницу
const addCard = (card) => {

  const cardsTemplate = document.querySelector('.template').content.cloneNode(true);

  cardsTemplate.querySelector('.cards__item-subtitle').textContent = card.name;
  cardsTemplate.querySelector('.cards__image').src = card.link;

  let source = (cardsTemplate.querySelector('.cards__image'));
  let namePlace = cardsTemplate.querySelector('.cards__item-subtitle');

  //Кнопки лайков и удаления
  const like = cardsTemplate.querySelector('.cards__like');
  const btnlike = cardsTemplate.querySelector('.cards__item-button');
  const btnDelete = cardsTemplate.querySelector('.cards__delete-icon');

  btnDelete.addEventListener('click', function(evt) {
    evt.preventDefault();

  const delCard = evt.target.closest('.cards');
    delCard.remove();
  });

  btnlike.addEventListener('click', function(evt) {
    evt.preventDefault();

  like.classList.toggle('cards__like_active');

  });

   //Показать изображение
   const placeImage = cardsTemplate.querySelector('.cards__button');
   const openPlace = document.querySelector('.popup-place');

   placeImage.addEventListener('click', function(evt) {
     evt.preventDefault();

       function openPopupPlace() {
         imageSource.src = source.src;
         imageName.textContent = namePlace.textContent;
         openPlace.classList.add('popup-place_opened');

       }
       openPopupPlace();

   });

   const closeImage = document.querySelector('.popup-place__close');

   closeImage.addEventListener('click', function(evt) {
     evt.preventDefault();

     openPlace.classList.remove('popup-place_opened');
   });

  cardsContainer.prepend(cardsTemplate);
}

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

//Окно "Новое место"
function openAddPlace() {
  addPlace.classList.add('addplace_opened');
  formElementPlace.reset();
}

btnAddPlace.addEventListener('click', openAddPlace);

function closeAddPlace() {

  addPlace.classList.remove('addplace_opened');
}

btnClosePlace.addEventListener('click', closeAddPlace);


function formPlaceSubmitHandler (evt) {
  evt.preventDefault();

  let newCard =[];

  newCard.unshift({name: `${nameInputPlace.value}`, link: `${linkInputPlace.value}`});

  newCard.forEach(addCard);

  closeAddPlace();
  newCard.length = 0;
}

formElementPlace.addEventListener('submit', formPlaceSubmitHandler);










