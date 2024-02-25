const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4',
      'Content-Type': 'application/json'
    }
  };



export function changeAvatarLinkFunction(avatarLink) {
return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export function getApiNameDescription() {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers
})
.then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

  export function getInitialCard() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export function postNewCard(cardName, pictureLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name:  cardName,
          link: pictureLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    };


    export function patchNameDescription(userName, userDescription) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: userName.value,
          about: userDescription.value
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
      ;}
        //////////////////////////////////
export function deleteApiCard(element){
       return fetch (`${config.baseUrl}/cards/${element._id}`, {
            method: 'DELETE',
            headers: config.headers
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
        };

        export function deleteApiLike(element){
         return fetch (`${config.baseUrl}/cards/likes/${element._id}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    };
export function putApiLike(element){
         return fetch (`${config.baseUrl}/cards/likes/${element._id}`, {
            method: 'PUT',
            headers: config.headers
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
        };