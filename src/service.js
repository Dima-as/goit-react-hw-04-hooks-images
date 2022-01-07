function fetchImage(inputName, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${inputName}&page=${page}&key=24044020-c85f666b654f1044c9a0a20ae&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Нет такого запроса${inputName}`));
  });
}
const API = { fetchImage };

export default API;
