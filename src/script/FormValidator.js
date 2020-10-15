export class FormValidator {
  constructor(data, popup) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputName = data.inputName;
    this._inputJob = data.inputJob;
    this._spanPopup = data.spanError;
    this._popup = popup;
    this._inputPopup = this._popup.querySelectorAll(this._inputSelector); 
    this._buttonPopup = this._popup.querySelectorAll(this._formSelector); 
    this._spanErrorPopup = this._popup.querySelectorAll(this._spanPopup);
 
  }

  _showInputError(inputElement) {
    const errorElement = this._popup.querySelector(`#${inputElement.id}-error`);

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


  _hideInputError(inputElement) {
    const errorElement = this._popup.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._popup.querySelectorAll(this._inputSelector));

    this._buttonElement = this._popup.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

/* Наставник сказал, что можно переопределять метод на публичный*/

  clearPopup() {
    
     this._inputPopup.forEach((inptElement) => { 
      inptElement.classList.remove(this._inputErrorClass); 
    }); 
 
    this._spanErrorPopup.forEach((inptElement) => { 
      inptElement.textContent = ''; 
      inptElement.classList.remove(this._errorClass); 
    }); 
 
    this._buttonPopup.forEach((inptElement) => { 
      if (this._inputPopup.value !== '') { 
        inptElement.classList.remove(this._inactiveButtonClass); 
      } 
    }); 
  }

  enableValidation() {

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._popup);

  }
}

