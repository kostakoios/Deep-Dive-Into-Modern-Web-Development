import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => filter.value === '' ? anecdotes 
    : anecdotes.filter(anecdot => anecdot.content.includes(filter.value) && anecdot))
    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        dispatch(increaseVote(id))
    }
    console.log('anecdotssssss: ', anecdotes)
    return (
        <div>
            {anecdotes && [...anecdotes].sort(({votes:a}, {votes:b}) => b-a).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has { anecdote.votes }
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList