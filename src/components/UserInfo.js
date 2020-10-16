export class UserInfo {

  constructor({ userNameSelector, userJobSelector}) {
    this._fullname = userNameSelector;
    this._job = userJobSelector;
  }

  getUserInfo() {
    this._formValues = {
      userName: this._fullname.textContent,
      userJob: this._job.textContent
    };
     return this._formValues 
    
  }
  setUserInfo(name, job) {
    this._fullname.textContent = name.value;
    this._job.textContent  = job.value;
  }

}

