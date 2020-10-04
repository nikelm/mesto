import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(card) {
    this.setEventListeners();

    this._image = card._image;
    this._text = card._text;

    this._popupSelector.querySelector('.popup-place__image').src = this._image;
    this._popupSelector.querySelector('.popup-place__title').textContent = this._text;
    super.open();
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', this._closeByOverlayClick);
    document.addEventListener('keydown', this._handleEscClose);

    super.setEventListeners();
  }

}
