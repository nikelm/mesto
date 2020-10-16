import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, card) {
    super(popupSelector);
    this._image = card._image;
    this._text = card._text;
    this._linkImage = this._popupSelector.querySelector('.popup-place__image');
    this._textImage = this._popupSelector.querySelector('.popup-place__title');
  }

  setCardAttribute() {
    this._linkImage.src = this._image;
    this._textImage.textContent = this._text;
  }

}
