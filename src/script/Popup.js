export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;

  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.remove('popup_opened');
  }


  _handleEscClose(evt) {
    this._popupOpen = document.querySelector('.popup_opened');
      if ((evt.key === 'Escape') && (this._popupOpen)) {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupOpen.classList.remove('popup_opened');

      }

  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', this._handleEscClose);


  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(card) {
    this.setEventListeners();

    this._image = card._image;
    this._text = card._text;

    document.querySelector('.popup-place__image').src = this._image;
    document.querySelector('.popup-place__title').textContent = this._text;
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}


export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      return this._formValues;
    });

  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__form_new').addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());


    });
      super.setEventListeners();
  }

  open() {
    this.setEventListeners();
    super.open();
  }

  close() {
    this._popupSelector.querySelector('.popup__form_new').reset();
    super.close();
  }
}
