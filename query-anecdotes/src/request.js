import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'
export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const newAnecdote = newAnecdote => {
    axios.post(baseUrl, newAnecdote).then(res => res.data)
}
export const voteAnecdote = voteUPanecdote => {
    axios.put(`${baseUrl}/${voteUPanecdote.id}`, voteUPanecdote)
}