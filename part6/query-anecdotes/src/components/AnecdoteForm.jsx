const AnecdoteForm = ({newAnecdoteMutation, dispatch, type}) => {

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({ type, payload: 'New Anecdote has been added!' })
    setTimeout(() => {
      dispatch({ type: 'HIDE_MESSAGE' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
