export class Card {
  constructor(data, cardSelector, {handleCardClick}, {handleLikeClick}, {handleDeleteLikeClick}, cards) {
    
    this._image = data.link;
    this._text = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._apiCards = cards;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    //this._myId = '67cc4a327641f369d030b84f';
  }

  // Забираем разметку из HTML и клонируем элемент. Метод приватный
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card__other')
      .cloneNode(true);

    return cardElement;
  }

  likeCardClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
   
  }

  likeAddCounter(data) {
    this._element.querySelector('.card__counter').textContent = data
  }

 
  //Обработчики событий
  _setEventListeners() {

    this._element.querySelector('.card__item-button').addEventListener('click', () => {
      //this._likeCardClick();
      if (this._element.querySelector('.card__like_active')) {
        this._handleDeleteLikeClick();
      } else {
        this._handleLikeClick()
      }
    });

    this._element.querySelector('.card__button').addEventListener('click', () => {
      this._handleCardClick();
    });

  }

  // Подготовка карточки к публикации: добавить данные в разметку. Метод публичный
  generateCard() {
    this._element = this._getTemplate();    // _element - приватное поле с разметкой
    this._setEventListeners(); //добавить обработчики
    
    //this._checkLikes();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__item-subtitle').textContent = this._text;
    this._element.querySelector('.card__counter').textContent = this._likes.length;
    

    return this._element;   // Вернуть элемент наружу

  }
}