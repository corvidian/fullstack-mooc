import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const to = (ourPerson) => ({ name: ourPerson.name, number: ourPerson.phone, id: ourPerson.id })

const from = (theirPerson) => ({ name: theirPerson.name, phone: theirPerson.number, id: theirPerson.id })

const getAll = () => axios
    .get(baseUrl)
    .then(response => response.data.map(p => from(p)))

const create = (newPerson) => axios
    .post(baseUrl, to(newPerson))
    .then(response => from(response.data))

const update = (person) => axios
    .put(`${baseUrl}/${person.id}`, to(person))
    .then(response => from(response.data))

const del = (id) => axios
    .delete(`${baseUrl}/${id}`)

export default { getAll, create, update, del }
