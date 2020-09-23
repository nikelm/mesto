export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  openPopup() {

    this._popupSelector.classList.add('popup_opened');
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.closePopup();
    });

    //document.addEventListener('keydown', this._handleEscClose());

  }
}


export class PopupWithImage extends Popup {
  constructor(cardSelector) {

  }

  openPopup() {
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}


export class PopupWithForm extends Popup {
  constructor() {
    
  }
}
