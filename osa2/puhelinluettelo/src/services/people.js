import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const list = () => axios.get(baseUrl).then((response) => response.data);

const create = (entry) =>
  axios.post(baseUrl, entry).then((response) => response.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

export default { list, create, delete: remove };
