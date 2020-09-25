export class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._image = data.link;
    this._text = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

  }

  // Забираем разметку из HTML и клонируем элемент. Метод приватный
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _likeCardClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCardClick() {
    this._element.closest('.card').remove();
    this._element = null;
  }

  //Обработчики событий
  _setEventListeners() {

    this._element.querySelector('.card__item-button').addEventListener('click', () => {
      this._likeCardClick();
    });

    this._element.querySelector('.card__delete-icon').addEventListener('click', () => {
      this._deleteCardClick();
    });

    this._element.querySelector('.card__button').addEventListener('click', () => {
      this._handleCardClick();
    });

  }

  // Подготовка карточки к публикации: добавить данные в разметку. Метод публичный
  generateCard() {
    this._element = this._getTemplate();    // _element - приватное поле с разметкой
    this._setEventListeners(); //добавить обработчики

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__item-subtitle').textContent = this._text;

    return this._element;   // Вернуть элемент наружу

  }
}

