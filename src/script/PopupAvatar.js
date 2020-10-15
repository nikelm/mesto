import { Popup } from './Popup.js';

export class PopupAvatar extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners(); 
    this._popupSelector.querySelector('.popup__form_avatar').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      super.close();
    });
    
  }
  
}