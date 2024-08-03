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
    
    const vote = (id, content, votes) => {
        console.log('vote', id)
        const changeObjVote = {content, votes: votes + 1}
        dispatch(increaseVote(id, changeObjVote))
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
                        <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList