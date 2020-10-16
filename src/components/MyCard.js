import { Card } from './Card.js';

export class MyCard extends Card {
    constructor(data, cardSelector, {handleCardClick}, {handleDeleteIconClick}, {handleLikeClick}, {handleDeleteLikeClick}, cards) {
      super(data, cardSelector, {handleCardClick}, {handleLikeClick}, {handleDeleteLikeClick});
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._apiCards = cards;
      
  
    }
  
    // Забираем разметку из HTML и клонируем элемент. Метод приватный
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.card')
        .cloneNode(true);
  
      return cardElement;
    }
  
    
    deleteCardClick() {
    //  this._apiCards.deleteMyCard(data).then(() => {
        this._element.remove();
        this._element = null;
    //  }).catch((err) => console.log(err))
    }
  
    //Обработчики событий
    _setEventListeners() {
      super._setEventListeners();
  
      this._element.querySelector('.card__delete-icon').addEventListener('click', () => {
        this._handleDeleteIconClick();
      });
     
    }
 
  }