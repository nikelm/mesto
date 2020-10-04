export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeByOverlayClick = this._closeByOverlayClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.add('popup_opened');

  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {

    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeByOverlayClick(evt) {
    if (evt.target !== evt.currentTarget) {
      return
    } else {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    this._popupSelector.addEventListener('click', this._closeByOverlayClick);

  }
}

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
