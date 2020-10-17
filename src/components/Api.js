export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData() {
    ((res) => {
      if (res.ok) {
        console.log('res.ok');
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
       
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
    
    
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }

  addCardNew(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }

  deleteMyCard(id) {
    return fetch(`${this._url}/cards/${id}`,{
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
    
  }

  addLikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }

  saveUserInfo(userData) {
    
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about  
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
    
  }

  saveUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: link.avatar})
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }


  deleteLikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }


}
