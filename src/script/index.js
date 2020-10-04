import '../pages/index.css';

import  {
  popupProfile,
  btnEdit,
  btnClose,
  popupNewPlace,
  btnAddPlace,
  btnClosePlace,
  formElementPlace,
  popupButton,
  cardsContainer,
  popupPlace,
  closeImage,
  initialCards,
  userFormData,
  userData
}  from './consts.js'

import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js';
import { PopupWithForm } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';

const placeForm = new FormValidator(userFormData, popupNewPlace);
const userForm = new FormValidator(userFormData, popupProfile);

const imagePopup = new PopupWithImage(popupPlace);

const userPopup = new PopupWithForm(popupProfile, {

  handleFormSubmit: (formData) => {
    const userInfo = new UserInfo(formData);
    userInfo.setUserInfo();
    userPopup.close();
  }
});

userPopup.setEventListeners();

userForm.enableValidation();
placeForm.enableValidation();


function createCard(item) {
  const card = new Card(item, '.template', {
    handleCardClick: () => {

      imagePopup.open(card);
    }
  });
  return card.generateCard();
}

const placePopup = new PopupWithForm(popupNewPlace,
  {handleFormSubmit: (formData) => {

    cardsContainer.prepend(createCard(formData));
    placePopup.close();
  }
});

placePopup.setEventListeners();


const cardsList = new Section({items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);

    cardsList.addItem(cardElement);
  },
}, cardsContainer);

cardsList.renderItems();

btnEdit.addEventListener('click', function () {
  userForm.clearPopup();
  userPopup.open();

  const userInfo = new UserInfo(userData);
  userInfo.getUserInfo();

});

btnClose.addEventListener('click', function () {
  userPopup.close();
});


closeImage.addEventListener('click', function(evt) {
  evt.preventDefault();

  imagePopup.close();

});

placeForm.enableValidation();

//Окно "Новое место"
btnAddPlace.addEventListener('click', function () {

  placeForm.clearPopup();
  placePopup.open();

  popupButton.classList.add('popup__button_disabled');
  popupButton.disabled = true;
  formElementPlace.reset();

});

btnClosePlace.addEventListener('click',function () {
  placePopup.close();
});



