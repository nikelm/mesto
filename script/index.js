let popup = document.querySelector('.popup');
let btn_edit = document.querySelector('.profile__link');

  btn_edit.addEventListener('click', function () {
      popup.classList.add('popup_opened');
    let profile_name = document.querySelector('.title').textContent;
      document.getElementById("popup__item-name").value = profile_name;
    let profile_description = document.querySelector('.paragraph').textContent;
      document.getElementById("popup__item-description").value = profile_description;
});

let btn_close = document.querySelector('.popup__close');
  btn_close.addEventListener('click', function () {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInput = document.querySelector('.popup__input-name');
  let jobInput = document.querySelector('.popup__input-description');

  document.querySelector('.title').textContent = nameInput.value;
  document.querySelector('.paragraph').textContent = jobInput.value;
  
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);





