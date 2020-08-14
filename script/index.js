let popup = document.querySelector('.popup');
let btnEdit = document.querySelector('.profile__link');
let btnClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__paragraph');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

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

const addCard = (cardName, cardLink) => {

  for (let i = 0; i < initialCards.length; i++) {
    cardName = initialCards[i].name;
    cardLink= initialCards[i].link;

    const cardsTemplate = document.querySelector('.template').content.cloneNode(true);

    cardsTemplate.querySelector('.cards__item-subtitle').textContent = cardName;
    cardsTemplate.querySelector('.cards__image').src = cardLink;

    cardsContainer.append(cardsTemplate);
  }

}

initialCards.forEach(addCard);

/*
for (let i = 0; i < initialCards.length; i++) {
console.log(initialCards[i].name);
}*/

/*
function cards() {
  const cardsTemplate = document.querySelector('.template').content;
  const card = document.querySelector('.elements');
  let cardsItem = cardsTemplate.cloneNode(true);

  return card.append(cardsItem);

}

for (let i = 0; i < initialCards.length; i++) {
  card();
}

let image = document.querySelectorAll('.cards__image');
let subtitle = document.querySelectorAll('.cards__item-subtitle');


for (let i = 0; i < subtitle.length; i++) {
  initialCards.forEach(function (item) {
    subtitle[i].textContent = item.name;
    image[i].src = item.link;
  });
  console.log(subtitle.textContent);
}
/*
initialCards.forEach(function (item) {

  console.log(cardsText);
});*/


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





