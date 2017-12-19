const url = "http://localhost:3001/api/v1";
const headers = {
  "content-type": "application/json",
  accept: "application/json"
};

export function onLogin(form) {
  return fetch(`${url}/auth`, {
    method: "POST",
    headers,
    body: JSON.stringify(form.fields)
  }).then(res => res.json());
}

export function onCreate(form) {
  return fetch(`${url}/users`, {
    method: "POST",
    headers,
    body: JSON.stringify(form)
  }).then(res => res.json());
}

export function fetchUser(token) {
  if (token !== undefined) {
    return fetch(`${url}/current_user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        token: token
      }
    }).then(res => res.json());
  }
}

export function getHouseholds() {
  return fetch(`${url}/households`).then(res => res.json());
}
