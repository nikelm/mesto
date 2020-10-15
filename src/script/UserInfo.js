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

  saveUserInfo(name, job) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '66c41b58-77a1-4c47-8e2e-bc5926c7c056',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        about: job.value
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }
}

