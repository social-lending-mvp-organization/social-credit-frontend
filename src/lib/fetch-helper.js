export const fetchHelper = (url, options) =>
  fetch(url, options)
    .then(response => response.text())
    .then(json => JSON.parse(json));

export default fetchHelper;
