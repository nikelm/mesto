import './index.css';

import  {
  popupProfile,
  btnEdit,
  btnCloseUser,
  popupNewPlace,
  btnAddPlace,
  btnClosePlace,
  formElementPlace,
  popupButton,
  cardsContainer,
  popupPlace,
  closeImage,
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
  closeAvatar,
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
import { PopupAvatar } from '../components/PopupAvatar.js';
import { UserInfo } from '../components/UserInfo.js';




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

  function createMyCard(item) {
  const card = new MyCard(item, '.template', {
    handleCardClick: () => {

      const imageMyPopup = new PopupWithImage(popupPlace, card);
      imageMyPopup.setCardAttribute();
      imageMyPopup.setEventListeners();
      imageMyPopup.open();

      closeImage.addEventListener('click', function(evt) {
        evt.preventDefault();

        imagePopup.close();

      });
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

  function createOtherCard(item) {
  const card = new Card(item, '.template', {
    handleCardClick: () => {

      const imagePopup = new PopupWithImage(popupPlace, card);
      imagePopup.setCardAttribute();
      imagePopup.setEventListeners();
      imagePopup.open();

      closeImage.addEventListener('click', function(evt) {
        evt.preventDefault();

        imagePopup.close();

      });
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
          const cardElement = createMyCard(item);
            cardsList.addItem(cardElement, false);
        } else {
            const cardElement = createOtherCard(item);
            cardsList.addItem(cardElement, true);
          }
        }
      }, cardsContainer);

    cardsList.renderItems();
  }

  const placePopup = new PopupWithForm(popupNewPlace,
    {handleFormSubmit: () => {
      renderLoading(true, popupButton);
      const newCardCreate = apiCards.addCardNew({
        name: nameInputPlace.value,
        link: linkInputPlace.value
      }).
      catch((err) => {
        console.log(err);
      }).finally(() => {
        renderLoading(false, popupButton);
      });

      newCardCreate.then((formData) => {
        const cardsList = new Section({items: formData,
          renderer: (item) => {
            const cardElement = createMyCard(item);
            cardsList.addItem(cardElement, false);
          }
        }, cardsContainer);
        cardsList.renderItems();
      })
      placePopup.close()
    }

  })

  placePopup.setEventListeners();

  function getInfo(userData) {
    userNameSelector.textContent = userData.name;    // Забираем имя юзера с сервера
    userJobSelector.textContent = userData.about;    // Профессию
    userAvatar.src = userData.avatar;                // Ссылка на автар
    linkInputAvatar.value = userData.avatar;         // Отображение ссылки в попапе
  }
  getInfo(userData);

  const placeForm = new FormValidator(userFormData, popupNewPlace);
  placeForm.enableValidation();

  const userForm = new FormValidator(userFormData, popupProfile);
  const avatarForm = new FormValidator(userFormData, popupAvatar);
  avatarForm.enableValidation();

  const userInfo = new UserInfo({userNameSelector, userJobSelector});

  const userPopup = new PopupWithForm(popupProfile, {

    handleFormSubmit: () => {
      renderLoading(true, popupButtonUser);

      apiCards.saveUserInfo(popupInputName, popupInputJob).then(() => {userPopup.close()}).
      catch((err) => {
        console.log(err);
      }).finally(() => {
        renderLoading(false, popupButtonUser);

      });

      apiCards.getUserData().then((userData) => {
        getInfo(userData)
      }).catch((err) => {
        console.log(err);
      })

    }
  });

  userPopup.setEventListeners();

  const ava = new PopupAvatar(popupAvatar, {handleFormSubmit: () => {
    renderLoading(true, popupButtonAvatar);
      apiCards.saveUserAvatar(linkInputAvatar).then(() =>{ava.close()}).catch((err) => {
        console.log(err);
      }).finally(() => {
        renderLoading(false, popupButtonAvatar);

      });

      apiCards.getUserData().then((userData) => {
        getInfo(userData)
      }).catch((err) => {
        console.log(err);
      })
    }
  });


  btnAvatar.addEventListener('click', function() {
    avatarForm.clearPopup();
    ava.open();
    ava.setEventListeners();
    getInfo(userData);

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
    popupInputName.value = formValues.userName;
    popupInputJob.value = formValues.userJob;

  });

  // Кнопки закрытия попапов без обращения к серверу
  closeAvatar.addEventListener('click', function() {
    ava.close();
  })

  btnCloseUser.addEventListener('click', function () {

    userPopup.close();
  });

  btnClosePlace.addEventListener('click',function () {
    placePopup.close();
  });


  function renderLoading(isLoading, popupButton) {
    if (isLoading) {
      popupButton.textContent = 'Сохранение...';

    } else {
      popupButton.textContent = 'Сохранить';
    }
  }

})
