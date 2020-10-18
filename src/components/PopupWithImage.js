import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._linkImage = this._popupSelector.querySelector('.popup-place__image');
    this._textImage = this._popupSelector.querySelector('.popup-place__title');
  }


  open(data) {
    this._linkImage.src = data.link;
    this._textImage.textContent = data.name;
    super.open();
  }

}
