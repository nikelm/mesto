export class UserInfo {
  constructor({nameInput, jobInput}) {
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._profileName = document.querySelector('.profile__title');
    this._profileDescription = document.querySelector('.profile__paragraph');
    this._element = document.querySelector('.popup_user');

  }

  _close() {
    this._element.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._element.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
        this.setUserInfo();
    });

  }

  getUserInfo() {
    this.setEventListeners();
    this._nameInput.value = this._profileName.textContent;
    this._jobInput.value = this._profileDescription.textContent;
  }

  setUserInfo() {
    this._profileName.textContent = this._nameInput.value;
    this._profileDescription.textContent = this._jobInput.value;
    this._close();
  }





}
