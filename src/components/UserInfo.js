export class UserInfo {

  constructor({userNameSelector, userJobSelector, linkInputAvatar}, userAvatar) {
    this._fullname = userNameSelector;
    this._job = userJobSelector;
    this._avatarLink = linkInputAvatar;
    this._avatar = userAvatar;
  }

  getUserInfo() {
    this._formValues = {
      name: this._fullname.textContent,
      about: this._job.textContent,
      avatar: this._avatar.value
    };
     return this._formValues 
    
  }
  setUserInfo(userData) {
    this._fullname.textContent = userData.name;
    this._job.textContent  = userData.about;
    this._avatar.src = userData.avatar;
    this._avatarLink.value = userData.avatar;
  }

}

