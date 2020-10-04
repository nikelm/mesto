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





