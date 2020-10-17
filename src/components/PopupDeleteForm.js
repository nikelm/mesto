import { PopupWithForm } from './PopupWithForm.js';

export class PopupDeleteForm extends PopupWithForm {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector, handleFormSubmit);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();  
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      //super.close();
    });
    
  }
}