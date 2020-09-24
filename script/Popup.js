import {imageSource} from './consts.js';

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    imageSource.src = this._link;

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
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    //document.addEventListener('keydown', this._handleEscClose());

  }
}


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
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
  constructor() {

  }
}
