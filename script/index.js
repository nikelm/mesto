let popup = document.querySelector('.popup');
let btnEdit = document.querySelector('.profile__link');
let btnClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title').textContent;
let profileDescription = document.querySelector('.profile__paragraph').textContent;
let formElement = document.querySelector('.popup__container');


function openPopup() {
  popup.classList.add('popup_opened');
  document.querySelector('.popup__input_type_name').value = profileName;
  document.querySelector('.popup__input_type_description').value = profileDescription;
}

btnEdit.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

btnClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_description');

  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__paragraph').textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);





