import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateVote } from './requests'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "MESSAGE":
      console.log('I am herererere: ', action.payload)
          return action.payload 
    case "HIDE_MESSAGE":
        return ''
    default:
        return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")
  const queryClient = useQueryClient()

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  
  const handleVote = (anecdote) => {
    console.log('vote')
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({type: 'MESSAGE', payload: 'The anecdote has been voted'})
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE_MESSAGE' })
    }, 5000)
  }

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      console.log('errorrrrrr: ', error.response.data.error) 
      const errorMessage = error.response.data.error
      notificationDispatch({type: 'MESSAGE', payload: errorMessage})
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE_MESSAGE' })
    }, 5000)
    }
   })

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    console.log(JSON.parse(JSON.stringify(result)))
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data
  console.log('anecdotes: ', JSON.parse(JSON.stringify(result)))
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification}/>
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} dispatch={notificationDispatch} type='MESSAGE'/>
    
      {anecdotes && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App