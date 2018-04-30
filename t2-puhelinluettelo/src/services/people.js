import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const to = (ourPerson) => ({ name: ourPerson.name, number: ourPerson.phone })

const from = (theirPerson) => ({ name: theirPerson.name, phone: theirPerson.number })

const getAll = () => axios
    .get(baseUrl)
    .then(response => response.data.map(p => from(p)))

const create = (newPerson) => axios
    .post(baseUrl, to(newPerson))
    .then(response => from(response.data))

const update = (id, newPerson) => axios
    .put(`${baseUrl}/${id}`, to(newPerson))
    .then(response => from(response.data))

export default { getAll, create, update }