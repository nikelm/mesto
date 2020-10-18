import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;

      this._formSubmitHandler = this._formSubmitHandler.bind(this);
      this._popupFormNew = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues() {
      this._inputList = this._popupSelector.querySelectorAll('.popup__input');

      this._formValues = {};
      this._inputList.forEach((input) => {
        this._formValues[input.name] = input.value
      });

      return this._formValues;
    }

    _formSubmitHandler(evt) {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    }

    setEventListeners() {
      this._popupSelector.querySelector('.popup__form').addEventListener('submit', this._formSubmitHandler);
      super.setEventListeners();
    }

    close() {
      this._popupFormNew.reset();
      super.close();
    }
  }
