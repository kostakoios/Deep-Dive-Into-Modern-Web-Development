import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [])

    const anecdotes = useSelector(({anecdotes, filter}) => filter.value === '' ? anecdotes 
    : anecdotes.filter(anecdot => anecdot.content.includes(filter.value) && anecdot))
    
    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(increaseVote(id))
        dispatch(showNotification(`you voted '${content}'`))
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList