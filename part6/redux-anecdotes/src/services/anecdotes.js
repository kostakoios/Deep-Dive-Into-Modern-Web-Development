import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const newObj = {content, votes: 0}
    const response = await axios.post(baseUrl, newObj)
    return response.data
}

const changeVote = async (id, changeObjVote) => {
    const response = await axios.put(`${baseUrl}/${id}`, changeObjVote)
    return response.data
}

export default {
    getAll,
    createNew,
    changeVote
}