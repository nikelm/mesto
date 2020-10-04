export class UserInfo {
  constructor(formData) {

    this._fullname = formData.fullname;
    this._job = formData.job;

  }

  getUserInfo() {

    this._formValues = {};

    document.querySelector('.popup__input_type_name').value = this._fullname;
    document.querySelector('.popup__input_type_description').value = this._job;

    return this._formValues;

  }

  setUserInfo() {

    document.querySelector('.profile__title').textContent = this._fullname;
    document.querySelector('.profile__paragraph').textContent = this._job;

  }
}
