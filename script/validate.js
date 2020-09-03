//Очистка формы

function clearPopup(popup) {

  const inputPopup = popup.querySelectorAll('.popup__input');
  const spanPopup = popup.querySelectorAll('.popup__error');
  const buttonPopup = popup.querySelectorAll('.popup__button');

  inputPopup.forEach((inptElement) => {
    inptElement.classList.remove('popup__input_type_error');
  });

  spanPopup.forEach((inptElement) => {
    inptElement.textContent = '';
    inptElement.classList.remove('popup__error_visible');
  });

  buttonPopup.forEach((inptElement) => {
    if (inputPopup.value !== '') {
    inptElement.classList.remove('popup__button_disabled');
    }
  });
}


const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  let minNameLength;

  if (inputElement.name === 'fullname' || inputElement.name === 'job') {
    minNameLength = 2;
  } else {
    minNameLength = 1;
  }

  errorElement.classList.add(errorClass);

  if (inputElement.value.length < minNameLength && inputElement.type === 'text' && inputElement.value.length > 0) {
    errorElement.textContent = 'Минимальное количество символов: ' + minNameLength + '.' + 'Длина текста сейчас: ' + inputElement.value.length;
  } else if (inputElement.type === 'url' && inputElement.value.length !== 0) {
    errorElement.textContent = 'Введите адрес сайта.';
  } else {
    errorElement.textContent = 'Вы пропустили это поле.';
  }

  inputElement.classList.add(inputErrorClass);

}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
}


const hasInvalidInput = (getInputList) => {
  return getInputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


const toggleButtonState = (getInputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(getInputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};


const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass}, ...rest) => {

  const getInputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //toggleButtonState(getInputList, buttonElement, inactiveButtonClass);

  getInputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
       /* isValid(formElement, inputElement, inputErrorClass, errorClass);*/
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(getInputList, buttonElement, inactiveButtonClass);
      });
  });
}

const enableValidation = ({formSelector, ...rest}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));

    getFormList.forEach((formElement) => {	// formElement – это форма!!
      formElement.addEventListener('submit', (evt) => {		//Добавляем слушателей на каждую форму
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);		//Обработчик событий
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',     //класс невалидного инпута
  errorClass: 'popup__error_visible'              //невалидный спан с текстом ошибки
});
