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

export function onCreateChore(chore_params, user_params) {
  return fetch(`${url}/chores`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...chore_params,
      household_id: user_params.user_household.id,
      user_id: user_params.id
    })
  }).then(res => res.json());
}

export function onUpdateChore(chore_params, user_params, type) {
  return fetch(`${url}/chores/${chore_params.id}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...chore_params,
      user_id: user_params.id,
      type: type
    })
  }).then(res => res.json());
}

export function onUpdateUser(user_input, user_params, type) {
  return fetch(`${url}/users/${user_params.id}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...user_input,
      user_id: user_params.id,
      type
    })
  }).then(res => res.json());
}

export function getChores(household_id) {
  return fetch(`${url}/households/${household_id}`).then(res => res.json());
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
