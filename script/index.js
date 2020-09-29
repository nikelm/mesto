import  {
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
  userFormData
}  from './consts.js'

import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js';
import { Popup, PopupWithImage, PopupWithForm } from './Popup.js';
import { UserInfo } from './UserInfo.js';


const placeForm = new FormValidator(userFormData, popupNewPlace);
const userForm = new FormValidator(userFormData, popupProfile);
const userPopup = new Popup(popupProfile);
const userInfo = new UserInfo({nameInput, jobInput});


const imagePopup = new PopupWithImage(popupPlace);


const placePopup = new PopupWithForm(popupNewPlace,
  {handleFormSubmit: () => {
    const newCard = new Card({name: `${nameInputPlace.value}`, link: `${linkInputPlace.value}`}, '.template', {
      handleCardClick: () => {

        imagePopup.open(newCard);
      }
    });

    cardsContainer.prepend(newCard.generateCard());
    placePopup.close();
  }
});


const cardsList = new Section({items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.template', {
        handleCardClick: ()=> {

          imagePopup.open(card);
        }
      });

      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    },
  }, cardsContainer);





cardsList.renderItems();





/*
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
function openPopup(popup) {
  popup.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', keyHandler);
  popup.classList.add('popup_opened');
}
*/
btnEdit.addEventListener('click', function () {

  userForm.enableValidation();
  //openPopup(popupProfile);
  userPopup.setEventListeners();
  userPopup.open();
  userInfo.getUserInfo();

  //nameInput.value = profileName.textContent;
  //jobInput.value = profileDescription.textContent;
});

/*
function closePopup(popup){
  document.removeEventListener('keydown', keyHandler);
  popup.removeEventListener('click', closeByOverlayClick);
  popup.classList.remove('popup_opened');
}
*/
btnClose.addEventListener('click', function () {
  userPopup.close();
});


closeImage.addEventListener('click', function(evt) {
  evt.preventDefault();

  imagePopup.close();

});

/*
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
}
formElement.addEventListener('submit', formSubmitHandler);
*/



//Окно "Новое место"
btnAddPlace.addEventListener('click', function () {

  placeForm.enableValidation();
  //openPopup(popupNewPlace);
  placePopup.open();

  popupButton.classList.add('popup__button_disabled');
  popupButton.disabled = true;
  formElementPlace.reset();

});


btnClosePlace.addEventListener('click',function () {

  //closePopup(popupNewPlace);
  placePopup.close();
});

/*
function formPlaceSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = new Card({name: `${nameInputPlace.value}`, link: `${linkInputPlace.value}`}, '.template', openPopup, popupPlace);
  cardsContainer.prepend(newCard.generateCard());
  closePopup(popupNewPlace);
}
*/

//formElementPlace.addEventListener('submit', formPlaceSubmitHandler);

/*
initialCards.forEach((item) => {
  const createCard = (item) => {
    return new Card(item, '.template', openPopup, popupPlace);
  }
  const cardElement = createCard(item).generateCard();
  cardsContainer.append(cardElement);
});
*/
