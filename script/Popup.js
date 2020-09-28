export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', this.close());

    this._popupSelector.addEventListener('keydown', this._handleEscClose());

  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(card) {

    this._image = card._image;
    this._text = card._text;

    document.querySelector('.popup-place__image').src = this._image;
    document.querySelector('.popup-place__title').textContent = this._text;
    super.open();
  }

  close() {
    this._popupSelector.querySelector('.popup-place__close').removeEventListener('click', super.close());

  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup-place__close').addEventListener('click', () => {
      this.close();
    });
    //super.setEventListeners();
  }
}


export class PopupWithForm extends Popup {
  constructor(popupSelector, formPlaceSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formPlaceSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formPlaceSubmitHandler(this._getInputValues());

      this._element.reset();
    });
    super.setEventListeners();
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
