export class FormValidator {
  constructor(data, formSelector, popup) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputName = data.inputName;
    this._inputJob = data.inputJob;
    this._popup = popup;
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    let minNameLength;

    if (inputElement.name === this._inputName || inputElement.name === this._inputJob) {
    minNameLength = 2;
    } else {
    minNameLength = 1;
    }

    errorElement.classList.add(this._errorClass);

    if (inputElement.value.length < minNameLength && inputElement.type === 'text' && inputElement.value.length > 0) {
      errorElement.textContent = 'Минимальное количество символов: ' + minNameLength + '.' + 'Длина текста сейчас: ' + inputElement.value.length;
    } else if (inputElement.type === 'url' && inputElement.value.length !== 0) {
      errorElement.textContent = 'Введите адрес сайта.';
    } else {
      errorElement.textContent = 'Вы пропустили это поле.';
    }

    inputElement.classList.add(this._inputErrorClass);
  }


  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput(getInputList) {
    return getInputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(getInputList, buttonElement) {
    if (this._hasInvalidInput(getInputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement) {
    const getInputList = Array.from(formElement.querySelectorAll(this._inputSelector));

    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    getInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(getInputList, buttonElement);
      });
    });
  }

  _clearPopup() {
    const inputPopup = this._popup.querySelectorAll('.popup__input');
    const spanPopup = this._popup.querySelectorAll('.popup__error');
    const buttonPopup = this._popup.querySelectorAll('.popup__button');

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

  enableValidation() {

    this._clearPopup();

    const getFormList = Array.from(document.querySelectorAll(this._formSelector));

    getFormList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

      this._setEventListeners(formElement);
    });
  }
}

