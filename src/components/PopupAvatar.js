import { PopupWithForm } from './PopupWithForm.js';

export class PopupAvatar extends PopupWithForm {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector, handleFormSubmit);
    this._popupSelector = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
   
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.querySelector('.popup__form_avatar').addEventListener('submit', (evt) => {
      evt.preventDefault();
       
      this._handleFormSubmit();
      
      //super.close();
    });
    
  }
  
}