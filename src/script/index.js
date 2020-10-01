import '../pages/index.css';

import  {
  popupProfile,
  btnEdit,
  btnClose,
  nameInput,
  jobInput,
  popupNewPlace,
  btnAddPlace,
  btnClosePlace,
  formElementPlace,
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

const placePopup = new PopupWithForm(popupNewPlace,
  {handleFormSubmit: (formData) => {

    const newCard = new Card(formData, '.template', {
      handleCardClick: () => {

        imagePopup.open(newCard);
      }
    });

    cardsContainer.prepend(newCard.generateCard());
    placePopup.close();
  }
});

btnEdit.addEventListener('click', function () {

  userForm.enableValidation();
  userPopup.setEventListeners();
  userPopup.open();
  userInfo.getUserInfo();

});

btnClose.addEventListener('click', function () {
  userPopup.close();
});


closeImage.addEventListener('click', function(evt) {
  evt.preventDefault();

  imagePopup.close();

});


//Окно "Новое место"
btnAddPlace.addEventListener('click', function () {

  placeForm.enableValidation();
  placePopup.open();

  popupButton.classList.add('popup__button_disabled');
  popupButton.disabled = true;
  formElementPlace.reset();

});

btnClosePlace.addEventListener('click',function () {
  placePopup.close();
});



