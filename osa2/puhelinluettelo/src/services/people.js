import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const list = () => axios.get(baseUrl).then((response) => response.data);

const create = (entry) =>
  axios.post(baseUrl, entry).then((response) => response.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

const update = (id, entry) =>
  axios.put(`${baseUrl}/${id}`, entry).then((response) => response.data);

export default { list, create, delete: remove, update };
