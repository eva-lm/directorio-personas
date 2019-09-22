const url = "https://randomuser.me/api/?results=50";

const getDataFromServer = () => {
  return fetch(url).then(response => response.json());
};
export { getDataFromServer };
