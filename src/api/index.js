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
