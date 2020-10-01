import  { nameInputPlace, linkInputPlace } from './consts.js'

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeByOverlayClick = this._closeByOverlayClick.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }


  _handleEscClose(evt) {
    this._popupOpen = document.querySelector('.popup_opened');
      if ((evt.key === 'Escape') && (this._popupOpen)) {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupOpen.classList.remove('popup_opened');
      }
  }

  _closeByOverlayClick(evt) {
    this._popupOpen = document.querySelector('.popup_opened');
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
    this._formValues = {};
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _getInputValues() {
        
    this._formValues.name = nameInputPlace.value;
    this._formValues.link = linkInputPlace.value;
   
    return this._formValues;
    
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__form_new').addEventListener('submit', this._formSubmitHandler);
    super.setEventListeners();
  }

  open() {
    this.setEventListeners();
    super.open();
  }

  close() {
    this._popupSelector.querySelector('.popup__form_new').reset();
    this._popupSelector.querySelector('.popup__form_new').removeEventListener('submit', this._formSubmitHandler);
    super.close();
  }
}
