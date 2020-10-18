import './index.css';

import  {
  popupProfile,
  btnEdit,
  popupNewPlace,
  btnAddPlace,
  formElementPlace,
  popupButton,
  cardsContainer,
  popupPlace,
  userFormData,
  userNameSelector,
  userJobSelector,
  popupInputName,
  popupInputJob,
  userAvatar,
  nameInputPlace,
  linkInputPlace,
  popupDeletePlace,
  btnAvatar,
  popupAvatar,
  linkInputAvatar,
  popupButtonAvatar,
  popupButtonUser
}  from '../utils/consts.js'

import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import { MyCard } from '../components/MyCard.js';
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteForm } from '../components/PopupDeleteForm.js';

import { UserInfo } from '../components/UserInfo.js';

const userInfo = new UserInfo({userNameSelector, userJobSelector, linkInputAvatar}, userAvatar);

const imagePopup = new PopupWithImage(popupPlace);


const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '66c41b58-77a1-4c47-8e2e-bc5926c7c056',
    'content-type': 'application/json'
  }
})


Promise.all([
  apiCards.getUserData(),
  apiCards.getInitialCards()
]).then((values)=>{
  const [userData, cards] = values;

  function createMyCard(item, cardsValue) {
  const card = new MyCard(item, '.template', {
    handleCardClick: () => {

      imagePopup.open({link: cardsValue.link, name: cardsValue.name});

      imagePopup.setEventListeners();

    }
  }, {
    handleDeleteIconClick: () => {

      const popupDeleteForm = new PopupDeleteForm(popupDeletePlace, {
        handleFormSubmit: () => {
          apiCards.deleteMyCard(card._id).then(() => {
            card.deleteCardClick();
          }).then(popupDeleteForm.close()
          ).catch((err) => {
            console.log(err);
          })

        }
      });
      popupDeleteForm.open();
      popupDeleteForm.setEventListeners();

    }
  }, {
    handleLikeClick: () => {
      apiCards.addLikeCard(card._id).then((data) => {

        card.likeAddCounter((data.likes).length);
        card.likeCardClick();
      }).catch((err) => {
        console.log(err);
      })
    }
  }, {
    handleDeleteLikeClick: () => {
      apiCards.deleteLikeCard(card._id).then((data) => {

        card.likeAddCounter((data.likes).length);
        card.likeCardClick();
      }).catch((err) => {
        console.log(err);
      })
    }
  }, cards);
  return card.generateCard();
  }

  function createOtherCard(item, cardsValue) {
  const card = new Card(item, '.template', {
    handleCardClick: () => {

      imagePopup.open({link: cardsValue.link, name: cardsValue.name});

      imagePopup.setEventListeners();

    }
  }, {
    handleLikeClick: () => {

      apiCards.addLikeCard(card._id).then((data) => {

        card.likeAddCounter((data.likes).length);
        card.likeCardClick();
      }).catch((err) => {
        console.log(err);
      })
    }
  }, {
    handleDeleteLikeClick: () => {
      apiCards.deleteLikeCard(card._id).then((data) => {

        card.likeAddCounter((data.likes).length);
        card.likeCardClick();
      }).catch((err) => {
        console.log(err);
      })
    }
  }, cards);
  return card.generateCard();
  }

  // Отрисовка карточек

  for (let i = 0; i < cards.length; i++) {
    const cardsList = new Section({items: cards[i],
      renderer: (item) => {
        if (cards[i].owner._id === userData._id) {
          const cardElement = createMyCard(item, cards[i]);
            cardsList.addItem(cardElement, false);
        } else {
            const cardElement = createOtherCard(item, cards[i]);
            cardsList.addItem(cardElement, true);
          }
        }
      }, cardsContainer);

    cardsList.renderItems();
  }

  const placePopup = new PopupWithForm(popupNewPlace,
    {handleFormSubmit: () => {
      renderLoading(true, popupButton);
      apiCards.addCardNew({
        name: nameInputPlace.value,
        link: linkInputPlace.value
      }).then((formData) => {
          const cardsList = new Section({items: formData,
            renderer: (item) => {
              const cardElement = createMyCard(item, {link: linkInputPlace.value, name: nameInputPlace.value});
              cardsList.addItem(cardElement, false);
            }
          }, cardsContainer);
          cardsList.renderItems();
          placePopup.close();   //Закрытие в блоке then
      }).
      catch((err) => {
        console.log(err);
      }).finally(() => {
        renderLoading(false, popupButton);
      });
    }

  })

  placePopup.setEventListeners();


  function setInfo(userData) {
    apiCards.saveUserInfo(userData).then((data) => {

    userInfo.setUserInfo(data);
    userPopup.close();      //Закрытие в блоке then
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      renderLoading(false, popupButtonUser);

    });
  }
  setInfo(userData);

  const placeForm = new FormValidator(userFormData, popupNewPlace);
  placeForm.enableValidation();

  const userForm = new FormValidator(userFormData, popupProfile);
  const avatarForm = new FormValidator(userFormData, popupAvatar);
  avatarForm.enableValidation();



  const userPopup = new PopupWithForm(popupProfile, {

    handleFormSubmit: () => {
      renderLoading(true, popupButtonUser);
      setInfo({name: popupInputName.value, about: popupInputJob.value});
    }
  });

  userPopup.setEventListeners();

  const ava = new PopupWithForm(popupAvatar, {handleFormSubmit: () => {
    renderLoading(true, popupButtonAvatar);
    apiCards.saveUserAvatar({avatar: linkInputAvatar.value}).then((data) => {
      setInfo(data);
      ava.close();    //Закрытие в блоке then
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        renderLoading(false, popupButtonAvatar);
      })
    }
  });


  btnAvatar.addEventListener('click', function() {
    avatarForm.clearPopup();
    ava.open();
    ava.setEventListeners();
    setInfo(userData)

  })

  userForm.enableValidation();
  placeForm.enableValidation();

  //Окно "Новое место"
  btnAddPlace.addEventListener('click', function () {

    placeForm.clearPopup();
    placePopup.open();

    popupButton.classList.add('popup__button_disabled');
    popupButton.disabled = true;
    formElementPlace.reset();

  });


  btnEdit.addEventListener('click', function () {
    userForm.clearPopup();
    userPopup.open();
    const formValues = userInfo.getUserInfo();
    popupInputName.value = formValues.name;
    popupInputJob.value = formValues.about;

  });


  function renderLoading(isLoading, popupButton) {
    if (isLoading) {
      popupButton.textContent = 'Сохранение...';

    } else {
      popupButton.textContent = 'Сохранить';
    }
  }

}).catch((err) => {
  console.log(err);
})
