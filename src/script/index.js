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
}  from './consts.js'

import { Api } from './Api.js'
import { Card } from './Card.js'
import { MyCard } from './MyCard.js';
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupDeleteForm } from './PopupDeleteForm.js';
import { PopupAvatar } from './PopupAvatar.js';
import { UserInfo } from './UserInfo.js';


function createMyCard(item) {
  const card = new MyCard(item, '.template', {
    handleCardClick: () => {

      imagePopup.open(card);
    }
  }, {
    handleDeleteIconClick: () => {
     
      const popupDeleteForm = new PopupDeleteForm(popupDeletePlace, {
        handleFormSubmit: () => {
          apiCards.deleteMyCard(card._id).then(() => {
            card.deleteCardClick();
          }).catch((err) => {
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

      imagePopup.open(card);
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

const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/cards',
  headers: {
    authorization: '66c41b58-77a1-4c47-8e2e-bc5926c7c056',
    'content-type': 'application/json'
  }
})

const cards = apiCards.getInitialCards();

cards.then((data) => {
  
  for (let i = 0; i < data.length; i++) {
    if (data[i].owner._id === '67cc4a327641f369d030b84f') {
      const cardsList = new Section({items: data[i], 
        renderer: (item) => {
          const cardElement = createMyCard(item);
          cardsList.addItem(cardElement);
        }
      }, cardsContainer);
      cardsList.renderItems();


    } else {
      const cardsList = new Section({items: data[i], 
        renderer: (item) => {
          const cardElement = createOtherCard(item);
          cardsList.addItem(cardElement);
        }
      }, cardsContainer);
      cardsList.renderItems();
    }
    
  }

}).catch((err) => {
  console.log(err);
})


const apiUser = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/users/me',
  headers: {
    authorization: '66c41b58-77a1-4c47-8e2e-bc5926c7c056',
    'content-type': 'application/json'
  }
})


function getData() {
  const userData = apiUser.getUserData();
  userData.then((data) => {
    userNameSelector.textContent = data.name;
    userJobSelector.textContent = data.about;
    userAvatar.src = data.avatar;
    linkInputAvatar.value = data.avatar;
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    renderLoading(false, popupButtonUser); 
  }); 
}
getData();

const placeForm = new FormValidator(userFormData, popupNewPlace);
const userForm = new FormValidator(userFormData, popupProfile);
const avatarForm = new FormValidator(userFormData, popupAvatar);

const imagePopup = new PopupWithImage(popupPlace);
imagePopup.setEventListeners();

const userInfo = new UserInfo({userNameSelector, userJobSelector});

const userPopup = new PopupWithForm(popupProfile, {
  
  handleFormSubmit: () => {
    renderLoading(true, popupButtonUser);
    
    userInfo.saveUserInfo(popupInputName, popupInputJob);
    getData();
    
    userPopup.close();
  } 
});

userPopup.setEventListeners();

userForm.enableValidation();
placeForm.enableValidation();



const placePopup = new PopupWithForm(popupNewPlace,
  {handleFormSubmit: () => {
    renderLoading(true, popupButton);
    const newCardCreate = apiCards.addCardNew({
      name: nameInputPlace.value,
      link: linkInputPlace.value
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      renderLoading(false, popupButton); 
    }); 
    
    newCardCreate.then((formData) => {
      
      cardsContainer.prepend(createMyCard(formData));
      
      
    })

    placePopup.close();
  }
  
})

const ava = new PopupAvatar(popupAvatar, {handleFormSubmit: () => {
  renderLoading(true, popupButtonAvatar);
  apiCards.saveUserAvatar(linkInputAvatar.value).then((data) => {
   
    userAvatar.src = data.avatar;
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    renderLoading(false, popupButtonAvatar); 
  });
  } 
});
avatarForm.enableValidation();

btnAvatar.addEventListener('click', function() {
  avatarForm.clearPopup();
  ava.open();
  ava.setEventListeners();
  getData();
  
})

closeAvatar.addEventListener('click', function() {
  ava.close();
})


placePopup.setEventListeners();


btnEdit.addEventListener('click', function () {
  userForm.clearPopup();
  userPopup.open();
  const formValues = userInfo.getUserInfo();
  popupInputName.value = formValues.userName;
  popupInputJob.value = formValues.userJob;

});

btnCloseUser.addEventListener('click', function () {
  ;
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

function renderLoading(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
    
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

